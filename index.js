import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
const app = express();
const port = process.env.PORT;

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB is Connected");
    return client;
}
const client = await createConnection();

// changing to json
app.use(express.json());

// movies page
app.get('/movies', async (req, res) => {
    const movies = await client.db("b33wd").collection("movies").find({}).toArray();
    res.send(movies);
})

// movie by id page
app.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await client.db("b33wd").collection("movies").findOne({ id: id });
    movie ? res.send(movie) : res.status(404).send("no such movie found");
})

// posting movie to mongodb
app.post('/movies', async function (req, res) {
    const data = req.body;
    const result = await client.db("b33wd").collection("movies").insertMany(data);
    res.send(result);
});

<<<<<<< HEAD
// posting movie by id to mongodb
app.post('/movies/:id', async function (req, res) {
    const data = req.body;
    // console.log(data);
    const result = await client.db("b33wd").collection("movies").insertOne(data);
    // console.log(result);
    res.send(result);
});

// delete movie by id page
app.delete('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await client.db("b33wd").collection("movies").deleteOne({ id: id });
    movie.deletedCount > 0 ? res.send(movie) : res.status(404).send({ msg: "no such movie found" });
})

// update movie by id to mongodb
app.put('/movies/:id', async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const result = await client.db("b33wd").collection("movies").updateOne({ id: id }, { $set: data });
    res.send(result);
});

app.listen(port, () => console.log(`server is running on port ${port}`))
=======
app.listen(port, () => console.log(`server is running on port ${port}`))
>>>>>>> a8062c12968335ec0b50ce5698cf58051200b12e
