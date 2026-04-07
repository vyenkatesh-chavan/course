import BusinessIdea from "../model/business.model.js";

// CREATE
export const createIdea = async (req, res) => {
  try {
    const ideaData = { ...req.body, createdBy: req.user.id };
    const idea = await BusinessIdea.create(ideaData);
    res.status(201).json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getIdeas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.user.role !== 'admin') {
      query.createdBy = req.user.id;
    }

    const items = await BusinessIdea.find(query).skip(skip).limit(limit);
    const total = await BusinessIdea.countDocuments(query);
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

// GET ONE
export const getIdeaById = async (req, res) => {
  try {
    const idea = await BusinessIdea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateIdea = async (req, res) => {
  try {
    const idea = await BusinessIdea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteIdea = async (req, res) => {
  try {
    const item = await BusinessIdea.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    
    if (item.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized to delete this item" });
    }

    await BusinessIdea.findByIdAndDelete(req.params.id);
    res.json({ message: "Idea deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};