import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ REGISTER (Signup)
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      isVerified: true
    });

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registered successfully. You are now logged in.",
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      isVerified: true,
      role: 'admin' // Force role to admin
    });

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin registered successfully.",
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('savedSkills')
      .populate('savedSchemes')
      .populate('savedIdeas');
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // We shouldn't send password back
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      message: "Profile fetched",
      user: userObj,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ TOGGLE SAVE ITEM
export const toggleSaveItem = async (req, res) => {
  try {
    const { type, itemId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let arr;
    if (type === 'skill') arr = user.savedSkills;
    else if (type === 'scheme') arr = user.savedSchemes;
    else if (type === 'idea') arr = user.savedIdeas;
    else return res.status(400).json({ message: "Invalid type" });

    const index = arr.indexOf(itemId);
    if (index === -1) {
      arr.push(itemId);
    } else {
      arr.splice(index, 1);
    }

    await user.save();
    res.json({ message: `Successfully updated ${type}`, saved: index === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};