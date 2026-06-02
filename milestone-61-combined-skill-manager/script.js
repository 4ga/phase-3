let nextId = 3;

let skills = [
  { id: 1, name: "JavaScript", completed: true },
  { id: 2, name: "DOM Manipulation", completed: false },
];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const skillContainer = document.querySelector("#skill-container");

function renderSkills() {
  // clear container
  skillContainer.textContent = "";

  // if empty, render empty message and return
  if (skills.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No skills yet. Add your first skill.";
    emptyMessage.classList.add("empty-message");
    skillContainer.append(emptyMessage);
    return;
  }

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
  // create new object with id, name, completed
  const skill = { id: nextId, name, completed: false };
  // push into skills
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
  // use map to update only the matching skill
  skills = skills.map((s) =>
    s.id === idToToggle ? { ...s, completed: !s.completed } : s,
  );
  // re-render
  renderSkills();
}

function handleSubmit(event) {
  // prevent default
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

renderSkills();
