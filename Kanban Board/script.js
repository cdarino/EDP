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

        saveBoardToLocalStorage(); // <--- Persist after adding
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
        saveBoardToLocalStorage(); // <--- Persist after delete
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

    saveBoardToLocalStorage(); // <--- Persist after edit
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
    saveBoardToLocalStorage(); // <--- Persist after drag
}

// Drag and drop handlers
function dragOver(event) { event.preventDefault(); }
function dragEnter(event) { event.preventDefault(); this.classList.add('over'); }
function dragLeave() { this.classList.remove('over'); }
function dragDrop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    if (card) {
        this.querySelector('.cards').appendChild(card);
        this.classList.remove('over');
        saveBoardToLocalStorage(); // <--- Persist after drop
    }
}

// ===== LOCAL STORAGE =====
function saveBoardToLocalStorage() {
    const boardData = [];
    lists.forEach(list => {
        list.querySelectorAll('.card').forEach(card => {
            boardData.push({
                id: card.id,
                listId: list.id,
                title: card.querySelector('.card-title').textContent,
                category: card.querySelector('.card-category').textContent || ''
            });
        });
    });
    localStorage.setItem('kanbanBoard', JSON.stringify(boardData));
}

function loadBoardFromLocalStorage() {
    const savedData = localStorage.getItem('kanbanBoard');
    if (!savedData) return;

    const boardData = JSON.parse(savedData);
    boardData.forEach(item => {
        const list = document.getElementById(item.listId);
        if (!list) return;

        const card = buildCard(item.title, item.category);
        card.id = item.id;
        list.querySelector('.cards').appendChild(card);
    });
}

// Load board on page load
loadBoardFromLocalStorage();

// ===== SEARCH / FILTER =====
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    lists.forEach(list => {
        list.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const category = card.querySelector('.card-category').textContent.toLowerCase();
            if (title.includes(query) || category.includes(query)) {
                card.style.display = ''; // show card
            } else {
                card.style.display = 'none'; // hide card
            }
        });
    });
});

// Close any open task form when clicking outside
document.addEventListener('click', (event) => {
    for (const list of lists) {
        const form = list.querySelector('.task-form');
        const addBtn = list.querySelector('.add-task-btn');

        if (form.classList.contains('is-open')) {
            // Check if the click is outside the form and the add button
            if (!form.contains(event.target) && event.target !== addBtn) {
                closeTaskForm(form);
                form.reset();
            }
        }
    }
});

