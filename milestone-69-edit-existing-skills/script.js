let nextId = 5;
const STORAGE_KEY = "phase3-skill-manager-state";

let currentFilter = "all";
let searchTerm = "";
let currentSort = "name-asc";
let editingSkillId = null;

function createDefaultSkills() {
  return [
    { id: 1, name: "JavaScript", completed: true },
    { id: 2, name: "DOM Manipulation", completed: false },
    { id: 3, name: "Events", completed: false },
    { id: 4, name: "Forms", completed: true },
  ];
}

let skills = createDefaultSkills();

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const skillContainer = document.querySelector("#skill-container");
const formMessage = document.querySelector("#form-message");

const skillLabel = document.querySelector("#skill-label");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");

const totalCount = document.querySelector("#total-count");
const completeCount = document.querySelector("#complete-count");
const inProgressCount = document.querySelector("#in-progress-count");

const filterButtons = document.querySelectorAll(".filter-button");
const resetButton = document.querySelector("#reset-button");

function getVisibleSkills() {
  let visibleSkills = skills;

  // Apply currentFilter
  if (currentFilter === "complete") {
    visibleSkills = visibleSkills.filter((el) => el.completed);
  } else if (currentFilter === "in-progress") {
    visibleSkills = visibleSkills.filter((el) => !el.completed);
  }

  // Apply searchTerm
  if (searchTerm.length > 0) {
    visibleSkills = visibleSkills.filter((el) =>
      el.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  // Apply currentSort
  if (currentSort === "name-asc") {
    visibleSkills = [...visibleSkills].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  } else if (currentSort === "name-desc") {
    visibleSkills = [...visibleSkills].sort((a, b) =>
      b.name.localeCompare(a.name),
    );
  } else if (currentSort === "complete-first") {
    visibleSkills = [...visibleSkills].sort(
      (a, b) => Number(b.completed) - Number(a.completed),
    );
  } else if (currentSort === "in-progress-first") {
    visibleSkills = [...visibleSkills].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    );
  }

  return visibleSkills;
}

function renderSummary() {
  // calculate total, complete, in-progress
  const total = skills.length;
  const complete = skills.filter((el) => el.completed).length;
  const inprog = skills.filter((el) => !el.completed).length;
  // update summary text
  totalCount.textContent = `Total: ${total}`;
  completeCount.textContent = `Complete: ${complete}`;
  inProgressCount.textContent = `In Progress: ${inprog}`;
}

function renderFilterButtons() {
  // add active class to selected filter
  filterButtons.forEach((btn) =>
    btn.dataset.filter === currentFilter
      ? btn.classList.add("active")
      : btn.classList.remove("active"),
  );
}

function renderSkills() {
  // clear container
  skillContainer.textContent = "";

  searchInput.value = searchTerm;
  sortSelect.value = currentSort;

  // render summary
  renderSummary();
  // render filter buttons
  renderFilterButtons();
  // get visible skills
  const visibleSkills = getVisibleSkills();
  // if none visible, show empty message and return
  if (visibleSkills.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.textContent = "No skills match for this search or filter.";
    emptyText.classList.add("empty-message");
    skillContainer.append(emptyText);
    return;
  }
  // render visible skills
  const skillsList = document.createElement("ul");
  visibleSkills.forEach((el) => {
    const skill = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = `${el.name}`;

    const status = document.createElement("span");
    status.textContent = el.completed ? "Complete" : "In Progress";
    status.classList.add("status", el.completed ? "complete" : "in-progress");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.addEventListener("click", () => toggleSkill(el.id));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEditSkill(el.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteSkill(el.id));

    skill.append(name, status, toggleBtn, editBtn, deleteBtn);
    skillsList.append(skill);
  });
  skillContainer.append(skillsList);
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

function skillAlreadyExists(name, excludedId = null) {
  const normalizedName = name.toLowerCase();
  return skills.some(
    (skill) =>
      skill.id !== excludedId && skill.name.toLowerCase() === normalizedName,
  );
}

function handleSkillInput() {
  clearFormMessage();
}

function addSkill(name) {
  // create object
  const skill = { id: nextId, name, completed: false };
  // push
  skills.push(skill);
  // increment nextId
  nextId++;

  // re-render
  saveState();
  renderSkills();
}

function renderFormState() {
  const isEditing = editingSkillId !== null;

  skillLabel.textContent = isEditing ? "Edit Skill" : "New Skill";
  submitButton.textContent = isEditing ? "Save Changes" : "Add Skill";
  cancelEditButton.hidden = !isEditing;
}

function startEditSkill(idToEdit) {
  const skillToEdit = skills.find((skill) => skill.id === idToEdit);

  if (!skillToEdit) {
    return;
  }

  editingSkillId = idToEdit;
  skillInput.value = skillToEdit.name;

  clearFormMessage();
  renderFormState();
  skillInput.focus();
}

function cancelEdit() {
  editingSkillId = null;
  skillInput.value = "";

  clearFormMessage();
  renderFormState();
}

function deleteSkill(idToDelete) {
  // filter by id
  skills = skills.filter((el) => el.id !== idToDelete);

  if (editingSkillId === idToDelete) {
    cancelEdit();
  }
  // re-render
  saveState();
  renderSkills();
}

function toggleSkill(idToToggle) {
  // map by id
  skills = skills.map((skill) =>
    skill.id === idToToggle ? { ...skill, completed: !skill.completed } : skill,
  );
  // re-render
  saveState();
  renderSkills();
}

function setFilter(filter) {
  // update currentFilter
  currentFilter = filter;
  // re-render
  saveState();
  renderSkills();
}

function setSearchTerm(term) {
  // update searchTerm
  searchTerm = term;
  // re-render
  saveState();
  renderSkills();
}

function setSort(sortValue) {
  // update currentSort
  currentSort = sortValue;
  // re-render
  saveState();
  renderSkills();
}

function handleSubmit(event) {
  event.preventDefault();

  // read and trim input
  const skill = skillInput.value.trim();

  // validate
  if (skill === "") {
    showFormMessage("Please enter a skill.", "error");
    return;
  }

  if (skill.length > 40) {
    showFormMessage("Skill names must be 40 characters or fewer.", "error");
    return;
  }

  if (skillAlreadyExists(skill, editingSkillId)) {
    showFormMessage("That skill already exists.", "error");
    return;
  }

  if (editingSkillId !== null) {
    updateSkill(editingSkillId, skill);

    editingSkillId = null;
    skillInput.value = "";
    renderFormState();

    showFormMessage("Skill updated successfully.", "success");
    return;
  }

  // add skill
  addSkill(skill);

  // clear input
  skillInput.value = "";

  showFormMessage("Skill added successfully.", "success");
}

function handleSearchInput(event) {
  // read event.target.value
  const value = event.target.value.trim();

  // update searchTerm
  setSearchTerm(value);
}

function handleSortChange(event) {
  // read event.target.value and update currentSort
  setSort(event.target.value);
}

function saveState() {
  // save skills, nextId, currentFilter, searchTerm, currentSort
  const state = {
    skills,
    nextId,
    currentFilter,
    searchTerm,
    currentSort,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState === null) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (Array.isArray(parsedState.skills)) {
      skills = parsedState.skills;
    }

    if (Number.isInteger(parsedState.nextId)) {
      nextId = parsedState.nextId;
    }

    if (typeof parsedState.currentFilter === "string") {
      currentFilter = parsedState.currentFilter;
    }

    if (typeof parsedState.searchTerm === "string") {
      searchTerm = parsedState.searchTerm;
    }

    if (typeof parsedState.currentSort === "string") {
      currentSort = parsedState.currentSort;
    }
  } catch (error) {
    console.error("Failed to load saved state:", error);
  }
}

function resetState() {
  const confirmed = globalThis.window.confirm(
    "Reset all skills and settings to their defaults?",
  );
  if (!confirmed) {
    return;
  }
  skills = createDefaultSkills();
  nextId = 5;
  currentFilter = "all";
  searchTerm = "";
  currentSort = "name-asc";

  editingSkillId = null;
  skillInput.value = "";
  clearFormMessage();
  renderFormState();
  localStorage.removeItem(STORAGE_KEY);
  renderSkills();
}

function updateSkill(idToUpdate, newName) {
  skills = skills.map((skill) =>
    skill.id === idToUpdate ? { ...skill, name: newName } : skill,
  );

  saveState();
  renderSkills();
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
renderSkills();
