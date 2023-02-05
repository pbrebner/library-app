//Script for Library App

let myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function addBookToLibrary(book) {
    //Adds book to myLibrary
    if (myLibrary.some((bookInLibrary) => bookInLibrary.title === book.title)) {
        return;
    } else {
        myLibrary.push(book);
    }

    displayLibrary(myLibrary);
}

function removeBookFromLibrary(book) {
    //Removes book from myLibrary
    myLibrary.forEach((bookInLibrary) => {
        if (bookInLibrary.title === book) {
            const index = myLibrary.indexOf(bookInLibrary);
            myLibrary.splice(index, 1);
        }
    });

    displayLibrary(myLibrary);
}

function displayLibrary(myLibrary) {
    //displays the library of books and creates the necessary html elements and event listeners
    const libraryContainer = document.querySelector(".libraryContainer");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((bookInLibrary) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("bookContainer");

        const delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");
        delBtn.innerHTML = "Delete";

        delBtn.addEventListener("click", () => {
            removeBookFromLibrary(bookInLibrary.title);
        });

        bookContainer.appendChild(delBtn);

        const title = document.createElement("p");
        const author = document.createElement("p");
        const numPages = document.createElement("p");

        title.innerHTML = bookInLibrary.title;
        author.innerHTML = bookInLibrary.author;
        numPages.innerHTML = bookInLibrary.numPages;

        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(numPages);

        const read = document.createElement("button");
        read.classList.add("read");

        if (bookInLibrary.read === "true") {
            read.innerHTML = "Read";
        } else {
            read.innerHTML = "Not Read";
        }

        read.addEventListener("click", () => {
            read.innerHTML === "Read"
                ? (read.innerHTML = "Not Read")
                : (read.innerHTML = "Read");
        });

        bookContainer.appendChild(read);

        libraryContainer.appendChild(bookContainer);
    });
}

function openForm() {
    document.querySelector(".formContainer").style.display = "block";
}

function closeForm() {
    document.querySelector(".formContainer").style.display = "none";
}

function processForm() {
    //Takes form data, constructs an object and clears form
    const title = bookForm["title"];
    const author = bookForm["author"];
    const numPages = bookForm["numPages"];
    const read = bookForm["read"];

    const book = new Book(
        title.value,
        author.value,
        numPages.value,
        read.checked
    );

    bookForm["title"].value = "";
    bookForm["author"].value = "";
    bookForm["numPages"].value = "";
    bookForm["read"].checked = false;

    return book;
}

const addBookBtn = document.querySelector(".addBookBtn");

addBookBtn.addEventListener("click", () => {
    openForm();
});

const bookForm = document.querySelector(".bookForm");
const cancelBtn = document.querySelector(".cancelBtn");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const book = processForm();
    addBookToLibrary(book);

    closeForm();
});

cancelBtn.addEventListener("click", () => {
    closeForm();
});
