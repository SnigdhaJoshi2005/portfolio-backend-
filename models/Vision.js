import mongoose from "mongoose";

const visionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String, // image URL or path
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent OverwriteModelError during dev (nodemon)
 */
export default mongoose.models.Vision ||
  mongoose.model("Vision", visionSchema);
