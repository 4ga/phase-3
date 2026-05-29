let nextId = 3;

let skills = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "DOM Manipulation" },
];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const skillList = document.querySelector("#skill-list");

function renderSkills() {
  // clear list
  skillList.textContent = "";
  // render skills with delete buttons
  skills.forEach((el) => {
    const item = document.createElement("li");
    item.textContent = el.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteSkill(el.id));
    item.append(deleteBtn);
    skillList.append(item);
  });
}

function addSkill(name) {
  // create a new skill object
  const newSkill = { id: nextId, name };
  // push it into skills
  skills.push(newSkill);
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

function handleSubmit(event) {
  // prevent default
  event.preventDefault();
  // read input
  const name = skillInput.value.trim();
  // validate
  if (name === "") {
    return;
  }
  // add skill
  addSkill(name);
  // clear input
  skillInput.value = "";
}

skillForm.addEventListener("submit", handleSubmit);

renderSkills();
