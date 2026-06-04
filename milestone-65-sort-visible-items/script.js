let nextId = 5;

let currentFilter = "all";
let searchTerm = "";
let currentSort = "name-asc";

let skills = [
  { id: 1, name: "JavaScript", completed: true },
  { id: 2, name: "DOM Manipulation", completed: false },
  { id: 3, name: "Events", completed: false },
  { id: 4, name: "Forms", completed: true },
];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const skillContainer = document.querySelector("#skill-container");

const totalCount = document.querySelector("#total-count");
const completeCount = document.querySelector("#complete-count");
const inProgressCount = document.querySelector("#in-progress-count");

const filterButtons = document.querySelectorAll(".filter-button");

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
  skills = skills.filter((el) => el.id !== idToDelete);
  // re-render
  renderSkills();
}

function toggleSkill(idToToggle) {
  // map by id
  skills = skills.map((skill) =>
    skill.id === idToToggle ? { ...skill, completed: !skill.completed } : skill,
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

function setSort(sortValue) {
  // update currentSort
  currentSort = sortValue;
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
  const value = event.target.value.trim();

  // update searchTerm
  setSearchTerm(value);
}

function handleSortChange(event) {
  // read event.target.value and update currentSort
  setSort(event.target.value);
}

skillForm.addEventListener("submit", handleSubmit);
searchInput.addEventListener("input", handleSearchInput);
sortSelect.addEventListener("change", handleSortChange);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

renderSkills();
