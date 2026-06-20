import { state } from "./state.js";
import { renderApp } from "./render.js";

function addBook(book) {
  const now = Date.now();
  const newBook = { ...book, id: state.id, createdAt: now, updatedAt: now };

  state.books.push(newBook);
  state.id = crypto.randomUUID();

  renderApp();

  return {
    success: true,
    message: `${book.title} created.`,
  };
}

function deleteBook(idToDelete) {
  console.log("in delete");
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

export { addBook, deleteBook, startEditBook, updateBook, cancelEditBook };
