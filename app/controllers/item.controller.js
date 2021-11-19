const Item = require('../models/item.model.js');
const User = require('../models/user.model.js');

const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../../config/database.config.js');
var ObjectId = require('mongodb').ObjectID;

// Create a new Item
exports.createItem = (req, res) => {
  // Validate request
  if (!req.body.useremail) {
    return res.status(400).send({
      content: req.body.useremail,
      message: "Sorry...request content can not be empty"
    });
  }

  MongoClient.connect(dbConfig.serverUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eDiaryDB");
    const query = { $and: [{ userEmail: req.body.useremail }, { type: req.body.type }, { attributes: JSON.parse(req.body.attributes) }] };
    const update = {
      "$set": {
        "userEmail": req.body.useremail,
        "type": req.body.type,
        "attributes": JSON.parse(req.body.attributes),
      }
    };
    //Resposible for avoid creating duplicate recoards & Return the updated document instead of the original document
    const options = { upsert: true, returnNewDocument: true };

    dbo.collection("items").findOneAndUpdate(query, update, options, function (err, result) {
      if (err) throw err;
      console.log("Find result from result : " + JSON.stringify(result));
      res.send({
        //   res: result,
        updatedExisting: result.lastErrorObject.updatedExisting,
        message: (result.lastErrorObject.updatedExisting) ? "Recoard is already existing" : "New item added successfuly"
      });
      db.close();
    });
  });
};

exports.updateItem = (req, res) => {
  // Validate request
  if (!req.body.id) {
    return res.status(400).send({
      content: req.body,
      message: "Sorry...request content can not be empty"
    });
  }

  MongoClient.connect(dbConfig.serverUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eDiaryDB");
    const query = { _id: ObjectId(req.body.id) };
    const update = {
      "$set": {
        "attributes": JSON.parse(req.body.attributes),
      }
    };
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };

    dbo.collection("items").findOneAndUpdate(query, update, options, function (err, result) {
      if (err) throw err;
      console.log("Find result from result : " + JSON.stringify(result));
      res.send({
        //res: result,
        updatedExisting: result.lastErrorObject.updatedExisting,
        message: (result.lastErrorObject.updatedExisting) ? "Recoard is updated successfuly" : "Sorry...this recoard can't be updated"
      });
      db.close();
    });
  });
};

exports.getItems = (req, res) => {
  // Validate request
  if (!req.body.useremail) {
    return res.status(400).send({
      content: req.body.useremail,
      message: "Sorry...request content can not be empty"
    });
  }

  MongoClient.connect(dbConfig.serverUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eDiaryDB");
    dbo.collection("items").find({ userEmail: req.body.useremail, type: req.body.type }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send({
        itemcount: result.length,
        items: result,
      });
      db.close();
    });
  });
};

exports.test = (req, res) => {
  // Validate request
  if (!req.body.useremail) {
    return res.status(400).send({
      content: req.body.useremail,
      message: "Sorry...request content can not be empty"
    });
  }

  MongoClient.connect(dbConfig.serverUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eDiaryDB");
    dbo.collection("items").findOne({ user: req.body.useremail }, { projection: { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 } }, function (err, result) {
      if (err) throw err;
      console.log("Find result from result : " + JSON.stringify(result));
      res.send(result);
      db.close();
    });
  });
};