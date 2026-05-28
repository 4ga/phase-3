const developer = {
  name: "Grace Akpan",
  role: "Aspiring Software Engineer",
  phase: "Phase 3",
  skills: ["JavaScript", "Data Structures", "Algorithms", "DOM Manipulation"],
};

function renderDeveloperProfile(developer) {
  // Build the DOM here
  const app = document.querySelector("#app");
  const profileCard = document.createElement("section");
  profileCard.classList.add("profile-card");

  const name = document.createElement("h1");
  name.textContent = developer.name;

  const role = document.createElement("h2");
  role.textContent = developer.role;

  const phase = document.createElement("p");
  phase.textContent = `Current roadmap phase: ${developer.phase}`;

  const skillsLabel = document.createElement("h3");
  skillsLabel.textContent = "Skills";

  const skillsList = document.createElement("ul");
  developer.skills.forEach((el) => {
    const item = document.createElement("li");
    item.textContent = el;
    skillsList.appendChild(item);
  });

  profileCard.append(name, role, phase, skillsLabel, skillsList);
  
  app.append(profileCard);
}

renderDeveloperProfile(developer);
