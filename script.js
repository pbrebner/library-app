//Script for Library App

let myLibrary = [];

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }

    addBookToLibrary() {
        //adds book to myLibrary
        if (
            myLibrary.some(
                (bookInLibrary) => bookInLibrary.title === this.title
            )
        ) {
            return;
        } else {
            myLibrary.push(this);
        }

        displayLibrary(myLibrary);
    }

    removeBookFromLibrary() {
        //Removes book from myLibrary
        myLibrary.forEach((bookInLibrary) => {
            if (bookInLibrary.title === this.title) {
                const index = myLibrary.indexOf(bookInLibrary);
                myLibrary.splice(index, 1);
            }
        });

        displayLibrary(myLibrary);
    }
}

function displayLibrary(myLibrary) {
    //displays the library of books and creates the necessary html elements and event listeners
    const libraryContainer = document.querySelector(".libraryContainer");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((bookInLibrary) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("bookContainer");

        const delContainer = document.createElement("div");
        delContainer.classList.add("delContainer");
        const delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");
        delBtn.innerHTML = "X";

        delBtn.addEventListener("click", () => {
            bookInLibrary.removeBookFromLibrary();
        });

        delContainer.appendChild(delBtn);
        bookContainer.appendChild(delContainer);

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("infoContainer");
        const title = document.createElement("h3");
        const author = document.createElement("p");
        const numPages = document.createElement("p");

        title.innerHTML = bookInLibrary.title;
        author.innerHTML = "By: " + bookInLibrary.author;
        numPages.innerHTML = "Number of Pages: " + bookInLibrary.numPages;

        infoContainer.appendChild(title);
        infoContainer.appendChild(author);
        infoContainer.appendChild(numPages);

        const read = document.createElement("button");

        if (bookInLibrary.read === true) {
            read.innerHTML = "Read";
            read.classList.add("read");
        } else {
            read.innerHTML = "Not Read";
            read.classList.remove("read");
        }

        read.addEventListener("click", () => {
            if (read.innerHTML === "Read") {
                read.innerHTML = "Not Read";
                read.classList.remove("read");
            } else {
                read.innerHTML = "Read";
                read.classList.add("read");
            }
        });

        infoContainer.appendChild(read);

        bookContainer.appendChild(infoContainer);
        libraryContainer.appendChild(bookContainer);
    });
}

function openForm() {
    setTimeout(() => {
        document.querySelector(".formContainer").classList.add("show");
        document.querySelector(".formBackdrop").classList.add("show");
    }, 100);
}

function closeForm() {
    document.querySelector(".formContainer").classList.remove("show");
    document.querySelector(".formBackdrop").classList.remove("show");
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

function validateForm() {
    const title = bookForm["title"];
    const author = bookForm["author"];
    const numPages = bookForm["numPages"];

    title.addEventListener("input", () => {
        if (title.validity.valueMissing) {
            title.setCustomValidity("Need to include a book title");
        } else if (title.validity.tooLong) {
            title.setCustomValidity("Needs to be shorter than 100 characters");
        } else {
            title.setCustomValidity("");
        }
    });
    author.addEventListener("input", () => {
        if (author.validity.valueMissing) {
            author.setCustomValidity("Need to include the books author");
        } else if (author.validity.tooLong) {
            author.setCustomValidity("Needs to be shorter than 50 characters");
        } else {
            author.setCustomValidity("");
        }
    });
    numPages.addEventListener("input", () => {
        if (numPages.validity.rangeOverflow) {
            numPages.setCustomValidity("Must be less that 5000 pages");
        } else {
            numPages.setCustomValidity("");
        }
    });
}

const addBookBtn = document.querySelector(".addBookBtn");

addBookBtn.addEventListener("click", () => {
    openForm();
});

const bookForm = document.querySelector(".bookForm");
const cancelBtn = document.querySelector(".cancelBtn");

validateForm();

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const book = processForm();
    book.addBookToLibrary();

    closeForm();
});

cancelBtn.addEventListener("click", () => {
    closeForm();
});

document.addEventListener("click", (event) => {
    const isClosest = event.target.closest(".formContainer");
    if (
        !isClosest &&
        document.querySelector(".formContainer").classList.contains("show")
    ) {
        closeForm();
    }
});
