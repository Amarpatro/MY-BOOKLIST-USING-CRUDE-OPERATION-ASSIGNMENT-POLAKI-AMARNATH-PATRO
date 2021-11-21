const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title, 
        author, 
        publisher
  
    } = book;

    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
  
  

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);    //sendin request to delete method
    xhttp.send();

    location.reload();
}

const searchBook = () => {
    let getName = document.getElementById('bookName').value.trim();
    document.getElementById('books').innerHTML = '';
    console.log(getName);

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        if(getName === ''){
            const template = `
            <br>

            <div class="col-4"> 
                <div class="card">
                    <div class="card-body"> 
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        

                        <hr>

                        <button type="button" class="btn btn-primary" data-toggle="modal" 
                        data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">Delete</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML += template;

        } else if(getName === book.title || getName === book.isbn || getName === book.author || getName === book.publisher) {
            const template = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                      

                        <hr>

                        <button type="button" class="btn btn-danger" data-toggle="modal" 
                        data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML += template;
        }
    }
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/book", false);  //sending rew to get method
    xhttp.send();

    const books = JSON.parse(xhttp.responseText); //reading the data

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                     
                        <hr>

                        <button type="button" class="btn btn-danger" onClick = "deleteBook(${book.isbn})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();
(function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else 
      localStorage.removeItem('firstLoad');
  }
})();