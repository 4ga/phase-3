import { state } from "./state.js";

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
} from "./dom.js";

import { toggleSkill, deleteSkill, startEditSkill } from "./actions.js";

function getVisibleSkills() {
  let visibleSkills = state.skills;

  // Apply currentFilter
  if (state.currentFilter === "complete") {
    visibleSkills = visibleSkills.filter((el) => el.completed);
  } else if (state.currentFilter === "in-progress") {
    visibleSkills = visibleSkills.filter((el) => !el.completed);
  }

  // Apply searchTerm
  if (state.searchTerm.length > 0) {
    visibleSkills = visibleSkills.filter((el) =>
      el.name.toLowerCase().includes(state.searchTerm.toLowerCase()),
    );
  }

  // Apply currentSort
  if (state.currentSort === "name-asc") {
    visibleSkills = [...visibleSkills].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  } else if (state.currentSort === "name-desc") {
    visibleSkills = [...visibleSkills].sort((a, b) =>
      b.name.localeCompare(a.name),
    );
  } else if (state.currentSort === "complete-first") {
    visibleSkills = [...visibleSkills].sort(
      (a, b) => Number(b.completed) - Number(a.completed),
    );
  } else if (state.currentSort === "in-progress-first") {
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

  const name = document.createElement("span");
  name.textContent = skill.name;

  const status = document.createElement("span");
  status.textContent = skill.completed ? "Complete" : "In Progress";
  status.classList.add("status", skill.completed ? "complete" : "in-progress");

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";
  toggleBtn.addEventListener("click", () => toggleSkill(skill.id));

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => startEditSkill(skill.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteSkill(skill.id));

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

export {
  getVisibleSkills,
  renderApp,
  renderFormState,
  showFormMessage,
  clearFormMessage,
};
