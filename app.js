const express = require('express');
const path = require('path');

const app= express();

const port = 3000;

app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'))
app.use('css', express.static(__dirname + 'public/css'));
app.use('js', express.static(__dirname + 'public/js'));
app.use('assets', express.static(__dirname + 'public/assets'));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// JSON request body parser
app.use(express.json());
// URL-encoded request body parser
app.use(express.urlencoded({ extended: true })); 


//routes
app.use('/', require('./routes/home'));
app.use('/account', require('./routes/account'));
app.use('/materials', require('./routes/materials'));
app.use('/search', require('./routes/search'));
app.use('/addBook', require('./routes/addBook'));



app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
