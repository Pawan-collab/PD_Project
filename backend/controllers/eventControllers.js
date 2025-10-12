const { validationResult } = require("express-validator");
const eventService = require("../services/eventServices");

module.exports.createEvent = async (req, res) => {
  const issues = validationResult(req);
  if (!issues.isEmpty()) return res.status(422).json({ errors: issues.array() });

  try {
    const upload = req.file; 
    const payload = {
      ...req.body,
      ...(upload
        ? {
            banner_filename: upload.filename,
            banner_path: upload.path,
            banner_mime: upload.mimetype,
            banner_size: upload.size,
          }
        : {}),
    };

    const event = await eventService.createEvent(payload);
    return res.status(201).json({ message: "Event successfully created", event });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.getAllEvents = async (_req, res) => {
  try {
    const events = await eventService.getAllEvents();
    return res.status(200).json({ message: "Events fetched", events });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getRecentUpcomingEvents = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 4);
    const events = await eventService.getRecentUpcomingEvents(limit);
    return res.status(200).json({ data: events });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getRecentPastEvents = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 4);
    const events = await eventService.getRecentPastEvents(limit);
    return res.status(200).json({ data: events });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    return res.status(200).json({ message: "Event fetched", event });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const upload = req.file; 
    const updateData = {
      ...req.body,
      ...(upload
        ? {
            banner_filename: upload.filename,
            banner_path: upload.path,
            banner_mime: upload.mimetype,
            banner_size: upload.size,
          }
        : {}),
    };

    const event = await eventService.updateEvent(req.params.id, updateData);
    return res.status(200).json({ message: "Event successfully updated", event });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    return res.status(200).json({ message: "Event removed", event });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
