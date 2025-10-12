require("dotenv").config();

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("./db/db");

const adminRouter = require("./routes/adminRoutes");
const contactRouter = require("./routes/contactRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const postRouter = require("./routes/postRoutes");
const articleRouter = require("./routes/articleRoutes");
const projectRouter = require("./routes/projectRoutes");
const galleryRouter = require("./routes/galleryRoutes");
// const chatbotRouter = require("./routes/chatBot.routes");
// const industryRouter = require("./routes/industry.routes");
// const solutionRouter = require("./routes/solution.routes");
// const eventRouter = require("./routes/event.route");
// const eventRegistrationRouter = require("./routes/eventRegistration.routes");
const solutionRouter = require("./routes/solutionRoutes");

const app = express();

connectToDB();

// CORS Configuration - Must be before other middleware
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600, // Cache preflight request for 10 minutes
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

app.get("/", (_req, res) => {
  res.send("Hello im responding to client side!");
});

app.use("/admin", adminRouter);
app.use("/contact", contactRouter);
app.use("/feedback", feedbackRouter);
app.use("/posts", postRouter);
app.use("/articles", articleRouter);
app.use("/projects", projectRouter);
app.use("/gallery", galleryRouter);
// app.use("/chatbot", chatbotRouter);
// app.use("/industries", industryRouter);
// app.use("/solutions", solutionRouter);
// app.use("/events", eventRouter);
// app.use("/eventRegistrations", eventRegistrationRouter);
app.use("/solutions", solutionRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
