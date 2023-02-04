//Script for Library App

let myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function () {
        return title + " by " + author + ", " + numPages + ", " + read;
    };
}

function addBookToLibrary(bookInfo) {
    //adds book to myLibrary
}

function displayLibrary(myLibrary) {
    //displays the library of books
}

const theHobbit = new Book(
    "The Hobbit",
    "J.R.R. Tolkein",
    "295 pages",
    "not read yet"
);

console.log(theHobbit.info());

//Handle the book form data

const bookForm = document.querySelector(".bookForm");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = bookForm["title"];
    const author = bookForm["author"];
    const numPages = bookForm["numPages"];
    const read = bookForm["read"];
    console.log(title.value);
    console.log(author.value);
    console.log(numPages.value);
    console.log(read.checked);
});
