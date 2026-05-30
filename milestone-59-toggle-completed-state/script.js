let skills = [
  { id: 1, name: "JavaScript", completed: true },
  { id: 2, name: "DOM Manipulation", completed: false },
  { id: 3, name: "Events", completed: false },
  { id: 4, name: "Forms", completed: true },
];

const skillsList = document.getElementById("skill-list");

function renderSkills() {
  // clear list
  skillsList.textContent = "";

  // render each skill with name, status, and toggle button
  skills.forEach((el) => {
    const item = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add(el.completed ? "complete" : "in-progress");
    const status = el.completed ? "Complete" : "In Progress";

    item.textContent = `${el.name} `;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle";

    toggleButton.addEventListener("click", () => toggleSkill(el.id));

    span.append(status);
    item.append(span, toggleButton);
    skillsList.append(item);
  });
}

function toggleSkill(idToToggle) {
  // use map to flip completed on the matching skill
  skills = skills.map((el) =>
    el.id === idToToggle ? { ...el, completed: !el.completed } : el,
  );
  // re-render
  renderSkills();
}

renderSkills();
