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

    if (Object.values(FILTERS).includes(parsedState.currentFilter)) {
      state.currentFilter = parsedState.currentFilter;
    }

    if (Object.values(SORTS).includes(parsedState.currentSort)) {
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
