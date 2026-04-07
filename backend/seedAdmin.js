import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./model/user.model.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const existing = await User.findOne({ email: "admin@gmail.com" });
    if (existing) {
      console.log("Admin account (admin@gmail.com) already exists. Deleting and recreating to ensure correct 123456 password...");
      await User.deleteOne({ email: "admin@gmail.com" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);
    
    await User.create({
      name: "Master Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      interests: ["administration"]
    });
    
    console.log("Successfully seeded master admin: admin@gmail.com | 123456");
    process.exit(0);

  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  }
};

seedAdmin();
