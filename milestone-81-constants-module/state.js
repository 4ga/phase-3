import { FILTERS, SORTS } from "./constants.js";

export function createDefaultSkills() {
  return [
    { id: 1, name: "JavaScript", completed: true },
    { id: 2, name: "DOM Manipulation", completed: false },
    { id: 3, name: "Events", completed: false },
    { id: 4, name: "Forms", completed: true },
  ];
}

export const state = {
  nextId: 5,
  currentFilter: FILTERS.ALL,
  searchTerm: "",
  currentSort: SORTS.NAME_ASC,
  editingSkillId: null,
  skills: createDefaultSkills(),
};

export function resetAppState() {
  state.nextId = 5;
  state.currentFilter = FILTERS.ALL;
  state.searchTerm = "";
  state.currentSort = SORTS.NAME_ASC;
  state.editingSkillId = null;
  state.skills = createDefaultSkills();
}
