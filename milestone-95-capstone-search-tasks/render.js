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
  filterButtons,
} from "./dom.js";
import { FILTERS } from "./constants.js";

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

  const visibleTasks = getVisibleTasks();

  if (visibleTasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks match your current search or filter.";
    emptyMessage.classList.add("empty-message");
    taskContainer.append(emptyMessage);
    return;
  }

  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  visibleTasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskList.append(taskItem);
  });
  taskContainer.append(taskList);
}

function getVisibleTasks() {
  let visibleTasks = state.tasks;

  if (state.currentFilter === FILTERS.COMPLETE) {
    visibleTasks = visibleTasks.filter((task) => task.completed);
  }

  if (state.currentFilter === FILTERS.IN_PROGRESS) {
    visibleTasks = visibleTasks.filter((task) => !task.completed);
  }

  const normalizedSearchTerm = state.searchTerm.toLowerCase();

  if (normalizedSearchTerm !== "") {
    visibleTasks = visibleTasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearchTerm),
    );
  }
  return visibleTasks;
}

function renderFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === state.currentFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderApp() {
  renderFormState();
  renderSummary();
  renderFilterButtons();
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
