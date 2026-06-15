import { addTask, deleteTask, toggleTask } from "./actions.js";
import { prioritySelect, taskContainer, taskForm, taskInput } from "./dom.js";
import {
  clearFormMessage,
  renderApp,
  showAppStatus,
  showFormMessage,
} from "./render.js";
import { validateTaskTitle } from "./validation.js";

function handleValidationResult(result) {
  if (result.success) {
    return true;
  }

  showFormMessage(result.message, "error");
  return false;
}

function resetTaskInput() {
  taskInput.value = "";
  taskInput.focus();
}

function handleAddTaskSubmit(title, priority) {
  const result = addTask(title, priority);

  if (result.success) {
    resetTaskInput();
    showFormMessage("Task added successfully.", "success");
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

  handleAddTaskSubmit(title, priority);
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
  }

  if (action === "delete") {
    const result = deleteTask(id);
    handleActionResult(result);
  }
}

taskForm.addEventListener("submit", handleSubmit);
taskInput.addEventListener("input", handleTaskInput);
taskContainer.addEventListener("click", handleTaskContainerClick);

renderApp();
