process.stdin.setEncoding("utf8");
const path = require("path");
const express = require("express");  
const app = express();
const bodyParser = require("body-parser"); 

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(bodyParser.urlencoded({extended:false}));

require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const databaseName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION;
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.10xvilw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

const portNumber = process.argv[2];

console.log(`Web server started and running at http://localhost:${portNumber}`);

const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);

process.stdin.on("readable", function () {
  const dataInput = process.stdin.read();
  if (dataInput !== null) {
    const command = dataInput.trim();
    if (command === "stop") {
        process.stdout.write("Shutting down the server\n");
        process.exit(0);
    } else {
        process.stdout.write(`Invalid command: ${command}\n`);
    }
    process.stdout.write(prompt);
    process.stdin.resume();
  }
});

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/form", (request, response) => { 
  response.render("form", {port: portNumber});
 });


app.post("/response", async (request, response) => { 
  let name =  request.body.name;
  let guess;
    
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
      const guessDB = { name: name, guess: guess};
      await collection.insertOne(guessDB);
    }
  
  } catch (e) {
    console.error(e);
 } finally {
    await client.close();
 }

  variables = {name: name, guess: guess};
  response.render("response", variables);
});

app.listen(portNumber);