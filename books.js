// Array that store books.
let books = [];

// Constructor for Book objects.
function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
};

// Calls the constructor to create a new book object and push it to the books array.
function storeBook(title, author, numPages, isRead) {
    books.push(new Book(title, author, numPages, isRead));
};

// Insert the books into the table.
const appendBook = (output) => 
    document.getElementById('bookTable').insertAdjacentHTML('afterbegin', output);

// Prints all books in the books array.
const renderBooks = (books) => {
    for(i = 0; i < books.length; i++){
        let output;
        output = "";       
        output += `<td>${books[i].title}</td>`;
        output += `<td>${books[i].author}</td>`;
        output += `<td>${books[i].numPages}</td>`;
        if(books[i].isRead === true || books[i].isRead === 'true'){
            output += `<td><button class="button bookstatus read" id="statusBtn${i}">
                Read</button></td> `;
        }
        if(books[i].isRead === false || books[i].isRead === 'false'){
            output += `<td><button class="button bookstatus notread" id="statusBtn${i}">
                Not read</button></td> `;
        }
        output += `<td><button class="button-primary delete" id="deleteBtn${i}">
            Delete</button></td>`;
        output = `<tr>${output}</tr>`;
        appendBook(output);
    };   
};

// Receives the current object index and changes the read status.
const statusChange = (currentBook) => {
    if(books[currentBook].isRead || books[currentBook].isRead === 'true') {
        books[currentBook].isRead = false;
        return;
    }
    if(!books[currentBook].isRead || books[currentBook].isRead === 'false') {     
        books[currentBook].isRead = true;
        return;
    }
};

// Delete a book from the books array.
const deleteBook = (currentBook) => books.splice(currentBook, 1);

// Clears the table.
const clearTable = () => document.getElementById('bookTable').innerHTML = "";

// Default value for the books array.
const defaultBooks = () => 
    [
        {title: 'The Hobbit', author: 'J.R.R. Tolkien', numPages: 295, isRead: true},
        {title: 'Clean Code', author: 'R.C. Martin', numPages: 457, isRead: true},
        {title: 'The Da Vinci Code', author: 'Dan Brown', numPages: 554, isRead: false}
    ];


// Resets the form values.
const resetForm = () => {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookPages').value = '';
    document.getElementById('bookRead').value = true;
};

// Extract the object index from the button id.
const getObjectIndex = (books) => +event.target.id.substring(9);

// Inserts some books as examples.
const insertDefaultBooks = () => defaultBooks().forEach(book => 
    storeBook(book.title, book.author, book.numPages, book.isRead));


/* >>>>>>>>>>>>>>  LOCAL STORAGE <<<<<<<<<<<<<<*/
    // Saves the books array in the local storage.
    const saveLocalStorage = () => localStorage.setItem('books', JSON.stringify(books));

    // Loads the books array from the local storage. 
    const getLocalStorage = () => localStorage.getItem('books') !== null ? 
        books = JSON.parse(localStorage.getItem('books')) : insertDefaultBooks();

    // Updates the books array.
    const updateBooks = () => {
        getLocalStorage();
        clearTable();
        renderBooks(books);
        buttonsEventHandler();
    };

    // Updates the books array and the local storage.
    const updateLocalStorage = () => {
        saveLocalStorage();
        updateBooks();
    };
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */


// Adds event listeners to the buttons.
const buttonsEventHandler = () => {
    statusChangeEventHandler();
    bookRemovalEventHandler();
    bookAdditionEventHandler();
};

// Read/Not read button event handler.
const statusChangeEventHandler = () => {
    document.querySelectorAll('.bookstatus').forEach(item => {
        item.addEventListener('mouseup', e => {
            statusChange(getObjectIndex(books));
            updateLocalStorage();
            clearTable();
            renderBooks(books);
            buttonsEventHandler();
        }
    )});
};

// Delete button event handler.
const bookRemovalEventHandler = () => {
    document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('mouseup', e => {
            deleteBook(getObjectIndex(books));
            updateLocalStorage();
            clearTable();
            renderBooks(books);
            buttonsEventHandler();
        }
    )});
};

// Add Book button event handler.
const bookAdditionEventHandler = () => {
    document.getElementById('addBook').addEventListener('mouseup', e => {
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookPages = +document.getElementById('bookPages').value;
        let bookRead = document.getElementById('bookRead').value;
        
        if(bookTitle === '' || bookTitle === undefined || 
           bookAuthor === '' || bookAuthor === undefined|| 
           bookPages === '' || bookPages === undefined || bookPages === 0 || 
           bookRead === '' || bookRead === undefined){
              resetForm();
              return;
        }else{
            storeBook(bookTitle, bookAuthor, bookPages, bookRead);
            updateLocalStorage();
            clearTable();        
            renderBooks(books);
            resetForm();
            buttonsEventHandler();   
        }
    }
)};

// Function that initializes the program.
const init = () => {
    getLocalStorage();
    renderBooks(books);
    buttonsEventHandler();
};
init();