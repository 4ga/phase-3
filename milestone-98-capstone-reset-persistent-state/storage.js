import { state } from "./state.js";
import { FILTERS, PRIORITIES, SORTS, STORAGE_KEY } from "./constants.js";

function saveState() {
  const savedState = {
    tasks: state.tasks,
    nextId: state.nextId,
    currentFilter: state.currentFilter,
    currentSort: state.currentSort,
    searchTerm: state.searchTerm,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
}

function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}

function isValidFilter(filter) {
  return Object.values(FILTERS).includes(filter);
}

function isValidSort(sort) {
  return Object.values(SORTS).includes(sort);
}

function isValidPriority(priority) {
  return Object.values(PRIORITIES).includes(priority);
}

function isValidTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    Number.isInteger(task.id) &&
    typeof task.title === "string" &&
    isValidPriority(task.priority) &&
    typeof task.completed === "boolean"
  );
}

function getValidTasks(tasks) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.filter(isValidTask);
}

function shouldLoadTasks(tasks, validTasks) {
  return Array.isArray(tasks) && (tasks.length === 0 || validTasks.length > 0);
}

function getNextIdFromTasks(tasks) {
  if (tasks.length === 0) {
    return 1;
  }

  const maxId = Math.max(...tasks.map((task) => task.id));

  return maxId + 1;
}

function loadTasksFromParsedState(parsedState) {
  const validTasks = getValidTasks(parsedState.tasks);

  if (shouldLoadTasks(parsedState.tasks, validTasks)) {
    state.tasks = validTasks;
  }
}

function loadNextIdFromParsedState(parsedState) {
  const nextSafeId = getNextIdFromTasks(state.tasks);

  if (
    Number.isInteger(parsedState.nextId) &&
    parsedState.nextId >= nextSafeId
  ) {
    state.nextId = parsedState.nextId;
    return;
  }

  state.nextId = nextSafeId;
}

function loadFilterFromParsedState(parsedState) {
  if (isValidFilter(parsedState.currentFilter)) {
    state.currentFilter = parsedState.currentFilter;
  }
}

function loadSortFromParsedState(parsedState) {
  if (isValidSort(parsedState.currentSort)) {
    state.currentSort = parsedState.currentSort;
  }
}

function loadSearchTermFromParsedState(parsedState) {
  if (typeof parsedState.searchTerm === "string") {
    state.searchTerm = parsedState.searchTerm;
  }
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    loadTasksFromParsedState(parsedState);
    loadNextIdFromParsedState(parsedState);
    loadFilterFromParsedState(parsedState);
    loadSortFromParsedState(parsedState);
    loadSearchTermFromParsedState(parsedState);

    state.editingTaskId = null;
  } catch {
    clearSavedState();
  }
}

export { saveState, loadState, clearSavedState };
