//book constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI(){}

//Add book to list
UI.prototype.addBookToList = function(book){
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
//delete book 
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}

//error message when fileds are empty
UI.prototype.showMessage = function(message,className){
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
    //delete book
    ui.deleteBook(e.target);
    //show message
    ui.showMessage('Book removed','success');
    e.preventDefault();

})