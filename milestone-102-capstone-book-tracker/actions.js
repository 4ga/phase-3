import { state } from "./state.js";
import { renderApp } from "./render.js";
import {
  saveState,
  isValidSort,
  isValidAudience,
  isValidAvailability,
  isValidFormat,
  isValidGenre,
} from "./storage.js";

function addBook(book) {
  const now = Date.now();
  const newBook = {
    ...book,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  state.books.push(newBook);

  saveState();
  renderApp();

  return {
    success: true,
    message: `${book.title} added.`,
  };
}

function deleteBook(idToDelete) {
  const bookToDelete = state.books.find((book) => book.id === idToDelete);

  if (!bookToDelete) {
    return {
      success: false,
      message: "Book not found.",
    };
  }

  state.books = state.books.filter((book) => book.id !== idToDelete);

  if (state.editingBookId === idToDelete) {
    state.editingBookId = null;
  }

  saveState();
  renderApp();

  return {
    success: true,
    message: `${bookToDelete.title} deleted.`,
  };
}

function startEditBook(idToEdit) {
  const bookToEdit = state.books.find((book) => book.id === idToEdit);

  if (!bookToEdit) {
    return { success: false, message: "Book not found." };
  }

  state.editingBookId = idToEdit;
  renderApp();

  return {
    success: true,
    message: `Editing ${bookToEdit.title}`,
    book: bookToEdit,
  };
}

function updateBook(editingBookId, book) {
  const bookToUpdate = state.books.find((book) => book.id === editingBookId);

  if (!bookToUpdate) {
    return { success: false, message: "Book not found." };
  }

  state.books = state.books.map((b) =>
    b.id === editingBookId ? { ...b, ...book } : b,
  );

  state.editingBookId = null;

  saveState();
  renderApp();

  return {
    success: true,
    message: `${bookToUpdate.title} updated.`,
  };
}

function cancelEditBook() {
  if (state.editingBookId === null) {
    return {
      success: false,
      message: "No book is being edited.",
    };
  }

  state.editingBookId = null;
  renderApp();

  return {
    success: true,
    message: "Edit canceled.",
  };
}

function setBookSort(sort) {
  if (!isValidSort(sort)) {
    return { success: false, message: "Invalid sort." };
  }
  state.sortBy = sort;

  saveState();
  renderApp();

  return {
    success: true,
    message: "Sort updated.",
  };
}

function setSearchTerm(searchTerm) {
  state.searchTerm = searchTerm;

  saveState();
  renderApp();

  return {
    success: true,
    message: "Search updated.",
  };
}

function setBookFilters(filter) {
  const nextFilters = {
    ...state.filters,
    ...filter,
  };

  if (!isValidGenre(nextFilters.genre)) {
    return { success: false, message: "Invalid genre." };
  }

  if (!isValidAudience(nextFilters.audience)) {
    return { success: false, message: "Invalid audience." };
  }

  if (!isValidAvailability(nextFilters.availability)) {
    return { success: false, message: "Invalid availability." };
  }

  if (!isValidFormat(nextFilters.format)) {
    return { success: false, message: "Invalid format." };
  }

  state.filters = nextFilters;

  saveState();
  renderApp();

  return {
    success: true,
    message: "Filters updated.",
  };
}

export {
  addBook,
  deleteBook,
  startEditBook,
  updateBook,
  cancelEditBook,
  setBookSort,
  setSearchTerm,
  setBookFilters,
};
