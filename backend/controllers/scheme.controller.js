import Scheme from "../model/scheme.model.js";

// CREATE
export const createScheme = async (req, res) => {
  try {
    const schemeData = { ...req.body, createdBy: req.user.id };
    const scheme = await Scheme.create(schemeData);
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getSchemes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const items = await Scheme.find().skip(skip).limit(limit);
    const total = await Scheme.countDocuments();
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
export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteScheme = async (req, res) => {
  try {
    const item = await Scheme.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    
    if (item.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized to delete this item" });
    }

    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: "Scheme deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};