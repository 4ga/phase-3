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
  genreFilter,
  audienceFilter,
  availabilityFilter,
  formatFilter,
  searchInput,
  sortSelect,
} from "./dom.js";

function renderSummary() {
  const total = state.books.length;
  totalCount.textContent = `Total: ${total}`;
}

function getVisibleBooks() {
  let visibleBooks = [...state.books];

  const searchTerm = state.searchTerm.trim().toLowerCase();

  if (searchTerm !== "") {
    visibleBooks = visibleBooks.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    });
  }

  if (state.filters.genre !== "all") {
    visibleBooks = visibleBooks.filter(
      (book) => book.genre === state.filters.genre,
    );
  }

  if (state.filters.audience !== "all") {
    visibleBooks = visibleBooks.filter(
      (book) => book.audience === state.filters.audience,
    );
  }

  if (state.filters.availability !== "all") {
    visibleBooks = visibleBooks.filter(
      (book) => book.availability === state.filters.availability,
    );
  }

  if (state.filters.format !== "all") {
    visibleBooks = visibleBooks.filter(
      (book) => book.format === state.filters.format,
    );
  }

  visibleBooks = sortBooks(visibleBooks, state.sortBy);

  return visibleBooks;
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

  const publicationYear = document.createElement("span");
  publicationYear.textContent = book.publicationYear;
  publicationYear.classList.add("publication-year");

  const actions = document.createElement("div");
  actions.classList.add("book-actions");

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.dataset.action = "edit";
  editButton.dataset.id = book.id;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = book.id;

  actions.append(editButton, deleteButton);

  bookItem.append(title, author, publicationYear, actions);

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

function syncFilterControls() {
  if (genreFilter) {
    genreFilter.value = state.filters.genre;
  }

  if (audienceFilter) {
    audienceFilter.value = state.filters.audience;
  }

  if (availabilityFilter) {
    availabilityFilter.value = state.filters.availability;
  }
  if (formatFilter) {
    formatFilter.value = state.filters.format;
  }
}

function syncSearchControl() {
  if (!searchInput) {
    return;
  }
  searchInput.value = state.searchTerm;
}

function syncSortControl() {
  if (!sortSelect) {
    return;
  }
  sortSelect.value = state.sortBy;
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
  syncFilterControls();
  syncSearchControl();
  syncSortControl();
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
