import { state } from "./state.js";
import {
  addBook,
  deleteBook,
  startEditBook,
  updateBook,
  cancelEditBook,
} from "./actions.js";
import {
  clearFormMessage,
  renderApp,
  showAppStatus,
  showFormMessage,
} from "./render.js";
import {
  bookAuthor,
  bookTitle,
  bookPubYear,
  formatSelect,
  genreSelect,
  audienceSelect,
  availableSelect,
  bookForm,
  booksContainer,
  cancelEditButton,
  formatFilter,
  genreFilter,
  availabilityFilter,
  audienceFilter,
  searchInput,
  sortSelect,
} from "./dom.js";
import {
  handleValidateBookAuthor,
  handleValidateBookYear,
  handleValidateBookTitle,
  handleValidateAudience,
  handleValidateFormat,
  handleValidateGenre,
  handleValidateAvailability,
} from "./validation.js";

function handleValidationResult(result) {
  if (result.success) {
    return true;
  }

  showFormMessage(result.message, "error");
  return false;
}

function resetBookForm() {
  bookTitle.value = "";
  bookTitle.focus();
  bookAuthor.value = "";
  bookPubYear.value = "";
  formatSelect.value = "";
  genreSelect.value = "";
  audienceSelect.value = "";
  availableSelect.value = "";
}

function handleAddBookAndSubmit(book) {
  const result = addBook(book);

  if (result.success) {
    resetBookForm();
    showFormMessage("Book added successfully.", "success");
  }
}

function handleEditBookSubmit(book) {
  const result = updateBook(state.editingBookId, book);

  if (result.success) {
    resetBookForm();
    showFormMessage("Book updated successfully", "success");
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();
  const publicationYear = bookPubYear.value.trim();
  const format = formatSelect.value.trim();
  const genre = genreSelect.value.trim();
  const audience = audienceSelect.value.trim();
  const availability = availableSelect.value.trim();

  if (!handleValidationResult(handleValidateBookTitle(title))) return;
  if (!handleValidationResult(handleValidateBookAuthor(author))) return;
  if (!handleValidationResult(handleValidateBookYear(publicationYear))) return;
  if (!handleValidationResult(handleValidateGenre(genre))) return;
  if (!handleValidationResult(handleValidateFormat(format))) return;
  if (!handleValidationResult(handleValidateAudience(audience))) return;
  if (!handleValidationResult(handleValidateAvailability(availability))) return;

  const book = {
    title,
    author,
    publicationYear,
    format,
    genre,
    audience,
    availability,
  };

  if (isEditingBook()) {
    handleEditBookSubmit(book);
    return;
  }

  handleAddBookAndSubmit(book);
}

function isEditingBook() {
  return state.editingBookId !== null;
}

function handleBookInput() {
  clearFormMessage();
}

function handleActionResult(result) {
  if (!result?.success) {
    return;
  }
  showAppStatus(result.message);
}

function handleCancelEdit() {
  const result = cancelEditBook();

  if (result.success) {
    resetBookForm();
  }

  handleActionResult(result);
}

function handleBookContainerClick(event) {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  if (!action || !id) {
    return;
  }

  if (action === "edit") {
    const result = startEditBook(id);

    if (result.success) {
      bookTitle.value = result.book.title;
      bookAuthor.value = result.book.author;
      bookPubYear.value = result.book.publicationYear;
      formatSelect.value = result.book.format;
      genreSelect.value = result.book.genre;
      audienceSelect.value = result.book.audience;
      availableSelect.value = result.book.availability;

      bookTitle.focus();
    }

    handleActionResult(result);
    return;
  }
  if (action === "delete") {
    const result = deleteBook(id);
    handleActionResult(result);
  }
}

function handleSortChange(value) {
  state.sortBy = value;
  renderApp();
}

function handleSearchTerm(value) {
  state.searchTerm = value.trim().toLowerCase();
  renderApp();
}

function handleFilterChange(filterName, value) {
  state.filters[filterName] = value;
  renderApp();
}

bookForm.addEventListener("submit", handleSubmit);
bookTitle.addEventListener("input", handleBookInput);
booksContainer.addEventListener("click", handleBookContainerClick);
cancelEditButton.addEventListener("click", handleCancelEdit);

formatFilter.addEventListener("change", () => {
  handleFilterChange("format", formatFilter.value);
});

genreFilter.addEventListener("change", () => {
  handleFilterChange("genre", genreFilter.value);
});

audienceFilter.addEventListener("change", () => {
  handleFilterChange("audience", audienceFilter.value);
});

availabilityFilter.addEventListener("change", () => {
  handleFilterChange("availability", availabilityFilter.value);
});

searchInput.addEventListener("input", () =>
  handleSearchTerm(searchInput.value),
);

sortSelect.addEventListener("change", () => handleSortChange(sortSelect.value));

renderApp();
