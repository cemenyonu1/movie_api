const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
mongoose = require('mongoose'),
Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/movie_api', {useNewUrlParser: true, useUnifideTopology: true});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

const app = express();
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(morgan('common', {stream: accessLogStream}));
app.use(bodyParser.json());

let user = [
    {
        id: 1,
        name: "John Doe",
        email: "hi@none.com",
        favoriteMovies: []
    }
];

let movies =[
    {title: 'Transformers',
        genre: {
            name: 'action',
            description: 'a type of fiction or media that focuses on exciting action sequences and events.'
        },
        description: 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.',
        director: {
            name: 'Michael Bay',
            bio: 'A graduate of Wesleyan University, Michael Bay spent his 20s working on advertisements and music videos.',
            birth_year: 1965,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BZjM3ZDA2YmItMzhiMi00ZGI3LTg3ZGQtOTk3Nzk0MDY0ZDZhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    },
    {title: 'Cars',
        genre: {
            name: 'action',
            description: 'a type of fiction or media that focuses on exciting action sequences and events.'
        },
        description: 'On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town and learns that winning isn\'t everything in life.',
        director: {
            name: 'John Lasseter',
            bio: 'Although born in Hollywood, John and his twin sister Johanna were raised in Whittier near Los Angeles.',
            birth_year: 1957,
            death_year: 'Still Active'
        },
        image:'https://m.media-amazon.com/images/M/MV5BMzY1MjI1NjkwMl5BMl5BanBnXkFtZTcwMzQ0MTQyMw@@._V1_.jpg'
    },
    {title: 'Green Book',
        genre: {
            name: 'drama',
            description: 'a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action.'
        },
        description: 'A working-class Italian-American bouncer becomes the driver for an African-American classical pianist on a tour of venues through the 1960s American South.',
        director: {
            name: 'Peter Farrelly',
            bio: 'Peter John Farrelly is an American film director, screenwriter, producer and novelist.',
            birth_year: 1956,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BNDU5YTNmMmItN2QxNy00OGQ0LTg5MTctNzFmYjEzZjcwN2UwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    },
    {title: 'Alien: Romulus',
        genre: {
            name: 'horror',
            description: 'a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences.'
        },
        description: 'While scavenging the deep ends of a derelict space station, a group of young space colonists come face to face with the most terrifying life form in the universe.',
        director: {
            name: 'Fede Alverez',
            bio: 'Federico Javier Álvarez Mattos is a Uruguayan filmmaker. He is best known for directing the films Evil Dead, Don\'t Breathe, and Alien: Romulus.',
            birth_year: 1978,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BMDU0NjcwOGQtNjNjOS00NzQ3LWIwM2YtYWVmODZjMzQzN2ExXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg'
    },
    {title: 'Straight Outta Compton',
        genre: {
            name: 'drama',
            description: 'a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action.'
        },
        description: 'The rap group NWA emerges from the mean streets of Compton in the mid-1980s and revolutionizes hip-hop culture with their music and tales about life in the hood.',
        director: {
            name: 'F. Gary Gray',
            bio: 'Felix Gary Gray is an African-American music video director, film producer and film director from New York City known for directing films such as Friday, Men in Black: International & Be Cool.',
            birth_year: 1969,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BMTA5MzkyMzIxNjJeQTJeQWpwZ15BbWU4MDU0MDk0OTUx._V1_.jpg'
    },
    {title: 'Ready Player One',
        genre: {
            name: 'action',
            description: 'a type of fiction or media that focuses on exciting action sequences and events.'
        },
        description: 'When the creator of a virtual reality called the OASIS dies, he makes a posthumous challenge to all OASIS users to find his Easter Egg, which will give the finder his fortune and control of his world.',
        director: {
            name: 'Steven Spielberg',
            bio: 'One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood\'s best known director and one of the wealthiest filmmakers in the world.',
            birth_year: 1946,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BNzVkMTgzODQtMWIwZC00NzE4LTgzZjYtMzAwM2I5OGZhNjE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    },
    {title: 'Dreamgirls',
        genre: {
            name: 'drama',
            description: 'a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action.'
        },
        description: 'A trio of black female soul singers cross over to the pop charts in the early 1960s, facing their own personal struggles along the way.',
        director: {
            name: 'Bill Condon',
            bio: 'Bill Condon was born on 22 October 1955 in New York City, New York, USA. He is a director and writer, known for Dreamgirls (2006).',
            birth_year: 1955,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BMTY1MzIwNDQyNl5BMl5BanBnXkFtZTcwNDEwNzYyMw@@._V1_FMjpg_UX1000_.jpg'
    },
    {title: 'Godzilla',
        genre: {
            name: 'action',
            description: 'a type of fiction or media that focuses on exciting action sequences and events.'
        },
        description: 'The world is beset by the appearance of monstrous creatures, but one of them may be the only one who can save humanity.',
        director: {
            name: 'Gareth Edwards',
            bio: 'Growing up, he admired movies such as the 1977 classic "Star Wars", and went on to pursue a film career.',
            birth_year: 1975,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BODE2NTdmMmYtY2U1OS00MjExLWIwNjQtYjQ5NTA0ZDZmZjZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    },
    {title: 'The Greatest Showman',
        genre: {
            name: 'drama',
            description: 'a form of performance that involves conflicts, emotions, and the portrayal of human experiences through dialogue and action.'
        },
        description: 'Celebrates the birth of show business and tells of a visionary who rose from nothing to create a spectacle that became a worldwide sensation.',
        director: {
            name: 'Michael Gracey',
            bio: 'With an exceptional background in VFX and a fluency in music production, Gracey has consistently brought a fresh - often viral - approach to his projects that seizes the audience\'s imagination.',
            birth_year: 1968,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BMjI1NDYzNzY2Ml5BMl5BanBnXkFtZTgwODQwODczNTM@._V1_FMjpg_UX1000_.jpg'
    },
    {title: 'Dune',
        genre: {
            name: 'action',
            description: 'a type of fiction or media that focuses on exciting action sequences and events.'
        },
        description: 'Paul Atreides arrives on Arrakis after his father accepts the stewardship of the dangerous planet. However, chaos ensues after a betrayal as forces clash to control melange, a precious resource.',
        director: {
            name: 'Dennis Villeneuve',
            bio: 'Denis Villeneuve is a French Canadian film director and writer.',
            birth_year: 1967,
            death_year: 'Still Active'
        },
        image: 'https://m.media-amazon.com/images/M/MV5BNWIyNmU5MGYtZDZmNi00ZjAwLWJlYjgtZTc0ZGIxMDE4ZGYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    }
];

app.use(express.static('public'));

//Create new users
//app.post('/users', (req, res) => {
  //  const newUser = req.body;

    //if(newUser.name && newUser.email) {
      //  newUser.id = uuid.v4();
        //newUser.favoriteMovies = [];
        //users.push(newUser);
        //res.status(201).json(newUser);
   // } else {
     //   res.status(404).send('Name or email is missing from user. Please add a name or email.');
   // }
//});

app.post('/users', async (req, res) => {
    await Users.findOne({Username : req.body.Username})
    .then((user) => {
        if(user) {
            return res.status(200).send(req.body.Username + ' already exists')
        } else {
            Users.create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) => {
                res.status(201).json(user)
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send('Error: ' + error)
            })
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send('Error: ' + error)
    });
});

//Delete a user from the database
//app.delete('/users/:email', (req, res) =>{
//    const id = req.params.email;
//    let user = users.find(user => user.email == id);

//    if(user){
//        users = users.filter(user => user.email != id);
//        res.status(201).send(`${user.email} has been removed from our database!`);
//    } else {
//        res.status(400).send('The user is not in our database.');
//    }
//});

//Delete a user from the database
app.delete('/users/:email', async (req, res) => {
    await Users.findOneAndRemove({Email: req.params.email})
    .then((user) => {
        if(!user) {
            res.status(500).send(req.params.email + ' is not in the database')
        } else {
            res.status(200).send(req.params.email + ' has been successfully removed.')
        }
    })
    .catch((err) => {
        console.error('Error: ' + err)
    })
});

//Add a new movie to their favorite movies
//app.post('/users/:id/:movie', (req, res) =>{
//    const id = req.params.id;
//    const movie = req.params.movie;
//    let user = users.find(user => user.id == id);

//    if(user){
//        user.favoriteMovies.push(movie);
//        res.status(201).send(`${movie} has been added to ${user.name}'s favorite movie list!`);
//    } else {
//        res.status(400).send('The user is not in our database.');
//    }
//});

//Add a new movie to their favorite movies

app.post('/users/:id/:movie', async (req, res) => {
    await Users.findOne({id: req.params.id})
    .then((user) => {
        {$push : {FavoriteMovies: req.params.movie}}
    })
    .catch((err) => {
        console.error('Error: ' + err)
    })
})

//Remove a movie from their favorite movies
//app.delete('/users/:id/:movie', (req, res) =>{
  //  const id = req.params.id;
    //const movie = req.params.movie;
    //let user = users.find(user => user.id == id);

   // if(user){
     //   user.favoriteMovies = user.favoriteMovies.filter(title => title !== movie);
      //  res.status(201).send(`${movie} has been removed from ${user.name}'s favorite movie list!`);
    //} else {
      //  res.status(400).send('The user is not in our database.');
    //}
//});

app.delete('users/:id/:movie', async (req, res) => {
    await Users.findOne({id : req.params.id})
    .then((user) => {
        if(user) {
            user.findOneAndDelete({favoriteMovies : req.params.movie});
            res.status(201).send(`${req.params.movie} + has been removed from ${req.params.id}'s list.`)
        } else {
            res.status(400).send('The user is not in our database')
        }
    })
    .catch((err) => {
        console.error('Error: ' + err)
    })
});

//Update users usernames
//app.put('/users/:id/:update', (req, res) => {
//    let updatedUser = req.body;
//    let id = req.params.id;
//    let update = req.params.update;
//    let user = users.find(user => user.id == id);

//    if(user){
//        user.name = update;
//        res.status(201).json(user);
//    } else {
//        res.status(400).send('This user is not in our database');
//    }
//});

app.put('/users/:id/:username', async (req, res) => {
    await Users.findOneAndUpadte({id: req.params.id}),
    {$set: {
        Name : req.params.name,
        Username : req.params.username,
        Password : req.params.password,
        Email : req.params.email,
        Birthday : req.params.birthday
    }}
    .then((user) => {
        if(user) {
            res.json(user);
        }
    })
    .catch((err) => {
        console.error('Error : ' + err);
    })
});

//Read list of all movies
// app.get('/movies', (req, res) => {
//    res.status(200).json(movies);
// });

app.get('/movies', async (req, res) => {
    await Movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error('Error : ' + err);
    })
})

//Read list of a specific movie
app.get('/movies/:title', (req, res) =>{
    const title = req.params.title;
    const movie = movies.find(movie => movie.title === title);

    if(movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).send('This movie is not in our database.');
    }
});

//Read the genre of a movie
app.get('/movies/genre/:genreName', (req, res) =>{
    const genreNew = req.params.genreName;
    const genreName = movies.find(movie => movie.genre.name === genreNew).genre;

    if(genreName){
        res.status(200).json(genreName);
    } else {
        res.status(404).send('This genre is not in our database.');
    }
});

//Read a directors bio
app.get('/movies/director/:name', (req, res) => {
    const dirName = req.params.name;
    const dirBio = movies.find(movie => movie.director.name === dirName).director;

    if(dirBio){
        res.status(200).json(dirBio);
    } else {
        res.status(404).send('This director is not in our database.')
    }
});

//Read list of all users
app.get('/users', async (req, res) => {
    await Users.find()
    .then(
        (users) => {
            res.status(201).json(users)
        }
    )
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err)
    })
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