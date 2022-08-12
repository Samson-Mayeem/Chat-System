const express = require("express");
const connectdb = require("../dbconnection");
const Chats = require("../models/chat");

const router = express.Router();

router.route("/").get((req, res, next) =>{
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db =>{
        Chats.find({}).then(chat => {
            res.send.json(chat);
        });
    });
});

module.exports = router;