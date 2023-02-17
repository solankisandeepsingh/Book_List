//Book Consturctor :
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Consturctor:
class UI {
    constructor() { }
    //Add Book To List :
    addBookToList(book) {
        // console.log(book)
        const list = document.getElementById('book-list');
        //Create tr (row) element:
        const row = document.createElement('tr');
        //Insert Cols:
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }
    //Clear Fields

    //Show Alert :
    showAlert(message, className) {
        //Create Div:
        const div = document.createElement('div');
        //Add Classes :
        div.className = `alert ${className}`;
        //Add Text :
        div.appendChild(document.createTextNode(message));
        //Get Parent :
        const container = document.querySelector('.container');
        //Get Form :
        const form = document.querySelector('#book-form');
        //Insert Alert :
        container.insertBefore(div, form);

        //Timeout after 3 sec :
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    //Delete Book :
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Local Storage Save :
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books')); 
        }
        return books;

    }
    static displayBook(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;

            //Add book to UI:
            ui.addBookToList(book);
        })

    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn){
        // console.log(isbn)
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
    }
}

//DOM Load Event :
document.getElementById('DOMcontentLoaded', Store.displayBook);


//Event Listenr For Add Book :
document.getElementById("book-form").addEventListener("submit", function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // console.log(title,author,isbn)
    const book = new Book(title, author, isbn)
    // console.log(book)

    //Instantiate UI
    const ui = new UI();

    //Validate :
    if (title === "" || author === "" || isbn === "") {
        ui.showAlert('please fill all the fields', 'error');
    } else {
        //Add book to list :
        ui.addBookToList(book);

        //Added to Local Storage :
        Store.addBook(book);

        //Show Success
        ui.showAlert('Bookk Added!', 'success');

        //Clear Fields:
        ui.clearFields();
    }
    e.preventDefault()
})

//Event Listener For Delete :
document.getElementById('book-list').addEventListener('click', function (e) {
    // console.log("Hello deleted")

    //Instantiate UI :
    const ui = new UI();

    //Delete Book :
    ui.deleteBook(e.target);

    //Remove From LocalStorgage :
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show Message:
    ui.showAlert("Book Removed!", 'success')
    e.preventDefault();
})