import { state, resetAppState } from "./state.js";

import { skillInput } from "./dom.js";

import { saveState, clearSavedState } from "./storage.js";

import { renderApp, renderFormState, clearFormMessage } from "./render.js";

function addSkill(name) {
  const skill = {
    id: state.nextId,
    name,
    completed: false,
  };

  state.skills.push(skill);
  state.nextId++;

  saveState();
  renderApp();
}

function deleteSkill(idToDelete) {
  const skillToDelete = state.skills.find((skill) => skill.id === idToDelete);

  if (!skillToDelete) {
    return {
      success: false,
      message: "Skill not found.",
    };
  }

  state.skills = state.skills.filter((skill) => skill.id !== idToDelete);

  if (state.editingSkillId === idToDelete) {
    cancelEdit();
  }

  saveState();
  renderApp();

  return {
    success: true,
    message: `${skillToDelete.name} deleted.`,
  };
}

function toggleSkill(idToToggle) {
  const skillToToggle = state.skills.find((skill) => skill.id === idToToggle);

  if (!skillToToggle) {
    return {
      success: false,
      message: "Skill not found.",
    };
  }

  const nextCompleted = !skillToToggle.completed;

  state.skills = state.skills.map((skill) =>
    skill.id === idToToggle ? { ...skill, completed: nextCompleted } : skill,
  );

  saveState();
  renderApp();

  return {
    success: true,
    message: `${skillToToggle.name} marked as ${nextCompleted ? "complete" : "in progress"}.`,
  };
}

function setFilter(filter) {
  state.currentFilter = filter;

  saveState();
  renderApp();
}

function setSearchTerm(term) {
  state.searchTerm = term;

  saveState();
  renderApp();
}

function setSort(sortValue) {
  state.currentSort = sortValue;

  saveState();
  renderApp();
}

function startEditSkill(idToEdit) {
  const skillToEdit = state.skills.find((skill) => skill.id === idToEdit);

  if (!skillToEdit) {
    return {
      success: false,
      message: "Skill not found.",
    };
  }

  state.editingSkillId = idToEdit;
  skillInput.value = skillToEdit.name;

  clearFormMessage();
  renderFormState();

  // when editing starts, focus the input and select the current skill text
  skillInput.focus();
  skillInput.select();

  return {
    success: true,
    message: `Editing ${skillToEdit.name}.`,
  };
}

function cancelEdit() {
  if (state.editingSkillId === null) {
    return {
      success: false,
      message: "No edit in progress.",
    };
  }

  state.editingSkillId = null;
  skillInput.value = "";

  // Pressing Escape while editing cancels edit mode.
  clearFormMessage();
  renderFormState();
  skillInput.focus();

  return {
    success: true,
    message: "Edit canceled.",
  };
}

function updateSkill(idToUpdate, newName) {
  state.skills = state.skills.map((skill) =>
    skill.id === idToUpdate ? { ...skill, name: newName } : skill,
  );

  saveState();
  renderApp();
}

function resetState() {
  const confirmed = globalThis.window.confirm(
    "Reset all skills and settings to their defaults?",
  );

  if (!confirmed) {
    return {
      success: false,
      message: "Reset canceled.",
    };
  }

  resetAppState();

  skillInput.value = "";

  clearFormMessage();
  renderFormState();
  clearSavedState();
  renderApp();

  skillInput.focus();

  return {
    success: true,
    message: "App reset to defaults.",
  };
}

function skillAlreadyExists(name, excludedId = null) {
  const normalizedName = name.toLowerCase();

  return state.skills.some(
    (skill) =>
      skill.id !== excludedId && skill.name.toLowerCase() === normalizedName,
  );
}

export {
  addSkill,
  deleteSkill,
  toggleSkill,
  setFilter,
  setSearchTerm,
  setSort,
  startEditSkill,
  cancelEdit,
  updateSkill,
  resetState,
  skillAlreadyExists,
};
