const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

const app = express();
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(morgan('common', {stream: accessLogStream}));

let topMovies =[
    {title: 'Transformers', genre: 'Action/Adventure'},
    {title: 'Cars', genre: 'Action/Adventure'},
    {title: 'Greenbook', genre: 'Drama'},
    {title: 'Alien: Romulus', genre: 'Action/Adventure'},
    {title: 'Straight Outta Compton', genre: 'Drama'},
    {title: 'Ready Player One', genre: 'Action/Adventure'},
    {title: 'Dreamgirls', genre: 'Musical'},
    {title: 'Godzilla', genre: 'Action/Adventure'},
    {title: 'The Greatest Showman', genre: 'Musical'},
    {title: 'Dune', genre: 'Action/Adventure'}
];

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/', (req, res) => {
    res.send('Thank You For Visiting My Movie App');
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something is not working!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.')
});