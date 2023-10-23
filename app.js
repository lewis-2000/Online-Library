const express = require('express');

const app= express();

const port = 3000;

app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'))
app.use('css', express.static(__dirname + 'public/css'));
app.use('js', express.static(__dirname + 'public/js'));
app.use('assets', express.static(__dirname + 'public/assets'));

// JSON request body parser
app.use(express.json());
// URL-encoded request body parser
app.use(express.urlencoded({ extended: true })); 


//routes
app.use('/', require('./routes/home'));
app.use('/account', require('./routes/account'));
app.use('/materials', require('./routes/materials'));




app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
