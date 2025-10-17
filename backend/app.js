require("dotenv").config();

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
const eventRouter = require("./routes/eventRoutes");
const solutionRouter = require("./routes/solutionRoutes");

const app = express();

// Connect to DB asynchronously - will be called when needed
connectToDB().catch(err => console.error('Initial DB connection failed:', err));

// CORS Configuration - Must be before other middleware
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static file serving - commented out for Vercel serverless
// Use cloud storage (Cloudinary, S3, etc.) for production file uploads
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "..", "public", "uploads"))
// );

app.get("/", (_req, res) => {
  res.send("Hello im responding to client side!");
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Backend is running fine " });
});

app.use("/admin", adminRouter);
app.use("/contact", contactRouter);
app.use("/feedback", feedbackRouter);
app.use("/posts", postRouter);
app.use("/articles", articleRouter);
app.use("/projects", projectRouter);
app.use("/gallery", galleryRouter);
app.use("/events", eventRouter);
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
