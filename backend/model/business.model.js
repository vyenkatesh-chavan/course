import mongoose from "mongoose";

const businessIdeaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    requiredSkills: [String],
    investmentLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    steps: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Add Indexes
businessIdeaSchema.index({ requiredSkills: 1 });

export default mongoose.model("BusinessIdea", businessIdeaSchema);