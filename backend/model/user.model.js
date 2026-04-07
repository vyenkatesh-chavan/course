import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: Number,
    education: String,
    location: String,
    interests: [String],

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    savedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    savedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }],
    savedIdeas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessIdea' }],

    // ✅ verification (only used once)
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
  },
  { timestamps: true }
);

// Add Indexes
userSchema.index({ email: 1 });
userSchema.index({ interests: 1 });

export default mongoose.model("User", userSchema);