const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "blog-database";

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect');
    }

    const db = client.db(databaseName);
    db.collection('posts').insertOne({
        title: "Breaking Bad",
        author: "Vince Gillighan",
        rating: "5/5"
    }, (error, result) => {
        if (error)
            return console.log("Unable to insert");
        console.log(result.ops);
    });
});