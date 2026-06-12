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
  state.skills = state.skills.filter((skill) => skill.id !== idToDelete);

  if (state.editingSkillId === idToDelete) {
    cancelEdit();
  }

  saveState();
  renderApp();
}

function toggleSkill(idToToggle) {
  state.skills = state.skills.map((skill) =>
    skill.id === idToToggle ? { ...skill, completed: !skill.completed } : skill,
  );

  saveState();
  renderApp();
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
    return;
  }

  state.editingSkillId = idToEdit;
  skillInput.value = skillToEdit.name;

  clearFormMessage();
  renderFormState();

  // when editing starts, focus the input and select the current skill text
  skillInput.focus();
  skillInput.select();
}

function cancelEdit() {
  state.editingSkillId = null;
  skillInput.value = "";

  // Pressing Escape while editing cancels edit mode.
  clearFormMessage();
  renderFormState();
  skillInput.focus();
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
    return;
  }

  resetAppState();

  skillInput.value = "";

  clearFormMessage();
  renderFormState();
  clearSavedState();
  renderApp();

  skillInput.focus();
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
