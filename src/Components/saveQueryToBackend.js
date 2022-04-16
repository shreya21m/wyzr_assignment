// work in progress 

import { useData } from "../src/contexts/dataContext";

// var mongo = require("mongodb");
// const { MongoClient } = require("mongodb");

// const uri = `mongodb+srv://MadhushreeKunder:mongoDB${mongoPassword}@wyzr-cluster.44oxx.mongodb.net/test`;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

console.log("INN")

export async function AddSearchQueryToDB() {

  const { book } = useData();

  try {
    await client.connect();
    const database = client.db("user");
    const searchquery = database.collection("searchquery");

    const newSearchQuery = { email: "zenorace@gmail.com", query: book };
    const result = await searchquery.insertOne(newSearchQuery);

    console.log(result);
    console.log(book);
  } finally {
    await client.close();
  }
}

AddSearchQueryToDB().catch(console.dir);
