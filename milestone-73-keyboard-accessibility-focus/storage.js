import { STORAGE_KEY, state } from "./state.js";

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

    if (typeof parsedState.currentFilter === "string") {
      state.currentFilter = parsedState.currentFilter;
    }

    if (typeof parsedState.searchTerm === "string") {
      state.searchTerm = parsedState.searchTerm;
    }

    if (typeof parsedState.currentSort === "string") {
      state.currentSort = parsedState.currentSort;
    }
  } catch (error) {
    console.error("Failed to load saved state:", error);
  }
}

function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}

export { clearSavedState, loadState, saveState };
