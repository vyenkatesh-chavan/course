import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    eligibility: String,
    benefits: String,
    category: String,
    link: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Add Indexes
schemeSchema.index({ category: 1 });

export default mongoose.model("Scheme", schemeSchema);