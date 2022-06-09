import express from "express";
import { getMovies, getMovieById, postMovies, postMovieById, deleteMovieById, updateMovieById } from "./helper.js";
const router = express.Router()

// get movies
router.get('/', async (req, res) => {
    const movies = await getMovies();
    res.send(movies);
})

// get movie by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await getMovieById(id);
    movie ? res.send(movie) : res.status(404).send("no such movie found");
})

// post movies
router.post('/', async function (req, res) {
    const data = req.body;
    const result = await postMovies(data);
    res.send(result);
});

// post movie by id
router.post('/:id', async function (req, res) {
    const data = req.body;
    const result = await postMovieById(data);
    res.send(result);
});

// delete movie by id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await deleteMovieById(id);
    movie.deletedCount > 0 ? res.send(movie) : res.status(404).send({ msg: "no such movie found" });
})

// update movie by id
router.put('/:id', async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const result = await updateMovieById(id, data);
    res.send(result);
});

export const movieRouter = router;