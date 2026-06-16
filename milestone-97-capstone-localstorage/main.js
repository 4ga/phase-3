import { state } from "./state.js";
import {
  addTask,
  cancelEditTask,
  deleteTask,
  setSearchTerm,
  setTaskFilter,
  startEditTask,
  toggleTask,
  updateTask,
  setTaskSort,
} from "./actions.js";
import {
  cancelEditButton,
  filterButtons,
  prioritySelect,
  searchInput,
  sortSelect,
  taskContainer,
  taskForm,
  taskInput,
} from "./dom.js";
import {
  clearAppStatus,
  clearFormMessage,
  renderApp,
  showAppStatus,
  showFormMessage,
} from "./render.js";
import { validateTaskTitle } from "./validation.js";
import { PRIORITIES } from "./constants.js";
import { loadState } from "./storage.js";

function handleValidationResult(result) {
  if (result.success) {
    return true;
  }

  showFormMessage(result.message, "error");
  return false;
}

function resetTaskForm() {
  taskInput.value = "";
  prioritySelect.value = PRIORITIES.HIGH;
  taskInput.focus();
}

function handleAddTaskSubmit(title, priority) {
  const result = addTask(title, priority);

  if (result.success) {
    resetTaskForm();
    showFormMessage("Task added successfully.", "success");
  }
}

function handleEditTaskSubmit(title, priority) {
  const result = updateTask(state.editingTaskId, title, priority);

  if (result.success) {
    resetTaskForm();
    showFormMessage("Task updated successfully.", "success");
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const title = taskInput.value.trim();
  const priority = prioritySelect.value;

  const validationResult = validateTaskTitle(title);

  if (!handleValidationResult(validationResult)) {
    return;
  }

  if (isEditingTask()) {
    handleEditTaskSubmit(title, priority);
    return;
  }

  handleAddTaskSubmit(title, priority);
}

function isEditingTask() {
  return state.editingTaskId !== null;
}

function handleTaskInput() {
  clearFormMessage();
}

function handleActionResult(result) {
  if (!result?.success) {
    return;
  }
  showAppStatus(result.message);
}

function handleCancelEdit() {
  const result = cancelEditTask();

  if (result.success) {
    resetTaskForm();
  }

  handleActionResult(result);
}

function handleTaskContainerClick(event) {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (!action || Number.isNaN(id)) {
    return;
  }

  if (action === "toggle") {
    const result = toggleTask(id);
    handleActionResult(result);
    return;
  }

  if (action === "edit") {
    const result = startEditTask(id);

    if (result.success) {
      taskInput.value = result.task.title;
      prioritySelect.value = result.task.priority;
      taskInput.focus();
      taskInput.select();
    }

    handleActionResult(result);
    return;
  }

  if (action === "delete") {
    const result = deleteTask(id);

    if (result.success && state.editingTaskId === null) {
      resetTaskForm();
    }

    handleActionResult(result);
  }
}

function handleFilterClick(event) {
  const filter = event.currentTarget.dataset.filter;
  const result = setTaskFilter(filter);
  handleActionResult(result);
}

function handleSortChange(event) {
  const sort = event.target.value;
  const result = setTaskSort(sort);
  handleActionResult(result);
}

function handleSearchInput(event) {
  const searchTerm = event.target.value.trim();

  setSearchTerm(searchTerm);
  clearAppStatus();
}

taskForm.addEventListener("submit", handleSubmit);
taskInput.addEventListener("input", handleTaskInput);
taskContainer.addEventListener("click", handleTaskContainerClick);
cancelEditButton.addEventListener("click", handleCancelEdit);
searchInput.addEventListener("input", handleSearchInput);
sortSelect.addEventListener("change", handleSortChange);
filterButtons.forEach((button) =>
  button.addEventListener("click", handleFilterClick),
);

loadState();
renderApp();
