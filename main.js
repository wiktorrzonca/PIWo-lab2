const addToDoButton = document.getElementById("addToDo");
const toDoContainer = document.querySelector(".toDoContainer");
const inputField = document.getElementById("inputField");
const undoButton = document.getElementById("undo");
let lastRemoved = null;
let today = new Date();
let modal = $('#modal');

addToDoButton.addEventListener('click', function(){
    if (inputField.value.trim() !== '') {
        const paragraph = document.createElement('p');
        const deleteButton = document.createElement('button');

        deleteButton.innerHTML = "X";
        deleteButton.setAttribute("id", "deleteButton");

        const spanText = document.createElement('span');
        spanText.innerText = inputField.value;
        const spanDate = document.createElement('span');
        spanDate.innerText = today.toLocaleDateString()  + " " + today.getHours() + ":" + today.getMinutes();
        paragraph.appendChild(deleteButton);
        paragraph.appendChild(spanText);
        toDoContainer.appendChild(paragraph);
        inputField.value="";

        deleteButton.addEventListener('click', function() {
            modal.css({display: 'flex'});
        
            const modalHeight = modal.outerHeight();
            const modalWidth = modal.outerWidth();
        
            modal.css({
                top: '50%',
                left: '50%',
                marginTop: -modalHeight / 2,
                marginLeft: -modalWidth / 2
            });
        
            $('#deleteConfirm').click(function(){
                deleteParagraph(paragraph);
                modal.css({display: 'none'});
            });
            $('#deleteCancel').click(function(){
                modal.css({display: 'none'});
            });
        });
        

        paragraph.addEventListener('click',function(event){
            if (event.target === deleteButton) {
                lastRemoved = paragraph;
            } else if (event.target === spanText) {
                if(spanText.style.color==="black"){
                    spanText.style.textDecoration = "line-through";
                    spanText.style.color = "grey";
                    spanText.parentNode.appendChild(spanDate);
                } else {
                    spanText.style.color = "black";
                    spanText.style.textDecoration = "none";
                    const dateElement = spanText.nextElementSibling;
                    if (dateElement !== null && dateElement.tagName.toLowerCase() === 'span') {
                        dateElement.parentNode.removeChild(dateElement);
                    }
                }
            }
        });
    }
});

function deleteParagraph(paragraph) {
    lastRemoved = paragraph;
    paragraph.remove();
}

undoButton.addEventListener('click', function() {
    if (lastRemoved !== null) {
        toDoContainer.appendChild(lastRemoved);
        lastRemoved = null;
    }
});