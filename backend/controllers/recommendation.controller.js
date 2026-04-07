import Skill from "../model/skill.model.js";
import Scheme from "../model/scheme.model.js";
import BusinessIdea from "../model/business.model.js";
import User from "../model/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getRecommendations = catchAsync(async (req, res) => {
  const userId = req.user.id;
  
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const interests = user.interests || [];
  
  if (interests.length === 0) {
    return res.json({
      skills: [],
      schemes: [],
      ideas: [],
      message: "Add interests to your profile to get recommendations."
    });
  }

  // Create case-insensitive regex array for interests
  const matchCondition = { $in: interests.map(i => new RegExp(i, 'i')) };

  const [skills, schemes, ideas] = await Promise.all([
    Skill.find({ category: matchCondition }).limit(5),
    Scheme.find({ category: matchCondition }).limit(5),
    BusinessIdea.find({ requiredSkills: matchCondition }).limit(5)
  ]);

  res.json({
    skills,
    schemes,
    ideas
  });
});
