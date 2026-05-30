let skills = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "DOM Manipulation" },
];

const skillContainer = document.querySelector("#skill-container");

function renderSkills() {
  // clear container
  skillContainer.textContent = "";
  // if skills is empty, render a message and return
  if (skills.length === 0) {
    // show empty message
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No skills yet. Add your first skill.";
    emptyMessage.classList.add("empty-message");
    skillContainer.append(emptyMessage);
    return;
  }

  // otherwise render skill list
  const ul = document.createElement("ul");
  skills.forEach((el) => {
    const skill = document.createElement("li");
    skill.textContent = el.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteSkill(el.id));

    skill.append(deleteBtn);
    ul.append(skill);
  });

  skillContainer.append(ul);
}

function deleteSkill(idToDelete) {
  // filter by id
  skills = skills.filter((el) => el.id !== idToDelete);
  // re-render
  renderSkills();
}

renderSkills();
