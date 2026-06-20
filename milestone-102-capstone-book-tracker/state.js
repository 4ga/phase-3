import { AUDIENCE, AVAILABILITY, FORMAT, GENRE, SORTS } from "./constants.js";

export function createBookId() {
  return crypto.randomUUID();
}

export function createDefaultBooks() {
  return [
    {
      id: crypto.randomUUID(),
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publicationYear: 1925,
      format: "book",
      genre: "fiction",
      audience: "adult",
      availability: "available",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "Atomic Habits",
      author: "James Clear",
      publicationYear: 2018,
      format: "audiobook",
      genre: "information-science",
      audience: "adult",
      availability: "checked-out",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publicationYear: 1937,
      format: "e-book",
      genre: "sci-fi-fantasy",
      audience: "young-adult",
      availability: "available",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "The Hunger Games",
      author: "Suzanne Collins",
      publicationYear: 2008,
      format: "book",
      genre: "sci-fi-fantasy",
      audience: "young-adult",
      availability: "on-hold",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "I Know Why the Caged Bird Sings",
      author: "Maya Angelou",
      publicationYear: 1969,
      format: "book",
      genre: "biography-history",
      audience: "adult",
      availability: "on-hold",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "The Cat in the Hat",
      author: "Dr. Seuss",
      publicationYear: 1957,
      format: "book",
      genre: "childrens-picture-book",
      audience: "children",
      availability: "available",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "Gone Girl",
      author: "Gillian Flynn",
      publicationYear: 2012,
      format: "e-book",
      genre: "mystery-thriller",
      audience: "adult",
      availability: "available",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
}

export const state = {
  books: createDefaultBooks(),
  searchTerm: "",
  sortBy: SORTS.TITLE_ASC,
  filters: {
    genre: GENRE.ALL,
    format: FORMAT.ALL,
    audience: AUDIENCE.ALL,
    availability: AVAILABILITY.ALL,
  },
  editingBookId: null,
};

export function resetState() {
  state.books = createDefaultBooks();
  state.searchTerm = "";
  state.sortBy = SORTS.TITLE_ASC;
  state.filters = {
    genre: GENRE.ALL,
    format: FORMAT.ALL,
    audience: AUDIENCE.ALL,
    availability: AVAILABILITY.ALL,
  };
  state.editingBookId = null;
}
