let nextId = 3;

let skills = [
  { id: 1, name: "JavaScript", completed: true },
  { id: 2, name: "DOM Manipulation", completed: false },
];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const skillContainer = document.querySelector("#skill-container");

const totalCount = document.querySelector("#total-count");
const completeCount = document.querySelector("#complete-count");
const inProgressCount = document.querySelector("#in-progress-count");

function renderSummary() {
  // calculate total
  const count = skills.length;
  // calculate completed count
  const completedCount = skills.filter((skill) => skill.completed).length;
  // calculate in-progress count
  const inProgCount = skills.filter((skill) => !skill.completed).length;
  // update summary text
  totalCount.textContent = `Total: ${count}`;
  completeCount.textContent = `Complete: ${completedCount}`;
  inProgressCount.textContent = `In Progress: ${inProgCount}`;
}

function renderSkills() {
  // clear container
  skillContainer.textContent = "";
  // render summary
  renderSummary();
  // if empty, render empty message and return
  if (skills.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No skills yet. Add your first skill.";
    emptyMessage.classList.add("empty-message");
    skillContainer.append(emptyMessage);
    return;
  }
  // otherwise render list
  const skillsList = document.createElement("ul");

  // otherwise render the list
  skills.forEach((el) => {
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
  // renderSkills
  renderSkills();
}

function deleteSkill(idToDelete) {
  // filter
  skills = skills.filter((el) => el.id !== idToDelete);
  // renderSkills
  renderSkills();
}

function toggleSkill(idToToggle) {
  // map
  skills = skills.map((el) =>
    el.id === idToToggle ? { ...el, completed: !el.completed } : el,
  );
  // renderSkills
  renderSkills();
}

function handleSubmit(event) {
  // prevent default
  event.preventDefault();
  // trim input
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

renderSkills();
