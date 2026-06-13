# Browser Testing Checklist

## Startup

- [ ] App loads without console errors.
- [ ] Default skills appear on first load.
- [ ] Summary counts are correct.
- [ ] Filter defaults to All.
- [ ] Sort defaults to Name A-Z.
- [ ] Search input starts empty.

## Add / Edit / Delete

- [ ] Add a valid skill.
- [ ] New skill appears in the list.
- [ ] Summary count updates after add.
- [ ] Edit an existing skill.
- [ ] Edited skill name appears in the list.
- [ ] Cancel edit with the Cancel Edit button.
- [ ] Delete an existing skill.
- [ ] Deleted skill disappears from the list.
- [ ] Summary count updates after delete.
- [ ] Delete the skill currently being edited.

## Validation

- [ ] Submitting an empty skill shows “Please enter a skill.”
- [ ] Submitting only spaces shows “Please enter a skill.”
- [ ] Submitting a skill over 40 characters shows the max-length error.
- [ ] Submitting a duplicate skill shows “That skill already exists.”
- [ ] Duplicate validation is case-insensitive.
- [ ] Invalid submissions do not add a new skill.
- [ ] Invalid submissions do not change localStorage.

## Filter / Search / Sort

- [ ] Complete filter shows only complete skills.
- [ ] In Progress filter shows only incomplete skills.
- [ ] All filter shows all skills.
- [ ] Search filters skills by name.
- [ ] Search is case-insensitive.
- [ ] Search + filter work together.
- [ ] Name A-Z sort works.
- [ ] Name Z-A sort works.
- [ ] Complete First sort works.
- [ ] In Progress First sort works.
- [ ] Empty state appears when no skills match search/filter.

## Persistence

- [ ] Added skills persist after refresh.
- [ ] Edited skills persist after refresh.
- [ ] Deleted skills stay deleted after refresh.
- [ ] Completed/in-progress status persists after refresh.
- [ ] Filter selection persists after refresh.
- [ ] Sort selection persists after refresh.
- [ ] Search term persists after refresh.
- [ ] Empty skill list persists after refresh.

## Keyboard Accessibility

- [ ] Tab reaches the skill input.
- [ ] Tab reaches Add/Save button.
- [ ] Tab reaches Cancel Edit button when editing.
- [ ] Tab reaches filter buttons.
- [ ] Tab reaches search input.
- [ ] Tab reaches sort select.
- [ ] Tab reaches Toggle/Edit/Delete buttons.
- [ ] Enter submits the form.
- [ ] Escape cancels edit mode.
- [ ] Escape clears search.
- [ ] Starting edit focuses the skill input.
- [ ] Starting edit selects the current skill text.
- [ ] After add/edit/cancel/reset, focus returns to the skill input.

## Live Status Messages

- [ ] Adding a skill shows form success feedback.
- [ ] Editing a skill shows form success feedback.
- [ ] Toggle shows app status feedback.
- [ ] Delete shows app status feedback.
- [ ] Start edit shows app status feedback.
- [ ] Cancel edit shows app status feedback.
- [ ] Reset shows app status feedback.
- [ ] Escape search clear shows app status feedback.
- [ ] Typing in the form clears stale form/app feedback.
- [ ] Changing filter/search/sort clears stale app feedback.

## localStorage Safety

Run these tests from DevTools Console.

### Invalid filter/sort

```js
localStorage.setItem(
  "phase3-skill-manager-state",
  JSON.stringify({
    skills: [{ id: 99, name: "Storage Test", completed: false }],
    nextId: 100,
    currentFilter: "pizza",
    searchTerm: "",
    currentSort: "chaos-mode",
  }),
);
```

- [ ] Refresh keeps valid skills.
- [ ] Invalid filter falls back to All.
- [ ] Invalid sort falls back to Name A-Z.

### Mixed valid/invalid skills

```js
localStorage.setItem(
  "phase3-skill-manager-state",
  JSON.stringify({
    skills: [
      { id: 99, name: "Valid Skill", completed: false },
      null,
      "bad",
      { id: "wrong", name: "Invalid Skill", completed: true },
    ],
    nextId: 100,
    currentFilter: "all",
    searchTerm: "",
    currentSort: "name-asc",
  }),
);
```

- [ ] Refresh loads only the valid skill.
- [ ] Invalid skill items are ignored.

```js
localStorage.setItem(
  "phase3-skill-manager-state",
  JSON.stringify({
    skills: [null, "bad", { id: "wrong", name: 123, completed: "yes" }],
    nextId: 1,
    currentFilter: "all",
    searchTerm: "",
    currentSort: "name-asc",
  }),
);
```

- [ ] Refresh keeps default skills.
- [ ] Corrupted skills do not replace defaults.

```js
localStorage.setItem(
  "phase3-skill-manager-state",
  JSON.stringify({
    skills: [],
    nextId: 1,
    currentFilter: "all",
    searchTerm: "",
    currentSort: "name-asc",
  }),
);
```

- [ ] Refresh shows empty state.
- [ ] Default skills do not come back.
- [ ] Adding a new skill works.

```js
localStorage.setItem(
  "phase3-skill-manager-state",
  JSON.stringify({
    skills: [{ id: 99, name: "Loaded Skill", completed: false }],
    nextId: 2,
    currentFilter: "all",
    searchTerm: "",
    currentSort: "name-asc",
  }),
);
```

- [ ] Refresh loads the skill.
- [ ] Adding a new skill still gets a safe unique id.
- [ ] Edit/delete/toggle still work after adding.

## Reset

- [ ] Reset asks for confirmation.
- [ ] Canceling reset does not change state.
- [ ] Confirming reset restores default skills.
- [ ] Confirming reset restores All filter.
- [ ] Confirming reset restores Name A-Z sort
- [ ] Confirming reset clears search.
- [ ] Confirming reset clears localStorage
- [ ] Confirming reset returns focus to the skill input.
