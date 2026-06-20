import {
  AUDIENCE,
  AVAILABILITY,
  FORMAT,
  GENRE,
  SORTS,
  STORAGE_KEY,
} from "./constants.js";
import { state } from "./state.js";

function saveState() {
  const stateToSave = {
    books: state.books,
    searchTerm: state.searchTerm,
    sortBy: state.sortBy,
    filters: state.filters,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
}

function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}

function isValidGenre(genre) {
  return Object.values(GENRE).includes(genre);
}

function isValidFormat(format) {
  return Object.values(FORMAT).includes(format);
}

function isValidAudience(audience) {
  return Object.values(AUDIENCE).includes(audience);
}

function isValidAvailability(availability) {
  return Object.values(AVAILABILITY).includes(availability);
}

function isValidSort(sort) {
  return Object.values(SORTS).includes(sort);
}

function isValidBook(book) {
  return (
    book !== null &&
    typeof book === "object" &&
    typeof book.id === "string" &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    Number.isInteger(book.publicationYear) &&
    isValidGenre(book.filters.genre) &&
    isValidFormat(book.filters.format) &&
    isValidAudience(book.filters.audience) &&
    isValidAvailability(book.filters.availability)
  );
}

function getValidBooks(books) {
  if (!Array.isArray(books)) {
    return [];
  }
  return books.filter(isValidBook);
}

function shouldLoadBooks(books, validBooks) {
  return Array.isArray(books) && (books.length === 0 || validBooks.length > 0);
}

function loadBooksFromParsedState(parsedState) {
  const validBooks = getValidBooks(parsedState.books);

  if (shouldLoadBooks(parsedState.books, validBooks)) {
    state.books = validBooks;
  }
}

function loadFilterFromParsedState(parsedState) {
  if (isValidGenre(parsedState.filters.genre)) {
    state.filters.genre = parsedState.filter.genre;
  }

  if (isValidAudience(parsedState.filters.audience)) {
    state.filters.audience = parsedState.filters.audience;
  }

  if (isValidFormat(parsedState.filters.format)) {
    state.filters.format = parsedState.filters.format;
  }

  if (isValidAvailability(parsedState.filters.availability)) {
    state.filters.availability = parsedState.filters.availability;
  }
}

function loadSortFromParsedState(parsedState) {
  if (isValidSort(parsedState.sortBy)) {
    state.sortBy = parsedState.sortBy;
  }
}

function loadSearchTermPassedState(parsedState) {
  if (typeof parsedState.searchTerm === "string") {
    state.searchTerm = parsedState.searchTerm;
  }
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    state.books = Array.isArray(parsedState.books) ? parsedState.books : [];

    state.searchTerm =
      typeof parsedState.searchTerm === "string" ? parsedState.searchTerm : "";

    state.sortBy = isValidSort(parsedState.sortBy)
      ? parsedState.sortBy
      : "year-desc";

    state.filters = {
      genre: isValidGenre(parsedState.filters?.genre)
        ? parsedState.filters.genre
        : "all",
      audience: isValidAudience(parsedState.filters?.audience)
        ? parsedState.filters.audience
        : "all",
      availability: isValidAvailability(parsedState.filters?.availability)
        ? parsedState.filters.availability
        : "all",
      format: isValidFormat(parsedState.filters?.format)
        ? parsedState.filters.format
        : "all",
    };
  } catch {
    clearSavedState();
  }
}

export {
  saveState,
  loadState,
  clearSavedState,
  isValidSort,
  isValidAudience,
  isValidAvailability,
  isValidFormat,
  isValidGenre,
};
