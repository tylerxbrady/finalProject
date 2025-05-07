const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");
const databaseName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION;
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.10xvilw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//const uri = `mongodb+srv://hi:test1234@cluster0.7frbreg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

router.post("/", async (request, response) => { 
    let itemsTable = `
        <table border="1">
            <tr> 
                <th>Name</th>
                <th>Age</th>
            </tr>    
        `; 
    try {
      await client.connect();
      const database = client.db(databaseName);
      const collection = database.collection(collectionName);
      const cursor = collection.find({});
  
      result = await cursor.toArray();
        
        if(result.length > 0){ 
            result.forEach(x => {
                itemsTable += `<tr> 
                    <td>${x.name}</td>
                    <td>${x.guess}</td>
                </tr>`;
            });
            
        }
        itemsTable += `</table>`;
        
    
    } catch (e) {
      console.error(e);
      itemsTable = "Unable to fetch age. Please try again later."
   } finally {
      await client.close();
   }

    response.render("all", { table: itemsTable });
  });

  module.exports = router;