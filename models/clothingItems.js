const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weather: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
        message: "You must enter a valid URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("item", clothingItemSchema);
