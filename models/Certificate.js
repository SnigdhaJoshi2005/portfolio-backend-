const certificateSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

export default mongoose.model("Certificate", certificateSchema);
