const EventRegistration = require("../models/eventregistrationModels");
const { _slugify: slugify } = require("../models/eventregistrationModels");

function escapeRegex(s = "") {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keyOrTitleFilter(eventTitleOrKey) {
  const raw = sanitize(eventTitleOrKey || "");
  const key = slugify(raw);
  const titleEq = new RegExp(`^${escapeRegex(raw)}$`, "i");
  return { $or: [{ eventKey: key }, { eventTitle: titleEq }] };
}

const PHONE_REGEX = /^[0-9+\-\s()]{7,}$/;

function sanitize(str) {
  return typeof str === "string" ? str.trim() : str;
}

function validateCreatePayload(payload) {
  const p = {
    eventTitle: sanitize(payload.eventTitle),
    fullName: sanitize(payload.fullName),
    email: sanitize(payload.email)?.toLowerCase(),
    phone: sanitize(payload.phone ?? ""),
    company: sanitize(payload.company),
    location: sanitize(payload.location),
    address: sanitize(payload.address),
    message: sanitize(payload.message),
    consent: payload.consent,
  };

  if (!p.eventTitle || !p.fullName || !p.email || p.consent !== true) {
    throw new Error(
      "eventTitle, fullName, and email are required, and consent must be true"
    );
  }
  if (p.fullName.length < 2) throw new Error("Please enter your full name");
  if (!/.+\@.+\..+/.test(p.email))
    throw new Error("Please provide a valid email address");

  if (p.phone && !PHONE_REGEX.test(p.phone)) {
    throw new Error("Please provide a valid contact number");
  }

  if (p.company && p.company.length > 160)
    throw new Error("Company name must not exceed 160 characters");
  if (p.location && p.location.length > 160)
    throw new Error("Location must not exceed 160 characters");
  if (p.address && p.address.length > 240)
    throw new Error("Address must not exceed 240 characters");
  if (p.message && p.message.length > 50000)
    throw new Error("Message must not exceed 50,000 characters");

  return p;
}

module.exports.createRegistration = async (data, reqMeta = {}) => {
  const p = validateCreatePayload(data);

  const eventKey = slugify(p.eventTitle);
  const existing = await EventRegistration.findOne({
    eventKey,
    email: p.email.toLowerCase(),
  });

  if (existing) {
    throw new Error(
      "A registration for this event with this email already exists"
    );
  }

  const doc = new EventRegistration({
    ...p,
    eventKey,
    ip: reqMeta.ip,
    userAgent: reqMeta.userAgent,
  });

  await doc.save();
  return doc;
};

module.exports.getRegistrationById = async (id) => {
  const reg = await EventRegistration.findById(id);
  if (!reg) throw new Error("Registration not found");
  return reg;
};

module.exports.getRegistrationByEmailForEvent = async (
  eventTitleOrKey,
  email
) => {
  const filter = keyOrTitleFilter(eventTitleOrKey);
  const reg = await EventRegistration.findOne({
    ...filter,
    email: sanitize(email)?.toLowerCase(),
  });
  if (!reg) throw new Error("Registration not found");
  return reg;
};

module.exports.getRegistrationsByEvent = async (eventTitleOrKey) => {
  const filter = keyOrTitleFilter(eventTitleOrKey);
  return EventRegistration.find(filter).sort({
    submitted_at: -1,
    created_at: -1,
  });
};

module.exports.getAllRegistrations = async () => {
  const regs = await EventRegistration.find().sort({
    submitted_at: -1,
    created_at: -1,
  });
  return regs;
};

module.exports.searchRegistrations = async (query, eventTitleOrKey) => {
  const q = sanitize(query) || "";
  const filter = {
    $or: [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { address: { $regex: q, $options: "i" } },
      { message: { $regex: q, $options: "i" } },
    ],
  };
  if (eventTitleOrKey) {
    filter.eventKey = slugify(sanitize(eventTitleOrKey));
  }

  const regs = await EventRegistration.find(filter).sort({
    submitted_at: -1,
    created_at: -1,
  });
  return regs;
};

module.exports.updateRegistration = async (id, patch) => {
  if (patch.hasOwnProperty("consent") && patch.consent !== true) {
    throw new Error("You must agree to proceed");
  }

  if ((patch.email || patch.eventTitle) && id) {
    const current = await EventRegistration.findById(id);
    if (!current) throw new Error("Registration not found");

    const newEmail = (patch.email ?? current.email)?.toLowerCase();
    const newEventTitle = sanitize(patch.eventTitle ?? current.eventTitle);
    const newKey = slugify(newEventTitle);

    const exists = await EventRegistration.findOne({
      _id: { $ne: current._id },
      eventKey: newKey,
      email: newEmail,
    });
    if (exists) {
      throw new Error(
        "Another registration with this email already exists for this event"
      );
    }

    patch.eventKey = newKey;
    if (patch.email) patch.email = newEmail;
  }

  const reg = await EventRegistration.findByIdAndUpdate(id, patch, {
    new: true,
    runValidators: true,
  });
  if (!reg) throw new Error("Registration not found");
  return reg;
};

module.exports.deleteRegistration = async (id) => {
  const reg = await EventRegistration.findByIdAndDelete(id);
  if (!reg) throw new Error("Registration not found");
  return reg;
};

module.exports.getRegistrationCount = async (eventTitleOrKey) => {
  const filter = eventTitleOrKey
    ? { eventKey: slugify(sanitize(eventTitleOrKey)) }
    : {};
  const count = await EventRegistration.countDocuments(filter);
  return count;
};

module.exports.getRecentRegistrations = async (limit = 5, eventTitleOrKey) => {
  const filter = eventTitleOrKey
    ? { eventKey: slugify(sanitize(eventTitleOrKey)) }
    : {};
  const regs = await EventRegistration.find(filter)
    .sort({ submitted_at: -1, created_at: -1 })
    .limit(limit);
  return regs;
};

module.exports.getEventStatsByLocation = async (eventTitleOrKey) => {
  const pipeline = [];
  if (eventTitleOrKey) {
    pipeline.push({
      $match: { eventKey: slugify(sanitize(eventTitleOrKey)) },
    });
  }
  pipeline.push(
    { $group: { _id: "$location", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  );

  return EventRegistration.aggregate(pipeline);
};

module.exports.getEventStatsByCompany = async (eventTitleOrKey) => {
  const pipeline = [];
  if (eventTitleOrKey) {
    pipeline.push({
      $match: { eventKey: slugify(sanitize(eventTitleOrKey)) },
    });
  }
  pipeline.push(
    { $group: { _id: "$company", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  );

  return EventRegistration.aggregate(pipeline);
};

module.exports.getDailySignupTrend = async (eventTitleOrKey) => {
  const pipeline = [];
  if (eventTitleOrKey) {
    pipeline.push({
      $match: { eventKey: slugify(sanitize(eventTitleOrKey)) },
    });
  }
  pipeline.push(
    {
      $project: {
        day: {
          $dateToString: { format: "%Y-%m-%d", date: "$submitted_at" },
        },
      },
    },
    { $group: { _id: "$day", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  );
  return EventRegistration.aggregate(pipeline);
};

module.exports.markEmailSent = async (id) => {
  const reg = await EventRegistration.findByIdAndUpdate(
    id,
    { emailSent: true },
    { new: true }
  );
  if (!reg) throw new Error("Registration not found");
  return reg;
};

module.exports.listPaginated = async ({
  page = 1,
  limit = 20,
  eventTitle,
  q,
}) => {
  const filter = {};
  if (eventTitle) {
    filter.eventKey = slugify(sanitize(eventTitle));
  }
  if (q) {
    const s = sanitize(q);
    filter.$or = [
      { fullName: { $regex: s, $options: "i" } },
      { email: { $regex: s, $options: "i" } },
      { phone: { $regex: s, $options: "i" } },
      { company: { $regex: s, $options: "i" } },
      { location: { $regex: s, $options: "i" } },
    ];
  }

  const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
  const [items, total] = await Promise.all([
    EventRegistration.find(filter)
      .sort({ submitted_at: -1, created_at: -1 })
      .skip(skip)
      .limit(Math.max(1, limit)),
    EventRegistration.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page: Math.max(1, page),
    pages: Math.ceil(total / Math.max(1, limit)),
  };
};