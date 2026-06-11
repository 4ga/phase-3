import {
  skillForm,
  skillInput,
  searchInput,
  sortSelect,
  filterButtons,
  resetButton,
  cancelEditButton,
} from "./dom.js";

import { loadState } from "./storage.js";

import {
  renderApp,
  renderFormState,
  showFormMessage,
  clearFormMessage,
} from "./render.js";

import {
  addSkill,
  setFilter,
  setSearchTerm,
  setSort,
  resetState,
  cancelEdit,
  skillAlreadyExists,
  updateSkill,
} from "./actions.js";

import { state } from "./state.js";

function handleSubmit(event) {
  event.preventDefault();

  const skill = skillInput.value.trim();

  if (skill === "") {
    showFormMessage("Please enter a skill.", "error");
    return;
  }

  if (skill.length > 40) {
    showFormMessage("Skill names must be 40 characters or fewer.", "error");
    return;
  }

  if (skillAlreadyExists(skill, state.editingSkillId)) {
    showFormMessage("That skill already exists.", "error");
    return;
  }

  if (state.editingSkillId !== null) {
    updateSkill(state.editingSkillId, skill);

    state.editingSkillId = null;
    skillInput.value = "";
    renderFormState();

    showFormMessage("Skill updated successfully.", "success");
    return;
  }

  addSkill(skill);
  skillInput.value = "";

  showFormMessage("Skill added successfully.", "success");
}

function handleSkillInput() {
  clearFormMessage();
}

function handleSearchInput(event) {
  const value = event.target.value.trim();
  setSearchTerm(value);
}

function handleSortChange(event) {
  setSort(event.target.value);
}

skillForm.addEventListener("submit", handleSubmit);
searchInput.addEventListener("input", handleSearchInput);
sortSelect.addEventListener("change", handleSortChange);
resetButton.addEventListener("click", resetState);
skillInput.addEventListener("input", handleSkillInput);
cancelEditButton.addEventListener("click", cancelEdit);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

loadState();
renderFormState();
renderApp();
