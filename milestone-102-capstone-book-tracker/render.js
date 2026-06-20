import { state } from "./state.js";

import {
  booksContainer,
  totalCount,
  formMessage,
  appStatus,
  bookLabel,
  submitButton,
  cancelEditButton,
  filteredCount,
} from "./dom.js";

function renderSummary() {
  const total = state.books.length;
  totalCount.textContent = `Total: ${total}`;
}

function getVisibleBooks() {
  return state.books
    .filter((book) => {
      const searchTerm = state.searchTerm.toLowerCase();

      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    })
    .filter((book) => {
      return (
        state.filters.genre === "all" || book.genre === state.filters.genre
      );
    })
    .filter((book) => {
      return (
        state.filters.format === "all" || book.format === state.filters.format
      );
    })
    .filter((book) => {
      return (
        state.filters.audience === "all" ||
        book.audience === state.filters.audience
      );
    })
    .filter((book) => {
      return (
        state.filters.availability === "all" ||
        book.availability === state.filters.availability
      );
    });
}

function sortBooks(books) {
  return [...books].sort((a, b) => {
    if (state.sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    if (state.sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }

    if (state.sortBy === "author-asc") {
      return a.author.localeCompare(b.author);
    }

    if (state.sortBy === "author-desc") {
      return b.author.localeCompare(a.author);
    }
    if (state.sortBy === "year-asc") {
      return Number(a.publicationYear) - Number(b.publicationYear);
    }

    if (state.sortBy === "year-desc") {
      return Number(b.publicationYear) - Number(a.publicationYear);
    }
  });
}

function createBookItem(book) {
  const bookItem = document.createElement("li");
  bookItem.classList.add("book-item");

  const title = document.createElement("span");
  title.textContent = book.title;
  title.classList.add("book-title");

  const author = document.createElement("span");
  author.textContent = `${book.author}`;
  author.classList.add("book-author");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.dataset.action = "edit";
  editButton.dataset.id = String(book.id);
  editButton.setAttribute("aria-label", `Edit ${book.title}`);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = String(book.id);
  deleteButton.setAttribute("aria-label", `Delete ${book.title}`);

  bookItem.append(title, author, editButton, deleteButton);

  return bookItem;
}

function renderBookList() {
  booksContainer.textContent = "";

  const visibleBooks = getVisibleBooks();
  const sortedBooks = sortBooks(visibleBooks);

  const visibleCount = sortedBooks ? sortedBooks.length : 0;

  filteredCount.textContent = `Filtered: ${visibleCount}`;

  if (visibleCount === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No books yet.";
    emptyMessage.classList.add("empty-message");
    booksContainer.append(emptyMessage);
    return;
  }

  const bookList = document.createElement("ul");
  bookList.classList.add("book-list");

  sortedBooks.forEach((book) => {
    const bookItem = createBookItem(book);
    bookList.append(bookItem);
  });
  booksContainer.append(bookList);
}

function renderFormState() {
  const isEditing = state.editingBookId !== null;

  bookLabel.textContent = isEditing ? "Edit Book" : "New Book";
  submitButton.textContent = isEditing ? "Save Changes" : "Add Book";
  cancelEditButton.hidden = !isEditing;
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = `form-message`;
}

function showAppStatus(message) {
  appStatus.textContent = message;
}

function clearAppStatus() {
  appStatus.textContent = "";
}

function renderApp() {
  renderFormState();
  renderSummary();
  renderBookList();
}

export {
  renderSummary,
  renderBookList,
  renderApp,
  showAppStatus,
  showFormMessage,
  clearAppStatus,
  clearFormMessage,
};
