const ItemStructure = require('../models/item-structure.model.js');
const User = require('../models/user.model.js'); 

const MongoClient = require( 'mongodb' ).MongoClient;
const url = 'mongodb://localhost:27017/';
const dbConfig = require('../../config/database.config.js');

// Create and Save a new Item Structure
exports.createItemStructure = (req, res) => {
    // Validate request
    if(!req.body.useremail) {
        return res.status(400).send({
            email: req.body.useremail,
            message: "Sorry...request content can not be empty"
        });
    }

    MongoClient.connect(dbConfig.serverUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("eDiaryDB");
        dbo.collection("users").findOne({email: req.body.useremail}, function(err, result) {
          if (err) throw err;
          console.log("1)Find result from result : "+JSON.stringify(result));
          
          if(!result){
            // Create a User
            const userNew = new User({
                email: req.body.useremail || "Untitled Item"
            });
        
            // Save User in the database
            userNew.save();
            console.log(userNew._id+" new user is created");

            //Create a ItemStructure
            const itemStructure = new ItemStructure({
                userId: userNew._id,
                userEmail: req.body.useremail,
                itemType: req.body.itemtype,
                structureFields: JSON.parse(req.body.structurefields)
            });
            itemStructure.save()
            .then(data => {
                res.status(201).send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });

            }
            else{
                dbo.collection("itemstructures").findOne({$and:[{userEmail
                    : req.body.useremail}, {itemType: req.body.itemtype}]}, function(err, output) {
                    if (err) throw err;
                    console.log("2)Find result from result : "+JSON.stringify(output));

                    if(!output){
                        const itemStructure = new ItemStructure({
                            userId: result._id,
                            userEmail: req.body.useremail,
                            itemType: req.body.itemtype,
                            structureFields: JSON.parse(req.body.structurefields)
                        });
                        itemStructure.save()
                        .then(data => {
                            res.status(201).send(data);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some internal server error occurred while creating the Note."
                            });
                        });
                    }else{
                        console.log(output.itemType+" collection already have been created by "+output.userEmail);
                        console.log("Sorry you can't create same type collection");
                        res.status(409).send({
                            message: "Sorry you can't create same type collection, "+output.itemType+" collection already have been created by "+output.userEmail
                        });
                    }            
                });
            }
          db.close();
        });
    }); 
};

exports.getItemStructure = (req, res) => {

    // Validate request
    if(!req.body.useremail) {
        return res.status(400).send({
            email: req.body.useremail,
            message: "Sorry...request content can not be empty"
        });
    }

    MongoClient.connect(dbConfig.serverUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("eDiaryDB");
        dbo.collection("itemstructures").findOne({$and:[{userEmail
            : req.body.useremail}, {itemType: req.body.itemtype}]}, { projection: { _id: 0, createdAt:0, updatedAt:0, __v:0} }, function(err, result) {
          if (err) throw err;
          console.log("Find result from result : "+JSON.stringify(result));
          res.send(result);
          db.close();
        });
    }); 
};