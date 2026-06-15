import { state } from "./state.js";
import { renderApp } from "./render.js";

function addTask(title, priority) {
  const task = {
    id: state.nextId,
    title,
    priority,
    completed: false,
  };

  state.tasks.push(task);
  state.nextId++;

  renderApp();

  return {
    success: true,
    message: `${title} added.`,
  };
}

function toggleTask(idToToggle) {
  const taskToToggle = state.tasks.find((task) => task.id === idToToggle);

  if (!taskToToggle) {
    return {
      success: false,
      message: "Task not found.",
    };
  }

  const nextCompleted = !taskToToggle.completed;

  state.tasks = state.tasks.map((task) =>
    task.id === idToToggle ? { ...task, completed: nextCompleted } : task,
  );

  renderApp();

  return {
    success: true,
    message: `${taskToToggle.title} marked as ${nextCompleted ? "complete" : "in progress"}.`,
  };
}

function deleteTask(idToDelete) {
  const taskToDelete = state.tasks.find((task) => task.id === idToDelete);

  if (!taskToDelete) {
    return {
      success: false,
      message: "Task not found.",
    };
  }

  state.tasks = state.tasks.filter((task) => task.id !== idToDelete);

  renderApp();

  return {
    success: true,
    message: `${taskToDelete.title} deleted.`,
  };
}

export { addTask, toggleTask, deleteTask };
