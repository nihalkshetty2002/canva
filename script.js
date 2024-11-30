const canvas = document.getElementById('canvas');
const boldButton = document.getElementById('bold');
const italicButton = document.getElementById('italic');
const underlineButton = document.getElementById('underline');
const addTextButton = document.getElementById('add-text');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const fontSelect = document.getElementById('font-select');
const fontSizeSelect = document.getElementById('font-size');

let undoStack = [];
let redoStack = [];
let selectedElement = null;



function saveToUndoStack() {
    undoStack.push(canvas.innerHTML);
    redoStack = [];
}


addTextButton.addEventListener('click', () => {
    const newText = document.createElement('div');
    newText.textContent = 'nihal k shetty';
    newText.contentEditable = true;
    newText.classList.add('text-element');
    newText.style.top = '150px';
    newText.style.left = '150px';

    canvas.appendChild(newText);

     
     newText.addEventListener('focus', () => {
        selectedElement = newText;
    });

   
    attachEvents(newText);
    saveToUndoStack();
});





let offsetX, offsetY;

function dragStart(e) {
    e.preventDefault();
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    const move = (event) => {
        selectedElement.style.left = `${event.pageX - offsetX}px`;
        selectedElement.style.top = `${event.pageY - offsetY}px`;
    };

    const stop = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop);
        saveToUndoStack();
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
}

boldButton.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.fontWeight =
            selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
    }
});

italicButton.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.fontStyle =
            selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic';
    }
});

underlineButton.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.textDecoration =
            selectedElement.style.textDecoration === 'underline'
                ? 'none'
                : 'underline';
    }
});
 
fontSelect.addEventListener('change', () => {
    if (selectedElement) {
        selectedElement.style.fontFamily = fontSelect.value;
        saveToUndoStack();
    }
});

fontSizeSelect.addEventListener('change', () => {
    if (selectedElement) {
        selectedElement.style.fontSize = fontSizeSelect.value;
        saveToUndoStack();
    }
});


undoButton.addEventListener('click', () => {
    if (undoStack.length > 0) {
        redoStack.push(canvas.innerHTML);
        canvas.innerHTML = undoStack.pop();
        reattachEvents();
    }
});

redoButton.addEventListener('click', () => {
    if (redoStack.length > 0) {
        undoStack.push(canvas.innerHTML);
        canvas.innerHTML = redoStack.pop();
        reattachEvents();
    }
});


function reattachEvents() {
    const textElements = canvas.querySelectorAll('.text-element');
    textElements.forEach((el) => attachEvents(el));
}
