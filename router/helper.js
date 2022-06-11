import { client } from "../index.js";

export async function getMovies() {
    // find returns cursor - pagination
    // toArray - cursor -> array 
    return await client.db("b33wd").collection("movies").find({}).toArray();
}

export async function getMovieById(id) {
    return await client.db("b33wd").collection("movies").findOne({ id: id });
}

export async function postMovies(data) {
    return await client.db("b33wd").collection("movies").insertMany(data);
}

export async function postMovieById(data) {
    return await client.db("b33wd").collection("movies").insertOne(data);
}

export async function deleteMovieById(id) {
    return await client.db("b33wd").collection("movies").deleteOne({ id: id });
}

export async function updateMovieById(id, data) {
    return await client.db("b33wd").collection("movies").updateOne({ id: id }, { $set: data });
}

export async function createUser(data) {
    return await client.db("b33wd").collection("users").insertOne(data);
}

export async function checkUserByName(name) {
    return await client.db("b33wd").collection("users").findOne({ name: name });
}