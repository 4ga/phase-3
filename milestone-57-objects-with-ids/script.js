let skills = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "DOM Manipulation" },
  { id: 3, name: "Events" },
  { id: 4, name: "Forms" },
];

const skillList = document.querySelector("#skill-list");

function renderSkills() {
  // clear list
  skillList.textContent = "";
  // render each skill.name
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill.name;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    // each delete button calls deleteSkill(skill.id)
    deleteBtn.addEventListener("click", () => deleteSkill(skill.id));
    item.append(deleteBtn);
    skillList.append(item);
  });
}

function deleteSkill(idToDelete) {
  // filter by id
  skills = skills.filter((skill) => skill.id !== idToDelete);
  // re-render
  renderSkills();
}

renderSkills();
