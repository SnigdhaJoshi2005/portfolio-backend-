import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  heading: String,
  description: String,
  email: String,
  image: String,
  socials: {
    instagram: String,
    youtube: String,
    linkedin: String,
  },
});

export default mongoose.model("Contact", contactSchema);
