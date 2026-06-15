import { state } from "./state.js";
import {
  appStatus,
  completeCount,
  inProgressCount,
  taskContainer,
  totalCount,
  formMessage,
} from "./dom.js";

function renderSummary() {
  const total = state.tasks.length;
  const complete = state.tasks.filter((task) => task.completed).length;
  const inProgress = state.tasks.filter((task) => !task.completed).length;

  totalCount.textContent = `Total: ${total}`;
  completeCount.textContent = `Complete: ${complete}`;
  inProgressCount.textContent = `In Progress: ${inProgress}`;
}

function renderTaskList() {
  taskContainer.textContent = "";

  if (state.tasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks yet.";
    emptyMessage.classList.add("empty-message");
    taskContainer.append(emptyMessage);
    return;
  }

  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  state.tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const title = document.createElement("span");
    title.textContent = task.title;

    const priority = document.createElement("span");
    priority.textContent = `Priority: ${task.priority}`;

    const status = document.createElement("span");
    status.textContent = task.completed
      ? "Status: Complete"
      : "Status: In Progress";

    taskItem.append(title, priority, status);
    taskList.append(taskItem);
  });
  taskContainer.append(taskList);
}

function renderApp() {
  renderSummary();
  renderTaskList();
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = `form-message`;
}

function showAppStatus(message) {
  appStatus.textContent = message;
}

function clearAppStatus() {
  appStatus.textContent = "";
}

export {
  renderSummary,
  renderTaskList,
  renderApp,
  showAppStatus,
  showFormMessage,
  clearAppStatus,
  clearFormMessage,
};
