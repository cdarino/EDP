// Grab lists and board elements for task creation and drag-and-drop.
const lists = document.querySelectorAll('.list');
const board = document.querySelector('.board');

let cardCounter = 0; // Simple counter to help generate unique card IDs.

// Hide all task forms at startup to ensure the UI is clean.
hideAllTaskForms();

// Attach list-level drag handlers and setup task form interactions.
for (const list of lists) {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('dragenter', dragEnter);
    list.addEventListener('dragleave', dragLeave);
    list.addEventListener('drop', dragDrop);

    const addTaskButton = list.querySelector('.add-task-btn');
    const taskForm = list.querySelector('.task-form');
    const cancelButton = list.querySelector('.cancel-btn');

    // Show the task form when the user wants to create a new card.
    addTaskButton.addEventListener('click', () => {
        // Close other open forms so only one is visible at a time.
        hideAllTaskForms();
        openTaskForm(taskForm);
        taskForm.querySelector('input[name="title"]').focus();
    });

    // Hide and reset the form when the user cancels.
    cancelButton.addEventListener('click', () => {
        taskForm.reset();
        closeTaskForm(taskForm);
    });

    // Create a new task card in this list when the form is submitted.
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const titleValue = taskForm.querySelector('input[name="title"]').value.trim();
        const categoryValue = taskForm.querySelector('input[name="category"]').value.trim();

        if (!titleValue) {
            return;
        }

        const newCard = buildCard(titleValue, categoryValue);
        list.querySelector('.cards').appendChild(newCard);

        taskForm.reset();
        // Close instantly after adding a card (no close transition).
        closeTaskForm(taskForm, true);
    });
}

// Helper to close every task creation form.
function hideAllTaskForms() {
    for (const list of lists) {
        const form = list.querySelector('.task-form');
        if (form) {
            closeTaskForm(form, true);
        }
    }
}

// Open a task form with a smooth transition.
function openTaskForm(form) {
    if (!form || form.classList.contains('is-open')) {
        return;
    }

    form.classList.remove('hidden');
    // Trigger the transition on the next frame.
    requestAnimationFrame(() => {
        form.classList.add('is-open');
    });
}

// Close a task form with a smooth transition.
function closeTaskForm(form, immediate = false) {
    if (!form) {
        return;
    }

    if (immediate) {
        form.classList.remove('is-open');
        form.classList.add('hidden');
        return;
    }

    form.classList.remove('is-open');

    const handleTransitionEnd = () => {
        form.classList.add('hidden');
    };

    form.addEventListener('transitionend', handleTransitionEnd, { once: true });
}

// Event delegation for edit/delete actions to keep newly created cards working.
board.addEventListener('click', (event) => {
    const target = event.target;
    const card = target.closest('.card');

    if (!card) {
        return;
    }

    if (target.classList.contains('delete-btn')) {
        // Delete the selected card.
        card.remove();
        return;
    }

    if (target.classList.contains('edit-btn')) {
        // Toggle the edit form for the selected card.
        enterEditMode(card);
        return;
    }

    if (target.classList.contains('cancel-edit-btn')) {
        // Exit edit mode without saving changes.
        exitEditMode(card);
        return;
    }
});

// Handle saving edits using submit event from the card's edit form.
board.addEventListener('submit', (event) => {
    const editForm = event.target.closest('.card-edit');

    if (!editForm) {
        return;
    }

    event.preventDefault();

    const card = editForm.closest('.card');
    const titleInput = editForm.querySelector('input[name="edit-title"]');
    const categoryInput = editForm.querySelector('input[name="edit-category"]');

    const titleValue = titleInput.value.trim();
    const categoryValue = categoryInput.value.trim();

    if (!titleValue) {
        return;
    }

    updateCardDisplay(card, titleValue, categoryValue);
    exitEditMode(card);
});

// Build a new card element with display content and edit controls.
function buildCard(title, category) {
    cardCounter += 1;
    const cardId = `card-${Date.now()}-${cardCounter}`;

    const card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;
    card.draggable = true;

    card.innerHTML = `
        <div class="card-display">
            <div class="card-title"></div>
            <div class="card-category"></div>
        </div>
        <form class="card-edit hidden">
            <input type="text" name="edit-title" placeholder="Task title" required>
            <input type="text" name="edit-category" placeholder="Category (optional)">
            <div class="form-actions">
                <button type="submit">Save</button>
                <button type="button" class="cancel-edit-btn">Cancel</button>
            </div>
        </form>
        <div class="card-actions">
            <button type="button" class="edit-btn">Edit</button>
            <button type="button" class="delete-btn">Delete</button>
        </div>
    `;

    updateCardDisplay(card, title, category);
    attachCardDragHandlers(card);

    return card;
}

// Keep the card display in sync with the latest title/category values.
function updateCardDisplay(card, title, category) {
    const titleElement = card.querySelector('.card-title');
    const categoryElement = card.querySelector('.card-category');

    titleElement.textContent = title;

    if (category) {
        categoryElement.textContent = category;
        categoryElement.classList.remove('hidden');
    } else {
        categoryElement.textContent = '';
        categoryElement.classList.add('hidden');
    }
}

// Toggle the card into edit mode and prefill the inputs.
function enterEditMode(card) {
    const editForm = card.querySelector('.card-edit');
    const titleInput = editForm.querySelector('input[name="edit-title"]');
    const categoryInput = editForm.querySelector('input[name="edit-category"]');

    titleInput.value = card.querySelector('.card-title').textContent;
    categoryInput.value = card.querySelector('.card-category').textContent;

    card.classList.add('editing');
    editForm.classList.remove('hidden');
    titleInput.focus();
}

// Return the card to display mode.
function exitEditMode(card) {
    const editForm = card.querySelector('.card-edit');

    editForm.classList.add('hidden');
    editForm.reset();
    card.classList.remove('editing');
}

// Attach drag listeners to each card (including new ones).
function attachCardDragHandlers(card) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragEnd() {
    console.log('Drag Ended');
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragDrop(event) {
    const id = event.dataTransfer.getData('text/plain');
    const card = document.getElementById(id);
    const cardsContainer = this.querySelector('.cards');

    if (card && cardsContainer) {
        cardsContainer.appendChild(card);
    }

    this.classList.remove('over');
}