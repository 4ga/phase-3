import { state } from "./state.js";
import { FILTERS, SORTS } from "./constants.js";

import {
  searchInput,
  sortSelect,
  skillContainer,
  formMessage,
  skillLabel,
  submitButton,
  cancelEditButton,
  totalCount,
  completeCount,
  inProgressCount,
  filterButtons,
  appStatus,
} from "./dom.js";

function getVisibleSkills() {
  let visibleSkills = state.skills;

  // Apply currentFilter
  if (state.currentFilter === FILTERS.COMPLETE) {
    visibleSkills = visibleSkills.filter((el) => el.completed);
  } else if (state.currentFilter === FILTERS.IN_PROGRESS) {
    visibleSkills = visibleSkills.filter((el) => !el.completed);
  }

  // Apply searchTerm
  if (state.searchTerm.length > 0) {
    visibleSkills = visibleSkills.filter((el) =>
      el.name.toLowerCase().includes(state.searchTerm.toLowerCase()),
    );
  }

  // Apply currentSort
  if (state.currentSort === SORTS.NAME_ASC) {
    visibleSkills = [...visibleSkills].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  } else if (state.currentSort === SORTS.NAME_DESC) {
    visibleSkills = [...visibleSkills].sort((a, b) =>
      b.name.localeCompare(a.name),
    );
  } else if (state.currentSort === SORTS.COMPLETE_FIRST) {
    visibleSkills = [...visibleSkills].sort(
      (a, b) => Number(b.completed) - Number(a.completed),
    );
  } else if (state.currentSort === SORTS.IN_PROGRESS_FIRST) {
    visibleSkills = [...visibleSkills].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    );
  }

  return visibleSkills;
}

function renderSummary() {
  // calculate total, complete, in-progress
  const total = state.skills.length;
  const complete = state.skills.filter((el) => el.completed).length;
  const inprog = state.skills.filter((el) => !el.completed).length;
  // update summary text
  totalCount.textContent = `Total: ${total}`;
  completeCount.textContent = `Complete: ${complete}`;
  inProgressCount.textContent = `In Progress: ${inprog}`;
}

function renderFilterButtons() {
  // add active class to selected filter
  filterButtons.forEach((btn) =>
    btn.dataset.filter === state.currentFilter
      ? btn.classList.add("active")
      : btn.classList.remove("active"),
  );
}

function renderApp() {
  skillContainer.textContent = "";

  renderControls();
  renderFormState();
  renderSummary();
  renderFilterButtons();
  renderSkillList();
}

function renderControls() {
  searchInput.value = state.searchTerm;
  sortSelect.value = state.currentSort;
}

function renderSkillList() {
  const visibleSkills = getVisibleSkills();

  if (visibleSkills.length === 0) {
    renderEmptyMessage("No skills match for this search or filter.");
    return;
  }

  const skillsList = document.createElement("ul");
  skillsList.classList.add("skills-list");

  visibleSkills.forEach((skill) => {
    const skillItem = createSkillItem(skill);
    skillsList.append(skillItem);
  });

  skillContainer.append(skillsList);
}

function renderEmptyMessage(message) {
  const emptyText = document.createElement("p");
  emptyText.textContent = message;
  emptyText.classList.add("empty-message");
  skillContainer.append(emptyText);
}

function createSkillItem(skill) {
  const skillItem = document.createElement("li");
  skillItem.classList.add("skill-item");

  const name = document.createElement("span");
  name.textContent = skill.name;

  const status = document.createElement("span");
  status.textContent = skill.completed ? "Status: Complete" : "Status: In Progress";
  status.classList.add("status", skill.completed ? "complete" : "in-progress");

  const toggleBtn = document.createElement("button");
  toggleBtn.dataset.action = "toggle";
  toggleBtn.classList.add("skill-action-button", "toggle-button");
  toggleBtn.setAttribute("aria-label", `Toggle ${skill.name}`);
  toggleBtn.dataset.id = String(skill.id);
  toggleBtn.textContent = "Toggle";

  const editBtn = document.createElement("button");
  editBtn.dataset.action = "edit";
  editBtn.classList.add("skill-action-button", "edit-button");
  editBtn.setAttribute("aria-label", `Edit ${skill.name}`);
  editBtn.dataset.id = String(skill.id);
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.action = "delete";
  deleteBtn.classList.add("skill-action-button", "delete-button");
  deleteBtn.setAttribute("aria-label", `Delete ${skill.name}`);
  deleteBtn.dataset.id = String(skill.id);
  deleteBtn.textContent = "Delete";

  skillItem.append(name, status, toggleBtn, editBtn, deleteBtn);

  return skillItem;
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

function renderFormState() {
  const isEditing = state.editingSkillId !== null;

  skillLabel.textContent = isEditing ? "Edit Skill" : "New Skill";
  submitButton.textContent = isEditing ? "Save Changes" : "Add Skill";
  cancelEditButton.hidden = !isEditing;
}

function showAppStatus(message) {
  appStatus.textContent = message;
}

function clearAppStatus() {
  appStatus.textContent = "";
}

export {
  getVisibleSkills,
  renderApp,
  renderFormState,
  showFormMessage,
  clearFormMessage,
  showAppStatus,
  clearAppStatus,
};
