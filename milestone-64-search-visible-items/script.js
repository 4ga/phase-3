let nextId = 5;

let currentFilter = "all";
let searchTerm = "";

let skills = [
  { id: 1, name: "JavaScript", completed: true },
  { id: 2, name: "DOM Manipulation", completed: false },
  { id: 3, name: "Events", completed: false },
  { id: 4, name: "Forms", completed: true },
];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const searchInput = document.querySelector("#search-input");
const skillContainer = document.querySelector("#skill-container");

const totalCount = document.querySelector("#total-count");
const completeCount = document.querySelector("#complete-count");
const inProgressCount = document.querySelector("#in-progress-count");

const filterButtons = document.querySelectorAll(".filter-button");

function getVisibleSkills() {
  // Start with the full source array
  let visibleSkills = skills;

  // Apply status filter
  if (currentFilter === "complete") {
    visibleSkills = visibleSkills.filter((el) => el.completed);
  } else if (currentFilter === "in-progress") {
    visibleSkills = visibleSkills.filter((el) => !el.completed);
  }

  // Apply search filter
  if (searchTerm.length > 0) {
    visibleSkills = visibleSkills.filter((el) =>
      el.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  return visibleSkills;
}

function renderSummary() {
  // calculate total
  const count = skills.length;
  // calculate complete
  const completedCount = skills.filter((el) => el.completed).length;
  // calculate in progress
  const inProgCount = skills.filter((el) => !el.completed).length;

  // update summary text
  totalCount.textContent = `Total: ${count}`;
  completeCount.textContent = `Complete: ${completedCount}`;
  inProgressCount.textContent = `In Progress: ${inProgCount}`;
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
  // render summary
  renderSummary();
  // render filter buttons
  renderFilterButtons();
  // get visible skills
  const visibleSkills = getVisibleSkills();
  // if none are visible, show empty message and return
  if (visibleSkills.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No skills match for this search or filter.";
    emptyMessage.classList.add("empty-message");
    skillContainer.append(emptyMessage);
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

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteSkill(el.id));

    skill.append(name, status, toggleBtn, deleteBtn);
    skillsList.append(skill);
  });
  skillContainer.append(skillsList);
}

function addSkill(name) {
  // create object
  const skill = { id: nextId, name, completed: false };
  // push
  skills.push(skill);
  // increment nextId
  nextId++;
  // re-render
  renderSkills();
}

function deleteSkill(idToDelete) {
  // filter by id
  skills = skills.filter((skill) => skill.id !== idToDelete);
  // re-render
  renderSkills();
}

function toggleSkill(idToToggle) {
  // map by id
  skills = skills.map((s) =>
    s.id === idToToggle ? { ...s, completed: !s.completed } : s,
  );
  // re-render
  renderSkills();
}

function setFilter(filter) {
  // update currentFilter
  currentFilter = filter;
  // re-render
  renderSkills();
}

function setSearchTerm(term) {
  // update searchTerm
  searchTerm = term;
  // re-render
  renderSkills();
}

function handleSubmit(event) {
  event.preventDefault();

  // read and trim input
  const skill = skillInput.value.trim();

  // validate
  if (skill.length === 0) {
    return;
  }

  // add skill
  addSkill(skill);

  // clear input
  skillInput.value = "";
}

function handleSearchInput(event) {
  // read event.target.value
  const search = event.target.value.trim();

  // update searchTerm
  setSearchTerm(search);
}

skillForm.addEventListener("submit", handleSubmit);

searchInput.addEventListener("input", handleSearchInput);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

renderSkills();
