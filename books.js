// Array that store books.
const books = [];

// Function constructor for Book objects.
function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

// Function that uses the function constructor to create a new book object and push it to the books array.
function storeBook(title, author, numPages, isRead){
    books.push(new Book(title, author, numPages, isRead));
}

// Insert the books into the table.
function appendBook(output){ 
    const bookTable = document.getElementById('bookTable');
    bookTable.insertAdjacentHTML('afterbegin', output);
}

// Function that prints all books in the books array.
function renderBooks(books){
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
    }   
}

// Function that receives the current object index and changes the status of a book to read or not read.
function statusChange(currentBook){
    if(books[currentBook].isRead || books[currentBook].isRead === 'true') {
        books[currentBook].isRead = false;
        return;
    }
    if(!books[currentBook].isRead || books[currentBook].isRead === 'false') {     
        books[currentBook].isRead = true;
        return;
    }
}

//Function that delete a book from the books array.
function deleteBook(currentBook){
    books.splice(currentBook, 1);
}

// Function that clears the table.
function clearTable(){
    const bookTable = document.getElementById('bookTable');
    bookTable.innerHTML = "";
}

//Function that resets the form values.
function resetForm(){
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookPages').value = '';
    document.getElementById('bookRead').value = true;
}

// Function that extract the object index from the button id.
function getObjectIndex(books){
    return Number(event.target.id.substring(9));
}

//Function that inserts some books as examples.
function insertDefaultBooks(){
    new storeBook('The Hobbit', 'J.R.R. Tolkien', 295, true); 
    new storeBook('Clean Code', 'R.C. Martin', 457, true);
    new storeBook('The Da Vinci Code', 'Dan Brown', 554, false);
}

// Function that adds event listeners to the buttons.
function buttonsEventHandler(){
    statusChangeEventHandler();
    bookRemovalEventHandler();
    bookAdditionEventHandler();
}

// Read/Not read button event handler.
function statusChangeEventHandler(){
    const bookStatusBtn = document.querySelectorAll('.bookstatus');
    for(i = 0; i < bookStatusBtn.length; i++){
        bookStatusBtn[i].addEventListener('mouseup', e => {
            statusChange(getObjectIndex(books));
            clearTable();
            renderBooks(books);
            buttonsEventHandler();
        }
    )};
}

// Delete button event handler.
function bookRemovalEventHandler(){
    const bookDeleteBtn = document.querySelectorAll('.delete');
    for(i = 0; i < bookDeleteBtn.length; i++){
        bookDeleteBtn[i].addEventListener('mouseup', e => {
            deleteBook(getObjectIndex(books));
            clearTable();
            renderBooks(books);
            buttonsEventHandler();
        }
    )};
}

// Add Book button event handler.
function bookAdditionEventHandler(){
    const bookAddBtn = document.getElementById('addBook');
    bookAddBtn.addEventListener('mouseup', e => {
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookPages = Number(document.getElementById('bookPages').value);
        let bookRead = document.getElementById('bookRead').value;
        
        if(bookTitle === '' || bookTitle === undefined || 
           bookAuthor === '' || bookAuthor === undefined|| 
           bookPages === '' || bookPages === undefined || bookPages === 0 || 
           bookRead === '' || bookRead === undefined){
              resetForm();
              return;
        }else{
            storeBook(bookTitle, bookAuthor, bookPages, bookRead);
            clearTable();           
            renderBooks(books);
            resetForm();
            buttonsEventHandler();   
        }
    }
)}

// Function that initializes the program.
function init(){
    insertDefaultBooks();
    renderBooks(books);
    buttonsEventHandler();
}init();