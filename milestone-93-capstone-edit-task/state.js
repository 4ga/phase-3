import { FILTERS, SORTS } from "./constants.js";

export function createDefaultTasks() {
  return [
    {
      id: 1,
      title: "Create project layout",
      priority: "high",
      completed: true,
    },
    {
      id: 2,
      title: "Build task form",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Add filtering",
      priority: "low",
      completed: false,
    },
  ];
}

export const state = {
  tasks: createDefaultTasks(),
  nextId: 4,
  currentFilter: FILTERS.ALL,
  currentSort: SORTS.TITLE_ASC,
  searchTerm: "",
  editingTaskId: null,
};

export function resetAppState() {
  state.nextId = 4;
  state.tasks = createDefaultTasks();
  state.currentFilter = FILTERS.ALL;
  state.currentSort = SORTS.TITLE_ASC;
  state.searchTerm = "";
  state.editingTaskId = null;
}
