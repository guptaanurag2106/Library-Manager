const express = require('express')
const path = require('path');
const books = require('./books.js');
const bodyParser = require('body-parser');
const users = require('./users.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const port = 5000;

app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { books, users });

})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', (req, res) => {
    var user1 = users.find(user => user.username == req.body.username);
    if (user1 === null) {
        res.redirect('/login');
    }
    else if (user1.password !== req.body.password) {
        res.redirect('/login');
    }
    else {
        res.redirect('/user');
        users.find(user => user === user1).loggedIn = true;
    }
})

app.get('/user', (req, res) => {
    res.render('userHome.ejs', { user: users.find(user => user.loggedIn), books });
})

app.get('/get-book', (req, res) => {
    res.render('get-book.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
