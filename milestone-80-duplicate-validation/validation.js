import { state } from "./state.js";

function skillAlreadyExists(name, excludedId = null) {
  const normalizedName = name.toLowerCase();

  return state.skills.some(
    (skill) =>
      skill.id !== excludedId && skill.name.toLowerCase() === normalizedName,
  );
}

function validateSkillName(name) {
  if (name === "") {
    return { success: false, message: "Please enter a skill." };
  }

  if (name.length > 40) {
    return {
      success: false,
      message: "Skill names must be 40 characters or fewer.",
    };
  }

  if (skillAlreadyExists(name, state.editingSkillId)) {
    return { success: false, message: "That skill already exists." };
  }

  return {
    success: true,
    message: "",
  };
}

export { validateSkillName };
