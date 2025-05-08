const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
const databaseName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION;
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.10xvilw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//const uri = `mongodb+srv://hi:test1234@cluster0.7frbreg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

router.post("/", async (request, response) => { 
    let name =  request.body.name;
    let guess = 0;
    name = name.trim().toLowerCase();
    try {
      await client.connect();
      const database = client.db(databaseName);
      const collection = database.collection(collectionName);
  
      const existingEntry = await collection.findOne({ name: name });
  
      if (existingEntry) {
        guess = existingEntry.guess;
      } else {
        const apiLink = `https://api.agify.io?name=${name}`
        const json = await (await fetch(apiLink)).json()
        guess = json.age;
        if(guess === null){ 
          guess = 0;
        }
        const guessDB = { name: name, guess: guess};
        await collection.insertOne(guessDB);
      }
    
    } catch (e) {
      console.error(e);
      guess = "Unable to fetch age. Please try again later."
   } finally {
      await client.close();
   }
  
    variables = {name: name, guess: guess};
    response.render("response", variables);
  });

  module.exports = router;