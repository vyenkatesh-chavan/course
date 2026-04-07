import Skill from "../model/skill.model.js";

// ✅ CREATE SKILL
export const createSkill = async (req, res) => {
  try {
    const skillData = { ...req.body, createdBy: req.user.id };
    const skill = await Skill.create(skillData);
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL SKILLS
export const getSkills = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.user.role !== 'admin') {
      query.createdBy = req.user.id;
    }

    const items = await Skill.find(query).skip(skip).limit(limit);
    const total = await Skill.countDocuments(query);
    res.json({
      data: items,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET SINGLE SKILL
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE SKILL
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE SKILL
export const deleteSkill = async (req, res) => {
  try {
    const item = await Skill.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    
    if (item.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized to delete this item" });
    }

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};