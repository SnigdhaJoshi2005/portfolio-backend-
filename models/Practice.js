import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

export default mongoose.model("Practice", practiceSchema);
