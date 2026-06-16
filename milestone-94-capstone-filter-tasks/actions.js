import { state } from "./state.js";
import { renderApp } from "./render.js";
import { FILTERS } from "./constants.js";

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

  if (state.editingTaskId === idToDelete) {
    state.editingTaskId = null;
  }

  renderApp();

  return {
    success: true,
    message: `${taskToDelete.title} deleted.`,
  };
}

function startEditTask(idToEdit) {
  const taskToEdit = state.tasks.find((task) => task.id === idToEdit);

  if (!taskToEdit) {
    return {
      success: false,
      message: "Task not found.",
    };
  }

  state.editingTaskId = idToEdit;
  renderApp();

  return {
    success: true,
    message: `Editing ${taskToEdit.title}.`,
    task: taskToEdit,
  };
}

function updateTask(idToUpdate, title, priority) {
  const taskToUpdate = state.tasks.find((task) => task.id === idToUpdate);

  if (!taskToUpdate) {
    return {
      success: false,
      message: "Task not found.",
    };
  }

  state.tasks = state.tasks.map((task) =>
    task.id === idToUpdate ? { ...task, title, priority } : task,
  );

  state.editingTaskId = null;

  renderApp();

  return {
    success: true,
    message: `${title} updated.`,
  };
}

function cancelEditTask() {
  if (state.editingTaskId === null) {
    return {
      success: false,
      message: "No task is being edited.",
    };
  }

  state.editingTaskId = null;
  renderApp();

  return {
    success: true,
    message: "Edit canceled.",
  };
}

function isValidFilter(filter) {
  return Object.values(FILTERS).includes(filter);
}

function setTaskFilter(filter) {
  if (!isValidFilter(filter)) {
    return {
      success: false,
      message: "Invalid filter.",
    };
  }

  state.currentFilter = filter;
  renderApp();

  return {
    success: true,
    message: `Showing ${filter} tasks.`,
  };
}

export {
  addTask,
  toggleTask,
  deleteTask,
  startEditTask,
  updateTask,
  cancelEditTask,
  setTaskFilter,
};
