// Bring in Express code
const express = require('express')

const app = express()
const port = 3000

app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
  title: "Star Wars",
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}, {
  title: "The Avengers",
  starRating: 4,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}];

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/all-movies', (req, res) => {
    res.send(favoriteMovieList);
});

app.get('/single-movie/:titleToFind', (req, res) => {
    console.log(req.params.titleToFind);
    const foundMovie = favoriteMovieList.find((movie) => {
        return movie.title === req.params.titleToFind;
    })
    console.log(foundMovie);
    res.json({
        success: true,
        foundMovie,
    })
} );

app.post('/new-movie', (req, res) => {

    if (req.body.title === undefined || typeof (req.body.title) !== "string") {
        res.json({
            success: false,
            message: "movie title is required and must be a string"
        })
        return
    }
    if (req.body.starRating === undefined || typeof (req.body.starRating) !== "number") {
        res.json({
            success: false,
            message: "movie rating is required and must be a number"
        })
        return
    }
    if (req.body.isRecommended === undefined || typeof (req.body.isRecommended) !== "boolean") {
        res.json({
            success: false,
            message: "recommendation is required and must be a boolean"
        })
        return
    }

    let newMovie= {};

    newMovie.title = req.body.title;
    newMovie.starRating = req.body.starRating;
    newMovie.isRecommended = req.body.isRecommended;
    newMovie.createdAt = new Date();
    newMovie.lastModified = new Date();
    
    favoriteMovieList.push(newMovie);

    res.json({
        success: true,
    })
});

app.put("/update-movie/:titleToUpdate", (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const movieToFind = req.params.titleToUpdate;

    const originalMovie = favoriteMovieList.find((movie) => {
        return movie.title === movieToFind;
    })

    const originalMovieIndex = favoriteMovieList.findIndex((movie) => {
        return movie.title === movieToFind;
    })
    
    if (!originalMovie){
        res.json({
            success: false,
            message: "Could not find movie in the list"
        })
        return
    }

    const updatedMovie = {}

    if (req.body.title !== undefined) {
        updatedMovie.title = req.body.title
    } else {
        updatedMovie.title = originalDog.title
    }

    if (req.body.starRating !== undefined) {
        updatedMovie.starRating = req.body.starRating
    } else {
        updatedMovie.starRating = originalDog.starRating
    }

    if (req.body.isRecommended !== undefined) {
        updatedMovie.isRecommended = req.body.isRecommended
    } else {
        updatedMovie.isRecommended = originalDog.isRecommended
    }

    favoriteMovieList[originalMovieIndex] = updatedMovie

    res.json({
        success: true,
    })
});

app.delete("/delete-movie/:titleToDelete", (req, res) => {

    const movieToDelete = req.params.titleToDelete;
    const indexOfMovie = favoriteMovieList.findIndex((movie) => {
        return movie.title === movieToDelete;
    })

    favoriteMovieList.splice(indexOfMovie,1);

    res.json({
        success: true,
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})