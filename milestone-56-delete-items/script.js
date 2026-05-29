let skills = ["JavaScript", "DOM Manipulation", "Events", "Forms"];

const skillList = document.querySelector("#skill-list");

function renderSkills() {
  // clear the list
  skillList.textContent = "";
  // render every skill with a delete button
  skills.forEach((el) => {
    const skill = document.createElement("li");
    skill.textContent = el;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteSkill(el));
    skill.append(deleteBtn);
    skillList.appendChild(skill);
  });
}

function deleteSkill(skillToDelete) {
  // remove skill from skills
  skills = skills.filter((skill) => skill !== skillToDelete);

  // re-render
  renderSkills();
}

renderSkills();
