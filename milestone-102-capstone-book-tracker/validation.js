import { MAX_BOOK_AUTHOR_LENGTH, MAX_BOOK_TITLE_LENGTH } from "./constants.js";

function handleValidateBookTitle(title) {
  if (title === "") {
    return {
      success: false,
      message: "Please enter a book title.",
    };
  }
  if (title.length > MAX_BOOK_TITLE_LENGTH) {
    return {
      success: false,
      message: `Book titles must be ${MAX_BOOK_TITLE_LENGTH} characters or fewer.`,
    };
  }
  return {
    success: true,
    message: "",
  };
}

function handleValidateBookAuthor(author) {
  if (author === "") {
    return {
      success: false,
      message: "Please enter a book author,",
    };
  }

  if (author.length > MAX_BOOK_AUTHOR_LENGTH) {
    return {
      success: false,
      message: `Book authors must be ${MAX_BOOK_AUTHOR_LENGTH} characters or fewer.`,
    };
  }
  return {
    success: true,
    message: "",
  };
}

function handleValidateBookYear(year) {
  if (year === "") {
    return {
      success: false,
      message: "Please enter a book publication year.",
    };
  }

  const isValid = /^\d{4}$/.test(year);

  if (!isValid) {
    return {
      success: false,
      message: "Book publication year must be a number.",
    };
  }

  return {
    success: true,
    message: "",
  };
}

function handleValidateFormat(format) {
  if (!format) {
    return { success: false, message: "Format is required." };
  }
  return {
    success: true,
    message: "",
  };
}

function handleValidateGenre(genre) {
  if (!genre) {
    return { success: false, message: "Genre is required." };
  }
  return {
    success: true,
    message: "",
  };
}

function handleValidateAudience(audience) {
  if (!audience) {
    return { success: false, message: "Audience is required." };
  }
  return {
    success: true,
    message: "",
  };
}

function handleValidateAvailability(availability) {
  if (!availability) {
    return { success: false, message: "Availability is required." };
  }
  return {
    success: true,
    message: "",
  };
}

export {
  handleValidateBookTitle,
  handleValidateBookYear,
  handleValidateBookAuthor,
  handleValidateFormat,
  handleValidateGenre,
  handleValidateAudience,
  handleValidateAvailability,
};
