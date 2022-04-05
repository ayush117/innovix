const mongoose = require("mongoose");

const Faq = new mongoose.Schema({
  Faq_category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  cat_id: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("ID can't be Negative");
    }
  },
  faq_cat_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  faq: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  id: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("ID can't be Negative");
    }
  },
  question: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  answer: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
});

const Faqs = mongoose.model("Food", Faq);

module.exports = Faqs;
