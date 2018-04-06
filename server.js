const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    
    fs.writeFile('server.log', log+'\n', (err) => {
        if(err)
        console.log(err);
    });
    console.log(log);
    next();
});

app.use(express.static(__dirname + "/public"));

app.get('/',(req, res) => {
    //res.send('<h1>Hello Express!<h1>');
    res.render('home.hbs',{
        pageTitle: "Home page",
        welcomeMessage: "Welcome to my page"
    });
});
app.get('/projects', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: "About Page"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});