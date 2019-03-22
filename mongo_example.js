"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

db.collection("tweets").find({}, (err, result) => {
    // Lazy error handling:
    if (err) throw err;

    // ==> Fair warning: This is going to log a lot of stuff...
    // console.log("find result: ", result);
    // console.log("type of find result: ", typeof result);
    // result.each((err, item) => console.log("  ", item));

    // result.toArray((err, resultArray) => {
    //   if (err) throw err;

    //   console.log("result.toArray:", resultArray);
    // });


    db.collection("tweets").find().toArray((err, result) => {
    if (err) throw err;

    console.log("result array: ", result);

    // This is the end...
    db.close();
    });
    // ==> This is inside this callback now. Think about it:
    // This is now the "end of the program", right?.
});