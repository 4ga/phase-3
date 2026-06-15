import { state } from "./state.js";
import {
  appStatus,
  completeCount,
  inProgressCount,
  taskContainer,
  totalCount,
  formMessage,
  taskLabel,
  submitButton,
  cancelEditButton,
} from "./dom.js";

function renderSummary() {
  const total = state.tasks.length;
  const complete = state.tasks.filter((task) => task.completed).length;
  const inProgress = state.tasks.filter((task) => !task.completed).length;

  totalCount.textContent = `Total: ${total}`;
  completeCount.textContent = `Complete: ${complete}`;
  inProgressCount.textContent = `In Progress: ${inProgress}`;
}

function createTaskItem(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const title = document.createElement("span");
  title.textContent = task.title;

  const priority = document.createElement("span");
  priority.textContent = ` Priority: ${task.priority}`;

  const status = document.createElement("span");
  status.textContent = task.completed
    ? " Status: Complete"
    : " Status: In Progress";

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle";
  toggleButton.dataset.action = "toggle";
  toggleButton.dataset.id = String(task.id);
  toggleButton.setAttribute("aria-label", `Toggle ${task.title}`);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.dataset.action = "edit";
  editButton.dataset.id = String(task.id);
  editButton.setAttribute("aria-label", `Edit ${task.title}`);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = String(task.id);
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

  taskItem.append(
    title,
    priority,
    status,
    toggleButton,
    editButton,
    deleteButton,
  );

  return taskItem;
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
    const taskItem = createTaskItem(task);
    taskList.append(taskItem);
  });
  taskContainer.append(taskList);
}

function renderApp() {
  renderFormState();
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

function renderFormState() {
  const isEditing = state.editingTaskId !== null;

  taskLabel.textContent = isEditing ? "Edit Task" : "New Task";
  submitButton.textContent = isEditing ? "Save Changes" : "Add Task";
  cancelEditButton.hidden = !isEditing;
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
  renderFormState,
  renderApp,
  showAppStatus,
  showFormMessage,
  clearAppStatus,
  clearFormMessage,
};
