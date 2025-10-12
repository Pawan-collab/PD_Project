const contactModel = require("../models/contactModels");

module.exports.createContact = async (contactData) => {
  const { name, email, phone, company_name, country, job_title, message } =
    contactData;

  if (
    !name ||
    !email ||
    !phone ||
    !company_name ||
    !country ||
    !job_title ||
    !message
  ) {
    throw new Error("All fields are mandatory");
  }
  if (name.length < 3 || name.length > 20) {
    throw new Error("Name must be between 3 and 20 characters in length");
  }
  if (email.length < 5 || email.length > 50) {
    throw new Error("Email must be within 5 to 50 characters");
  }
  if (phone.length !== 10) {
    throw new Error("Phone number must be precisely 10 digits");
  }
  if (company_name.length < 2 || company_name.length > 30) {
    throw new Error("Company name must range from 2 to 30 characters");
  }
  if (country.length < 2 || country.length > 30) {
    throw new Error("Country name must range from 2 to 30 characters");
  }

  const existingContact = await contactModel.findOne({
    $or: [
      { email: { $eq: email } },
      { phone: { $eq: phone } },
      { company_name: { $eq: company_name } },
    ],
  });

  if (existingContact) {
    existingContact.messages.push({ message });
    await existingContact.save();
    return existingContact;
  }

  const newContact = new contactModel({
    name,
    email,
    phone,
    company_name,
    country,
    job_title,
    messages: [{ message }],
  });

  await newContact.save();
  return newContact;
};

module.exports.getContactByEmail = async (email) => {
  const contact = await contactModel.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });
  if (!contact) throw new Error("No matching contact found");
  return contact;
};

module.exports.getContactByPhone = async (phone) => {
  const contact = await contactModel.findOne({ phone });
  if (!contact) throw new Error("No matching contact found");
  return contact;
};

module.exports.getContactById = async (id) => {
  const contact = await contactModel.findById(id);
  if (!contact) {
    throw new Error("No matching contact found");
  }
  return contact;
};

module.exports.getContactsByName = async (name) => {
  const contacts = await contactModel.find({
    name: new RegExp(name, "i"),
  });
  return contacts;
};

module.exports.getContactByCompanyName = async (company_name) => {
  const contacts = await contactModel.find({
    company_name: new RegExp(company_name, "i"),
  });
  return contacts;
};

module.exports.getContactsByCountry = async (country) => {
  const contacts = await contactModel.find({
    country: new RegExp(country, "i"),
  });
  return contacts;
};

module.exports.getContactByJobTitle = async (job_title) => {
  const contacts = await contactModel.find({
    job_title: new RegExp(job_title, "i"),
  });
  return contacts;
};

module.exports.getAllContacts = async () => {
  const contacts = await contactModel.find();
  return contacts;
};

module.exports.updateContact = async (id, contactData) => {
  const contact = await contactModel.findByIdAndUpdate(id, contactData, {
    new: true,
    runValidators: true,
  });
  if (!contact) {
    throw new Error("No matching contact found");
  }
  return contact;
};

module.exports.deleteContact = async (id) => {
  const contact = await contactModel.findByIdAndDelete(id);
  if (!contact) {
    throw new Error("No matching contact found");
  }
  return contact;
};

module.exports.searchContacts = async (query) => {
  const contacts = await contactModel.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
      { phone: { $regex: query, $options: "i" } },
      { company_name: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
      { job_title: { $regex: query, $options: "i" } },
    ],
  });
  return contacts;
};

module.exports.getContactCount = async () => {
  const count = await contactModel.countDocuments();
  return count;
};

module.exports.getRecentContacts = async (limit = 5) => {
  const contacts = await contactModel
    .find()
    .sort({ submited_at: -1 })
    .limit(limit);
  return contacts;
};

module.exports.getContactStats = async () => {
  const stats = await contactModel.aggregate([
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  return stats;
};
