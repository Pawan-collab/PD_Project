const mongoose = require("mongoose");
const { Schema } = mongoose;

const CATEGORIES = [
  "Industry Insights",
  "Technical Guide",
  "Business Strategy",
  "AI Ethics",
  "Workplace Innovation",
  "Healthcare AI",
  "Leadership",
];

const URL_REGEX =
  /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

function slugify(s = "") {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 160);
}

function wordCount(text = "") {
  return (text.trim().match(/\S+/g) || []).length;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

const BASE_WPM = 200;
function estimateReadTimeMinutes(text = "", wpm = BASE_WPM) {
  const words = wordCount(text);
  const w = clamp(Number(wpm) || BASE_WPM, 60, 1200); 
  const minutes = Math.round(words / w);
  return clamp(minutes || 1, 1, 120); 
}

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title must be at most 150 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      minlength: [30, "Summary must be at least 30 characters"],
      maxlength: [300, "Summary must be at most 300 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [100, "Content must be at least 100 characters"],
    },

    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: "Category must be one of the predefined options",
      },
      required: [true, "Category is required"],
      index: true,
    },
    tags: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length <= 8,
        message: "You can assign at most 8 tags",
      },
      default: [],
    },

    author_name: {
      type: String,
      required: [true, "Author name is required"],
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [60, "Author name must be at most 60 characters"],
      trim: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    featured_badge_text: {
      type: String,
      default: "Featured Article",
      maxlength: [40, "Badge text must be at most 40 characters"],
    },
    published_at: {
      type: Date,
      index: true,
    },

    read_time_minutes: {
      type: Number,
      min: [1, "Read time must be at least 1 minute"],
      max: [120, "Read time must be at most 120 minutes"],
      required: false,
    },
    word_count: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      min: [0, "Views cannot be negative"],
      default: 0,
    },
    likes: {
      type: Number,
      min: [0, "Likes cannot be negative"],
      default: 0,
    },
    time_spent_seconds: {
      type: Number,
      min: [0, "Time spent cannot be negative"],
      default: 0,
    },
    engaged_sessions: {
      type: Number,
      min: [0, "Engagement sessions cannot be negative"],
      default: 0,
    },
    last_engaged_at: { type: Date },

    seo_title: {
      type: String,
      maxlength: [70, "SEO title must be at most 70 characters"],
      trim: true,
    },
    seo_description: {
      type: String,
      maxlength: [160, "SEO description must be at most 160 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);

articleSchema.pre("save", async function (next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (
    this.isModified("status") &&
    this.status === "published" &&
    !this.published_at
  ) {
    this.published_at = new Date();
  }
  if (typeof this.content === "string") {
    this.word_count = wordCount(this.content);
    if (!this.read_time_minutes) {
      this.read_time_minutes = estimateReadTimeMinutes(this.content, BASE_WPM);
    } else {
      this.read_time_minutes = clamp(this.read_time_minutes, 1, 120);
    }
  }
  next();
});

articleSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  const $set = update.$set || {};

  const content =
    typeof update.content === "string"
      ? update.content
      : typeof $set.content === "string"
      ? $set.content
      : undefined;

  const explicitRT = update.read_time_minutes ?? $set.read_time_minutes;

  if (typeof content === "string") {
    $set.word_count = wordCount(content);
    if (explicitRT == null) {
      $set.read_time_minutes = estimateReadTimeMinutes(content, BASE_WPM);
    } else {
      $set.read_time_minutes = clamp(Number(explicitRT), 1, 120);
    }
  } else if (explicitRT != null) {
    $set.read_time_minutes = clamp(Number(explicitRT), 1, 120);
  }

  const nextStatus = update.status ?? $set.status;
  if (nextStatus === "published") {
    if (!$set.published_at && !update.published_at) {
      $set.published_at = new Date();
    }
  }

  update.$set = $set;
  this.setUpdate(update);
  next();
});

articleSchema.index({ title: "text", summary: "text", content: "text" });
articleSchema.index({ category: 1, status: 1, published_at: -1 });

articleSchema.methods.userEstimatedReadTime = function (wpm = 200) {
  return estimateReadTimeMinutes(this.content || "", wpm);
};

articleSchema.methods.incrementViews = function (n = 1) {
  this.views = Math.max(0, (this.views || 0) + Number(n || 0));
  return this.save();
};

articleSchema.methods.incrementLikes = function (n = 1) {
  this.likes = Math.max(0, (this.likes || 0) + Number(n || 0));
  return this.save();
};

articleSchema.methods.decrementLikes = function (n = 1) {
  this.likes = Math.max(0, (this.likes || 0) - Number(n || 0));
  return this.save();
};

const ArticleModel = mongoose.model("Article", articleSchema);
module.exports = ArticleModel;
