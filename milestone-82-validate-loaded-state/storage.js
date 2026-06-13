import { state } from "./state.js";
import { FILTERS, SORTS, STORAGE_KEY } from "./constants.js";

function saveState() {
  const savedState = {
    skills: state.skills,
    nextId: state.nextId,
    currentFilter: state.currentFilter,
    searchTerm: state.searchTerm,
    currentSort: state.currentSort,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
}

function isValidFilter(filter) {
  return Object.values(FILTERS).includes(filter);
}

function isValidSort(sort) {
  return Object.values(SORTS).includes(sort);
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState === null) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (Array.isArray(parsedState.skills)) {
      state.skills = parsedState.skills;
    }

    if (Number.isInteger(parsedState.nextId)) {
      state.nextId = parsedState.nextId;
    }

    if (isValidFilter(parsedState.currentFilter)) {
      state.currentFilter = parsedState.currentFilter;
    }

    if (isValidSort(parsedState.currentSort)) {
      state.currentSort = parsedState.currentSort;
    }

    if (typeof parsedState.searchTerm === "string") {
      state.searchTerm = parsedState.searchTerm;
    }
  } catch (error) {
    console.error("Failed to load saved state:", error);
  }
}

function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}

export { clearSavedState, loadState, saveState };
