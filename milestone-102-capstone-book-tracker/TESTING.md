# Book Tracker Testing Checklist

## Startup

- [ ] App loads without console errors.
- [ ] Default books render when no saved state exists.
- [ ] Summary shows the correct total count.
- [ ] Summary shows the correct filtered count.
- [ ] Search input matches `state.searchTerm`.
- [ ] Sort select matches `state.sortBy`.

## Add Book

- [ ] Submitting an empty title shows an error message.
- [ ] Submitting a title over the max length shows an error message.
- [ ] Submitting a valid title, author, publication year, genre, format, audience and availability adds a book.
- [ ] Summary updates after adding.
- [ ] Input clears after adding.
- [ ] Input is focused after adding.
- [ ] Success message appears after adding.

## Delete Book

- [ ] Clicking Delete removes the correct book.
- [ ] Summary updates after delete.
- [ ] Empty state appears after deleting all visible books.
- [ ] App status appears after delete.
- [ ] Delete works for default books.
- [ ] Delete works for newly added books.

## Edit Book

- [ ] Clicking Edit enters edit mode.
- [ ] Book title, author, publication year, genre, format, audience and availability loads into the input.
- [ ] Form label changes to Edit Book.
- [ ] Submit button changes to Save Changes.
- [ ] Cancel Edit button appears.
- [ ] Saving edit updates the existing book.
- [ ] Saving edit does not create a duplicate book.
- [ ] Saving edit exits edit mode.
- [ ] Saving edit clears and focuses the input.
- [ ] Cancel Edit exits edit mode without changing the book.
- [ ] Deleting the book being edited exits edit mode.

## Filter Books

- [ ] All filter shows all books.
- [ ] Filter options show only books with corresponding filters.
- [ ] Summary still counts all books.
- [ ] Filtered summary counts filtered books.
- [ ] Empty message appears when selected filter has no matches.

## Search Books

- [ ] Typing in search filters visible books.
- [ ] Search is case-insensitive.
- [ ] Search matches book title or author.
- [ ] Empty search restores normal visible books.
- [ ] Search combines with all filters.
- [ ] Empty message appears when search has no matches.

## Sort Books

- [ ] Title A-Z sorts visible books alphabetically.
- [ ] Title Z-A sorts visible books reverse alphabetically.
- [ ] Author A-Z sorts visible books alphabetically.
- [ ] Author Z-A sorts visible books reverse alphabetically.
- [ ] Year: Oldest to Newest sorts visible books numerically.
- [ ] Year: Newest to Oldest sorts visible books reverse numerically.
- [ ] Sorting combines with the filter options.
- [ ] Sorting combines with the current search.
- [ ] Sorting does not mutate the underlying saved book order unexpectedly.

## Persistence

- [ ] Added books remain after refresh.
- [ ] Deleted books stay deleted after refresh.
- [ ] Edited book titles remain after refresh.
- [ ] Selected filters remains after refresh.
- [ ] Search term remains after refresh.
- [ ] Sort option remains after refresh.
- [ ] Search input visually matches saved search term after refresh.
- [ ] Sort select visually matches saved sort after refresh.
- [ ] Edit mode is not restored after refresh.

## Reset

- [ ] Clicking Reset asks for confirmation.
- [ ] Canceling reset changes nothing.
- [ ] Confirming reset restores default books.
- [ ] Confirming reset restores All to all filter options.
- [ ] Confirming reset restores Title A-Z sort.
- [ ] Confirming reset clears search.
- [ ] Confirming reset exits edit mode.
- [ ] Confirming reset clears book input.
- [ ] Confirming reset clears form message.
- [ ] Confirming reset removes the app localStorage key.
- [ ] Confirming reset shows app status.
- [ ] Confirming reset focuses book input.
- [ ] Refresh after reset shows defaults.

## Keyboard Accessibility

- [ ] Pressing Escape while book input is focused during edit cancels edit.
- [ ] Pressing Escape while not editing does nothing harmful.
- [ ] Pressing Escape in search input clears search.
- [ ] Clearing search with Escape updates visible books.
- [ ] Clearing search with Escape persists empty search term.
- [ ] Search cleared status appears.

## localStorage Safety

- [ ] Corrupted JSON in localStorage does not crash the app.
- [ ] Invalid filter value is ignored.
- [ ] Invalid sort value is ignored.
- [ ] Invalid book objects are ignored.
- [ ] Empty book array persists correctly.
- [ ] `editingBookId` is not persisted.
- [ ] `localStorage.clear()` is not used.

## Final Code Review

- [ ] No temporary `console.log` calls remain.
- [ ] No broken imports.
- [ ] All imported functions are exported.
- [ ] All event listeners are attached once.
- [ ] Form messages use consistent punctuation.
- [ ] App status messages use consistent punctuation.
- [ ] App still works after a hard refresh.
