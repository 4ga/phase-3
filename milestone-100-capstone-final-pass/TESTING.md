# Milestone 100 Testing Checklist

## Startup

- [ ] App loads without console errors.
- [ ] Default tasks render when no saved state exists.
- [ ] Summary shows the correct total count.
- [ ] Summary shows the correct complete count.
- [ ] Summary shows the correct in-progress count.
- [ ] Search input matches `state.searchTerm`.
- [ ] Sort select matches `state.currentSort`.
- [ ] Active filter button has `aria-pressed="true"`.
- [ ] Inactive filter buttons have `aria-pressed="false"`.

## Add Task

- [ ] Submitting an empty title shows an error message.
- [ ] Submitting a title over the max length shows an error message.
- [ ] Submitting a valid title adds a task.
- [ ] Added task uses the selected priority.
- [ ] Added task starts as In Progress.
- [ ] Summary updates after adding.
- [ ] Input clears after adding.
- [ ] Input is focused after adding.
- [ ] Success message appears after adding.

## Toggle Task

- [ ] Clicking Toggle changes In Progress to Complete.
- [ ] Clicking Toggle again changes Complete to In Progress.
- [ ] Summary updates after toggle.
- [ ] App status appears after toggle.
- [ ] Toggle works for default tasks.
- [ ] Toggle works for newly added tasks.

## Delete Task

- [ ] Clicking Delete removes the correct task.
- [ ] Summary updates after delete.
- [ ] Empty state appears after deleting all visible tasks.
- [ ] App status appears after delete.
- [ ] Delete works for default tasks.
- [ ] Delete works for newly added tasks.

## Edit Task

- [ ] Clicking Edit enters edit mode.
- [ ] Task title loads into the input.
- [ ] Task priority loads into the priority select.
- [ ] Form label changes to Edit Task.
- [ ] Submit button changes to Save Changes.
- [ ] Cancel Edit button appears.
- [ ] Saving edit updates the existing task.
- [ ] Saving edit does not create a duplicate task.
- [ ] Saving edit preserves completed status.
- [ ] Saving edit exits edit mode.
- [ ] Saving edit clears and focuses the input.
- [ ] Cancel Edit exits edit mode without changing the task.
- [ ] Deleting the task being edited exits edit mode.

## Filter Tasks

- [ ] All filter shows all tasks.
- [ ] Complete filter shows only completed tasks.
- [ ] In Progress filter shows only incomplete tasks.
- [ ] Summary still counts all tasks.
- [ ] Empty message appears when selected filter has no matches.
- [ ] Active filter button gets the active class.
- [ ] Active filter button has `aria-pressed="true"`.
- [ ] Inactive filter buttons have `aria-pressed="false"`.

## Search Tasks

- [ ] Typing in search filters visible tasks.
- [ ] Search is case-insensitive.
- [ ] Search matches task title.
- [ ] Empty search restores normal visible tasks.
- [ ] Search combines with All filter.
- [ ] Search combines with Complete filter.
- [ ] Search combines with In Progress filter.
- [ ] Empty message appears when search has no matches.

## Sort Tasks

- [ ] Title A-Z sorts visible tasks alphabetically.
- [ ] Title Z-A sorts visible tasks reverse alphabetically.
- [ ] High Priority First sorts high, then medium, then low.
- [ ] Low Priority First sorts low, then medium, then high.
- [ ] Sorting combines with the current filter.
- [ ] Sorting combines with the current search.
- [ ] Sorting does not mutate the underlying saved task order unexpectedly.

## Persistence

- [ ] Added tasks remain after refresh.
- [ ] Deleted tasks stay deleted after refresh.
- [ ] Toggled completed state remains after refresh.
- [ ] Edited task titles remain after refresh.
- [ ] Edited task priorities remain after refresh.
- [ ] Selected filter remains after refresh.
- [ ] Search term remains after refresh.
- [ ] Sort option remains after refresh.
- [ ] Search input visually matches saved search term after refresh.
- [ ] Sort select visually matches saved sort after refresh.
- [ ] Edit mode is not restored after refresh.

## Reset

- [ ] Clicking Reset asks for confirmation.
- [ ] Canceling reset changes nothing.
- [ ] Confirming reset restores default tasks.
- [ ] Confirming reset restores `nextId` to 4.
- [ ] Confirming reset restores All filter.
- [ ] Confirming reset restores Title A-Z sort.
- [ ] Confirming reset clears search.
- [ ] Confirming reset exits edit mode.
- [ ] Confirming reset clears task input.
- [ ] Confirming reset resets priority select.
- [ ] Confirming reset clears form message.
- [ ] Confirming reset removes the app localStorage key.
- [ ] Confirming reset shows app status.
- [ ] Confirming reset focuses task input.
- [ ] Refresh after reset shows defaults.

## Keyboard Accessibility

- [ ] Pressing Escape while task input is focused during edit cancels edit.
- [ ] Pressing Escape while priority select is focused during edit cancels edit.
- [ ] Pressing Escape while not editing does nothing harmful.
- [ ] Pressing Escape in search input clears search.
- [ ] Clearing search with Escape updates visible tasks.
- [ ] Clearing search with Escape persists empty search term.
- [ ] Search cleared status appears.

## localStorage Safety

- [ ] Corrupted JSON in localStorage does not crash the app.
- [ ] Invalid filter value is ignored.
- [ ] Invalid sort value is ignored.
- [ ] Invalid task objects are ignored.
- [ ] Empty task array persists correctly.
- [ ] Unsafe `nextId` is corrected.
- [ ] `editingTaskId` is not persisted.
- [ ] `localStorage.clear()` is not used.

## Final Code Review

- [ ] No temporary `console.log` calls remain.
- [ ] No broken imports.
- [ ] File is named `actions.js`, not `action.js`.
- [ ] All imported functions are exported.
- [ ] All event listeners are attached once.
- [ ] Form messages use consistent punctuation.
- [ ] App status messages use consistent punctuation.
- [ ] App still works after a hard refresh.
