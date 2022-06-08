import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
const app = express();
const port = 4200;

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
    const movie = await client.db("b33wd").collection("movies").find({ id: id }).toArray();
    movie ? res.send(movie) : res.status(404).send("no such movie found");
})

// posting movie to mongodb
app.post('/movies', async function (req, res) {
    const data = req.body;
    const result = await client.db("b33wd").collection("movies").insertMany(data);
    res.send(result);
});

app.listen(port, () => console.log(`server is running on port ${port}`))
