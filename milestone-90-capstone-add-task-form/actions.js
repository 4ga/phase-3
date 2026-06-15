import { state } from "./state.js";
import { renderApp } from "./render.js";

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

export { addTask };
