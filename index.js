import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { movieRouter } from './router/movies.js';
import { usersRouter } from './users.js';
import bcrypt from 'bcrypt';

const app = express();
// const port = 4000;
const port = process.env.PORT;

dotenv.config();
// console.log(process.env)

// mongo url from env. ver.
const MONGO_URL = process.env.MONGO_URL;

// creating mongodb connection
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB is Connected");
    return client;
}
// top level await
export const client = await createConnection();

// intercepting and changing to json
app.use(express.json());

// routing to movieRouter
app.use('/movies', movieRouter);

app.use('/users', usersRouter);

// home page
app.get('/', async (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => console.log(`server is running on port ${port}`))