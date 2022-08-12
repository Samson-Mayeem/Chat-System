const express = require("express");
const { db } = require("../models/chatSchema");
const connectdb = require ("./../dbconnection");
const Chats = require("./../models/chat");

const router = require();

router.route("/").get((req, res, next) =>{
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db =>{
        Chats.find({}).then(chat =>{
            res.json(chat);
        });
    });
});