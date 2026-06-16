import { MAX_TASK_TITLE_LENGTH } from "./constants.js";

function validateTaskTitle(title) {
  if (title === "") {
    return {
      success: false,
      message: "Please enter a task title.",
    };
  }

  if (title.length > MAX_TASK_TITLE_LENGTH) {
    return {
      success: false,
      message: `Task titles must be ${MAX_TASK_TITLE_LENGTH} characters or fewer.`,
    };
  }
  return {
    success: true,
    message: "",
  };
}

export { validateTaskTitle };
