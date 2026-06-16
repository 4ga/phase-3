import { state, resetAppState } from "./state.js";
import { renderApp } from "./render.js";
import { FILTERS, SORTS } from "./constants.js";
import { saveState, clearSavedState } from "./storage.js";

function addTask(title, priority) {
  const task = {
    id: state.nextId,
    title,
    priority,
    completed: false,
  };

  state.tasks.push(task);
  state.nextId++;

  saveState();
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

  saveState();
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

  saveState();
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

  saveState();
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

function isValidSort(sort) {
  return Object.values(SORTS).includes(sort);
}

function setTaskSort(sort) {
  if (!isValidSort(sort)) {
    return { success: false, message: "Invalid sort." };
  }
  state.currentSort = sort;

  saveState();
  renderApp();

  return {
    success: true,
    message: "Sort updated.",
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

  saveState();
  renderApp();

  return {
    success: true,
    message: `Showing ${filter} tasks.`,
  };
}

function setSearchTerm(searchTerm) {
  state.searchTerm = searchTerm;

  saveState();
  renderApp();

  return {
    success: true,
    message: "Search updated.",
  };
}

function resetState() {
  const confirmed = globalThis.window.confirm(
    "Reset the app? This will remove all saved tasks and restore the defaults.",
  );

  if (!confirmed) {
    return {
      success: false,
      message: "Reset canceled.",
    };
  }

  resetAppState();
  clearSavedState();
  renderApp();

  return {
    success: true,
    message: "App reset to defaults.",
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
  setSearchTerm,
  setTaskSort,
  resetState,
};
