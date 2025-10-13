const Event = require("../models/eventModels");
// Create a new event entry
module.exports.createEvent = async (data) => {
  const event = new Event(data);
  await event.save();
  return event;
};
module.exports.getAllEvents = async () => {
  return await Event.find().sort({ order: -1, createdAt: -1 });
};
module.exports.getRecentUpcomingEvents = async (limit = 4) => {
  return await Event.find({ kind: "upcoming", published: true, isActive: true })
    .sort({ date: 1 })
    .limit(limit);
};
module.exports.getRecentPastEvents = async (limit = 4) => {
  return await Event.find({ kind: "past", published: true, isActive: true })
    .sort({ date: -1 })
    .limit(limit);
};
// Get a single event by its id
module.exports.getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("Event not found in records");
  return event;
};

module.exports.updateEvent = async (id, data) => {
  const event = await Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!event) throw new Error("Event not found in records");
  return event;
};
// Remove an event permanently
module.exports.deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new Error("Event not found in records");
  return event;
};
