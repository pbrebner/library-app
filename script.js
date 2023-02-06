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

        const delContainer = document.createElement("div");
        delContainer.classList.add("delContainer");
        const delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");
        delBtn.innerHTML = "X";

        delBtn.addEventListener("click", () => {
            removeBookFromLibrary(bookInLibrary.title);
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

document.addEventListener("click", (event) => {
    const isClosest = event.target.closest(".formContainer");
    if (
        !isClosest &&
        document.querySelector(".formContainer").classList.contains("show")
    ) {
        closeForm();
    }
});
