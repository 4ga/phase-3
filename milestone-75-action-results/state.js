export const STORAGE_KEY = "phase3-skill-manager-state";

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
  currentFilter: "all",
  searchTerm: "",
  currentSort: "name-asc",
  editingSkillId: null,
  skills: createDefaultSkills(),
};

export function resetAppState() {
  state.nextId = 5;
  state.currentFilter = "all";
  state.searchTerm = "";
  state.currentSort = "name-asc";
  state.editingSkillId = null;
  state.skills = createDefaultSkills();
}
