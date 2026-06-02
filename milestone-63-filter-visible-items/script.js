let nextId = 5;

let currentFilter = "all";

let skills = [
  { id: 1, name: "JavaScript", completed: true },
  { id: 2, name: "DOM Manipulation", completed: false },
  { id: 3, name: "Events", completed: false },
  { id: 4, name: "Forms", completed: true },
];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const skillContainer = document.querySelector("#skill-container");

const totalCount = document.querySelector("#total-count");
const completeCount = document.querySelector("#complete-count");
const inProgressCount = document.querySelector("#in-progress-count");

const filterButtons = document.querySelectorAll(".filter-button");

function getVisibleSkills() {
  // return filtered skills based on currentFilter
  if (currentFilter === "complete") {
    return skills.filter((skill) => skill.completed);
  } else if (currentFilter === "in-progress") {
    return skills.filter((skill) => !skill.completed);
  }
  return skills;
}

function renderSummary() {
  // calculate total
  const count = skills.length;
  // calculate complete
  const completedCount = skills.filter((skill) => skill.completed).length;
  // calculate in progress
  const inProgCount = skills.filter((skill) => !skill.completed).length;
  // updaste summary text
  totalCount.textContent = `Total: ${count}`;
  completeCount.textContent = `Complete: ${completedCount}`;
  inProgressCount.textContent = `In Progress: ${inProgCount}`;
}

function renderFilterButtons() {
  // add active class to the selected filter button
  //  remove it from the others
  filterButtons.forEach((btn) => {
    return btn.dataset.filter === currentFilter
      ? btn.classList.add("active")
      : btn.classList.remove("active");
  });
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
  // if visibleSkills is empty, show message and return
  if (visibleSkills.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No skills match this filter.";
    emptyMessage.classList.add("empty-message");
    skillContainer.append(emptyMessage);
    return;
  }
  // create ul
  const skillsList = document.createElement("ul");
  // otherwise render visibleSkills
  visibleSkills.forEach((el) => {
    const skill = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = `${el.name} `;

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
  // filter full shills array by Id
  skills = skills.filter((el) => el.id !== idToDelete);
  // re-render
  renderSkills();
}

function toggleSkill(idToToggle) {
  // map full skills array by id
  skills = skills.map((el) =>
    el.id === idToToggle ? { ...el, completed: !el.completed } : el,
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

skillForm.addEventListener("submit", handleSubmit);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

renderSkills();
