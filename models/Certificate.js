import mongoose from "mongoose";

const certificateSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { secure_url: String, public_id: String},
  platform: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

const Certificate = mongoose.model("certificate", certificateSchema);
export default Certificate;
