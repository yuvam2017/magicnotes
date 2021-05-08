showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesOBj = [];
    }
    else {
        notesOBj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    notesOBj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesOBj));
    //console.log(notesOBj);
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesOBj = [];
    }
    else {
        notesOBj = JSON.parse(notes);
    }
    let html = "";
    notesOBj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width :18 rem;"> 
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick=deleteNote(this.id) class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesOBj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Please add some notes first`;
    }
}

function deleteNote(index) {
    //console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesOBj = [];
    }
    else {
        notesOBj = JSON.parse(notes);
    }
    notesOBj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesOBj));
    showNotes();

}

// function searchNotes(){
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // //console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
})
// }