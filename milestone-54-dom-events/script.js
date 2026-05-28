let completedMilestones = 0;

const completeBtn = document.querySelector("#complete-button");
const resetBtn = document.querySelector("#reset-button");
const progressText = document.querySelector("#progress-text");

function renderProgress() {
  // update the page with completedMilestones
  progressText.textContent = `Milestones completed: ${completedMilestones}`;
}

function completeMilestone() {
  // increase completedMilestones
  completedMilestones++;
  // re-render
  renderProgress();
}

function resetProgress() {
  // set completedMilestones back to 0
  completedMilestones = 0;
  // re-render
  renderProgress();
}

completeBtn.addEventListener("click", completeMilestone);
resetBtn.addEventListener("click", resetProgress);

renderProgress();
