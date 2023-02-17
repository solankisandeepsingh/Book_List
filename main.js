//Book Consturctor :
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Consturctor:
function UI() { }
//Add Book To List :
UI.prototype.addBookToList = function (book) {
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
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Show Alert :
UI.prototype.showAlert = function(message,className){
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
    container.insertBefore(div,form);

    //Timeout after 3 sec :
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}

//Delete Book :
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}

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

        //Show Success
        ui.showAlert('Bookk Added!', 'success');

        //Clear Fields:
        ui.clearFields();
    }
    e.preventDefault()
})

//Event Listener For Delete :
document.getElementById('book-list').addEventListener('click', function(e){
    // console.log("Hello deleted")

    //Instantiate UI :
    const ui = new UI();

    //Delete Book :
    ui.deleteBook(e.target);

    //Show Message:
    ui.showAlert("Book Removed!", 'success')
    e.preventDefault();
})