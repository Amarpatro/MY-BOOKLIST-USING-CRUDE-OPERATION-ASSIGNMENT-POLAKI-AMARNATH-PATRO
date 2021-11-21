const express = require('express')

const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const app = express()
const port = 3000


let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publisher": "No Starch Press",
   
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "publisher": "O'Reilly Media",
    
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    "publisher": "O'Reilly Media",
  
}];

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let saveBook = JSON.stringify(books);
fs.writeFile('bookdata.json', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});


app.post('/book', (req, res) => {
    const book = req.body;

    let getBook = books.find(books => {
        if(books.isbn === book.isbn || books.title === book.title){
            return true;
        } else {
            return false;
        }
    });
if(getBook){
    res.send('Book already exist')
}else{
    books.push(book);
    res.send('Book is added to database');
}
   
    let saveBook = JSON.stringify(books);
    fs.writeFile('bookdata.json', saveBook , function (err) {
        if (err) throw err;
        console.log('Stored Books!');
    });

   
});


app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array
    books = books.filter(i => {   // used filter for filter out the book using isbn
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });
    let saveBook = JSON.stringify(books);
    fs.writeFile('bookdata.json', saveBook , function (err) {
        if (err) throw err;
        console.log('Stored Books!');
    });
    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    // sending 404 when not found something is a good practice

    let saveBook = JSON.stringify(books);
fs.writeFile('bookdata.json', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});

    res.send('Book is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));