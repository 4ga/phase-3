import { addTask } from "./actions.js";
import { prioritySelect, taskForm, taskInput } from "./dom.js";
import { clearFormMessage, renderApp, showFormMessage } from "./render.js";
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

taskForm.addEventListener("submit", handleSubmit);
taskInput.addEventListener("input", handleTaskInput);

renderApp();
