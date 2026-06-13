import {
  skillForm,
  skillInput,
  searchInput,
  sortSelect,
  filterButtons,
  resetButton,
  cancelEditButton,
  skillContainer,
} from "./dom.js";

import { loadState } from "./storage.js";

import {
  renderApp,
  renderFormState,
  showFormMessage,
  clearFormMessage,
  showAppStatus,
  clearAppStatus,
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
  toggleSkill,
  deleteSkill,
  startEditSkill,
} from "./actions.js";

import { state } from "./state.js";

function handleActionResult(result) {
  if (!result?.success) {
    return;
  }
  showAppStatus(result.message);
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
    return {
      success: false,
      message: "That skill already exists.",
    };
  }

  return {
    success: true,
    message: "",
  };
}

function handleValidationResult(result) {
  if (result.success) {
    return true;
  }

  showFormMessage(result.message, "error");
  return false;
}

function resetSkillInput() {
  skillInput.value = "";
  skillInput.focus();
}

function handleEditSubmit(skill) {
  updateSkill(state.editingSkillId, skill);

  state.editingSkillId = null;
  renderFormState();
  resetSkillInput();
  showFormMessage("Skill updated successfully.", "success");
}

function handleAddSubmit(skill) {
  addSkill(skill);
  resetSkillInput();

  showFormMessage("Skill added successfully.", "success");
}

function isEditingSkill() {
  return state.editingSkillId !== null;
}

function handleSubmit(event) {
  event.preventDefault();

  const skill = skillInput.value.trim();

  const validationResult = validateSkillName(skill);

  if (!handleValidationResult(validationResult)) {
    return;
  }

  if (isEditingSkill()) {
    handleEditSubmit(skill);
    return;
  }

  handleAddSubmit(skill);
}

function handleSkillInput() {
  clearFormMessage();
  clearAppStatus();
}

function handleSearchInput(event) {
  const value = event.target.value.trim();
  setSearchTerm(value);
  clearAppStatus();
}

function handleSortChange(event) {
  setSort(event.target.value);
  clearAppStatus();
}

function handleSkillContainerClick(event) {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (!action || Number.isNaN(id)) {
    return;
  }

  if (action === "toggle") {
    const result = toggleSkill(id);
    handleActionResult(result);
    return;
  }

  if (action === "edit") {
    const result = startEditSkill(id);
    handleActionResult(result);
    return;
  }

  if (action === "delete") {
    const result = deleteSkill(id);
    handleActionResult(result);
  }
}

function handleSkillInputKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }
  if (state.editingSkillId === null) {
    return;
  }

  const result = cancelEdit();

  handleActionResult(result);
}

function handleSearchInputKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }
  if (state.searchTerm === "") {
    return;
  }

  setSearchTerm("");
  searchInput.focus();
  showAppStatus("Search cleared.");
}

function handleCancelEditClick() {
  const result = cancelEdit();
  handleActionResult(result);
}

function handleResetClick() {
  const result = resetState();
  handleActionResult(result);
}

skillForm.addEventListener("submit", handleSubmit);
searchInput.addEventListener("input", handleSearchInput);
sortSelect.addEventListener("change", handleSortChange);
resetButton.addEventListener("click", handleResetClick);
skillInput.addEventListener("input", handleSkillInput);
cancelEditButton.addEventListener("click", handleCancelEditClick);
skillContainer.addEventListener("click", handleSkillContainerClick);
skillInput.addEventListener("keydown", handleSkillInputKeydown);
searchInput.addEventListener("keydown", handleSearchInputKeydown);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
    clearAppStatus();
  });
});

loadState();
renderFormState();
renderApp();
