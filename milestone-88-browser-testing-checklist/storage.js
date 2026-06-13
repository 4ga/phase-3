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

function shouldLoadSkills(skills, validSkills) {
  return (
    Array.isArray(skills) && (skills.length === 0 || validSkills.length > 0)
  );
}

function getNextIdFromSkills(skills) {
  if (skills.length === 0) {
    return 1;
  }
  const maxId = Math.max(...skills.map((skill) => skill.id));
  return maxId + 1;
}

function isValidSkill(skill) {
  return (
    skill !== null &&
    typeof skill === "object" &&
    Number.isInteger(skill.id) &&
    typeof skill.name === "string" &&
    typeof skill.completed === "boolean"
  );
}

function getValidSkills(skills) {
  if (!Array.isArray(skills)) {
    return [];
  }

  return skills.filter(isValidSkill);
}

function loadSkillsFromParsedState(parsedState) {
  const validSkills = getValidSkills(parsedState.skills);

  if (shouldLoadSkills(parsedState.skills, validSkills)) {
    state.skills = validSkills;
  }
}

function loadNextIdFromParsedState(parsedState) {
  const nextSafeId = getNextIdFromSkills(state.skills);

  if (
    Number.isInteger(parsedState.nextId) &&
    parsedState.nextId >= nextSafeId
  ) {
    state.nextId = parsedState.nextId;
  } else {
    state.nextId = nextSafeId;
  }
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

  if (savedState === null) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    loadSkillsFromParsedState(parsedState);
    loadNextIdFromParsedState(parsedState);
    loadFilterFromParsedState(parsedState);
    loadSortFromParsedState(parsedState);
    loadSearchTermFromParsedState(parsedState);
  } catch (error) {
    console.error("Failed to load saved state:", error);
  }
}

function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}

export { clearSavedState, loadState, saveState };
