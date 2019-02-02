class Book{
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //create tr element
        let row = document.createElement('tr');
        // insert items in a row
        row.innerHTML = `<td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td> <a href ="#" class="delete">X</a></td>`
        //append row to the list
        list.appendChild(row);
    }

    showMessage(message,className){
        //get parent element
        const container = document.querySelector('.container');
        //get form element
        const form = document.querySelector('#book-form');
        //create div tag for error message to display
        const div = document.createElement('div');
        //add class name
        div.className = `alert ${className}`;
        //create text code and append text msg
        div.appendChild(document.createTextNode(message));
        //append to container
        container.insertBefore(div,form);    
        //set timeout
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    
    clearFields(){
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
}
//Store books in LS
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books)); // here first parameter is name, and second is book list

    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        });

    }
    //remove book by isbn value
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
//DOM Reload event
document.addEventListener('DOMContentLoaded',Store.displayBooks);
//Event listerner
document.getElementById('book-form').addEventListener('submit',
function(e){
    //UI variables
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //Instantiate book object
    const book = new Book(title,author,isbn);
    //ui object
    const ui = new UI();
    //validate empty fields
    if(title === '' || author === '' || isbn === ''){
        ui.showMessage('Please fill the fields', 'error');
    } else {
        //funtion protype of UI object
        ui.addBookToList(book);
        //Store book details to LocalStorage
        Store.addBook(book);
        //Show Message
        ui.showMessage('Book Added!','success');
        //Clear fields
        ui.clearFields();
    }   
    e.preventDefault();
})
// delete event listener
document.querySelector('#book-list').addEventListener('click',
function(e){
    //ui object
    const ui = new UI();
    //delete book - here since any id or class to fetch we are using sibbling concept
    ui.deleteBook(e.target);
    //Delete from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show message
    ui.showMessage('Book removed','success');
    e.preventDefault();

})

