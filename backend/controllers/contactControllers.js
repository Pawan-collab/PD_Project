const contactService = require("../services/contactServices");
const contactModel = require("../models/contactModels");
const { validationResult } = require("express-validator");

module.exports.createContact = async (req, res) => {
  console.log("Request payload:", req.body);
  const issues = validationResult(req);
  if (!issues.isEmpty()) {
    console.log("Validation issues:", issues.array());
    return res.status(422).json({ errors: issues.array() });
  }

  try {
    const contactData = req.body;
    const createdContact = await contactService.createContact(contactData);

    console.log("Contact persisted:", createdContact);
    return res.status(201).json({
      message: "Contact request successfully created",
      contact: {
        id: createdContact._id,
        name: createdContact.name,
        email: createdContact.email,
        phone: createdContact.phone,
        company_name: createdContact.company_name,
        country: createdContact.country,
        job_title: createdContact.job_title,
        messages: createdContact.messages,
        created_at: createdContact.created_at,
      },
    });
  } catch (err) {
    console.error("Service error:", err.message);
    return res.status(400).json({ error: err.message });
  }
};

module.exports.getContactByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const contact = await contactService.getContactByEmail(email);
    return res
      .status(200)
      .json({ message: "Contact fetched successfully", contact });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports.getContactByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const contact = await contactService.getContactByPhone(phone);
    return res
      .status(200)
      .json({ message: "Contact fetched successfully", contact });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports.getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await contactService.getContactById(id);
    return res
      .status(200)
      .json({ message: "Contact fetched successfully", contact });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports.getContactByName = async (req, res) => {
  const { name } = req.params;
  try {
    const contacts = await contactService.getContactsByName(name);
    if (!contacts.length) {
      return res
        .status(404)
        .json({ error: "No contacts found matching this name" });
    }
    return res
      .status(200)
      .json({ message: "Contacts fetched successfully", contacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getContactByCompanyName = async (req, res) => {
  const { company_name } = req.params;
  try {
    const contacts = await contactService.getContactByCompanyName(company_name);
    if (!contacts.length) {
      return res
        .status(404)
        .json({ error: "No contacts found for this company" });
    }
    return res
      .status(200)
      .json({ message: "Contacts fetched successfully", contacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getContactByCountry = async (req, res) => {
  const { country } = req.params;
  try {
    const contacts = await contactService.getContactsByCountry(country);
    if (!contacts.length) {
      return res
        .status(404)
        .json({ error: "No contacts found for this country" });
    }
    return res
      .status(200)
      .json({ message: "Contacts fetched successfully", contacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getContactByJobTitle = async (req, res) => {
  const { job_title } = req.params;
  try {
    const contacts = await contactService.getContactByJobTitle(job_title);
    if (!contacts.length) {
      return res
        .status(404)
        .json({ error: "No contacts found for this job title" });
    }
    return res
      .status(200)
      .json({ message: "Contacts fetched successfully", contacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    return res.status(200).json({
      message: "Contacts fetched successfully",
      contacts,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const contactData = req.body;
  try {
    const updated = await contactService.updateContact(id, contactData);
    return res.status(200).json({
      message: "Contact updated successfully",
      contact: updated,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await contactService.deleteContact(id);
    return res.status(200).json({
      message: "Contact deleted successfully",
      contact: removed,
    });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

module.exports.searchContacts = async (req, res) => {
  const { query } = req.query;
  try {
    const contacts = await contactService.searchContacts(query);
    return res.status(200).json({
      message: "Search completed successfully",
      contacts,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getContactCount = async (req, res) => {
  try {
    const count = await contactService.getContactCount();
    return res.status(200).json({
      message: "Contact count fetched successfully",
      count,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getRecentContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find().sort({ created_at: -1 }).limit(10);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: "No recent contacts available" });
    }
    return res.status(200).json({
      message: "Recent contacts fetched successfully",
      contacts,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getContactStats = async (req, res) => {
  try {
    const stats = await contactService.getContactStats();
    return res.status(200).json({
      message: "Contact statistics fetched successfully",
      stats,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
