const cards = document.querySelectorAll('.card'); // {.card, .card}
const lists = document.querySelectorAll('.list'); // {.list, .list}

for (const card of cards) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

for (const list of lists) {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('dragenter', dragEnter);
    list.addEventListener('dragleave', dragLeave);
    list.addEventListener('drop', dragDrop);
}

function dragStart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnd(){
    console.log('Drag Ended');
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
    
    this.classList.add('over');
}

function dragLeave(e){
    this.classList.remove('over');
}

function dragDrop(e){
    const id = e.dataTransfer.getData('text/plain');

    const card =  document.getElementById(id);

    this.appendChild(card);
}