const eventService = require("../services/eventregistrationServices");
const { validationResult } = require("express-validator");

module.exports.createRegistration = async (req, res) => {
  console.log("Incoming registration payload:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation issues:", errors.array());
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const doc = await eventService.createRegistration(req.body, {
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });

    console.log("Registration stored:", doc?._id?.toString());
    return res.status(201).json({
      message: "Registration successfully created",
      registration: {
        id: doc._id,
        eventTitle: doc.eventTitle,
        fullName: doc.fullName,
        email: doc.email,
        phone: doc.phone,
        company: doc.company,
        location: doc.location,
        address: doc.address,
        message: doc.message,
        consent: doc.consent,
        emailSent: doc.emailSent,
        submitted_at: doc.submitted_at,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
      },
    });
  } catch (error) {
    console.error("Service error:", error.message);
    const status = /already registered/i.test(error.message) ? 409 : 400;
    return res.status(status).json({ error: error.message });
  }
};

module.exports.getRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const reg = await eventService.getRegistrationById(id);
    return res
      .status(200)
      .json({ message: "Registration fetched successfully", registration: reg });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.getRegistrationByEmailForEvent = async (req, res) => {
  const { eventTitle, email } = req.params;
  try {
    const reg = await eventService.getRegistrationByEmailForEvent(eventTitle, email);
    return res
      .status(200)
      .json({ message: "Registration fetched successfully", registration: reg });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.getRegistrationsByKey = async (req, res) => {
  const { eventKey } = req.params;
  try {
    const regs = await eventService.getRegistrationsByEvent(eventKey);
    console.log("[getRegistrationsByKey]", eventKey, regs.length);
    return res.status(200).json({
      message: "Registrations fetched successfully",
      registrations: regs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getRegistrationsByEvent = async (req, res) => {
  const { eventTitle } = req.params;
  try {
    const regs = await eventService.getRegistrationsByEvent(eventTitle);
    console.log("[getRegistrationsByEvent]", eventTitle, regs.length);
    return res.status(200).json({
      message: "Registrations fetched successfully",
      registrations: regs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllRegistrations = async (_req, res) => {
  try {
    const regs = await eventService.getAllRegistrations();
    return res.status(200).json({
      message: "Registrations fetched successfully",
      registrations: regs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const reg = await eventService.updateRegistration(id, req.body);
    return res
      .status(200)
      .json({ message: "Registration updated successfully", registration: reg });
  } catch (error) {
    return res.status(/not found/i.test(error.message) ? 404 : 400).json({ error: error.message });
  }
};

module.exports.deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const reg = await eventService.deleteRegistration(id);
    return res
      .status(200)
      .json({ message: "Registration removed successfully", registration: reg });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.searchRegistrations = async (req, res) => {
  const { query, eventTitle } = req.query;
  try {
    const regs = await eventService.searchRegistrations(query, eventTitle);
    return res.status(200).json({
      message: "Search completed successfully",
      registrations: regs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getRegistrationCount = async (req, res) => {
  try {
    const count = await eventService.getRegistrationCount(req.query.eventTitle);
    return res.status(200).json({
      message: "Registration count fetched successfully",
      count,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getRecentRegistrations = async (req, res) => {
  const limit = Number(req.query.limit ?? 10);
  const { eventTitle } = req.query;
  try {
    const regs = await eventService.getRecentRegistrations(limit, eventTitle);
    return res.status(200).json({
      message: "Recent registrations fetched successfully",
      registrations: regs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getEventStatsByLocation = async (req, res) => {
  try {
    const stats = await eventService.getEventStatsByLocation(req.query.eventTitle);
    return res.status(200).json({
      message: "Location statistics fetched successfully",
      stats,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getEventStatsByCompany = async (req, res) => {
  try {
    const stats = await eventService.getEventStatsByCompany(req.query.eventTitle);
    return res.status(200).json({
      message: "Company statistics fetched successfully",
      stats,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getDailySignupTrend = async (req, res) => {
  try {
    const trend = await eventService.getDailySignupTrend(req.query.eventTitle);
    return res.status(200).json({
      message: "Daily signup trend fetched successfully",
      trend,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.listPaginated = async (req, res) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    const { eventTitle, q } = req.query;

    const result = await eventService.listPaginated({ page, limit, eventTitle, q });
    return res.status(200).json({
      message: "Registrations fetched successfully",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
