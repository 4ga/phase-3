const skills = ["JavaScript", "DOM Manipulation"];

const skillForm = document.querySelector("#skill-form");
const skillInput = document.querySelector("#skill-input");
const skillList = document.querySelector("#skill-list");

function renderSkills() {
  // clear list
  skillList.textContent = "";

  // render one li per skill
  skills.forEach((el) => {
    const item = document.createElement("li");
    item.textContent = el;
    skillList.appendChild(item);
  });
}

function handleAddSkill(event) {
  event.preventDefault();

  // read input value
  const newSkill = skillInput.value.trim();

  if (newSkill === "") {
    return;
  }

  // add skill to skills
  skills.push(newSkill);

  // clear input
  skillInput.value = "";
  // render
  renderSkills();
}

skillForm.addEventListener("submit", handleAddSkill);

renderSkills();
