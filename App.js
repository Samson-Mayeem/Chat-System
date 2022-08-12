//Require the express moule
const express = require("express");

//create a new express application
const app = express();

//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");



const port = 500;

const socket = io(http);
//create an event listener

//To listen to messages
socket.on("connection", (socket)=>{
console.log("user connected");
});

//wire up the server to listen to our port 500
http.listen(port, ()=>{
console.log("connected to port: "+ port)
});

socket.on("connection", (socket)=>{
    console.log("user connected");
    socket.on("diconnected", ()=>{
        console.log("Disconnected");
    })
});

//event handler
socket.on("chat message", function(msg){
    console.log("message: " + msg);
    //broadcast message to everyone in port except yourself
    socket.broadcast.emit("received", {message:msg});
});

//database connection
const Chat = require("./models/chat");
const connect = require("./dbconnection");
const bodyParser = require("body-parser");
const chatRouter = require("./routes/chatroute");

//body middle-ware
app.use(bodyParser);
//routes
app.use("chats", chatRouter);


 var print = console.log();
//setup event listner
socket.on("connection", socket=>{
    console.log("user connected");
    socket.on("disconnected", function(){
        print("user disconnected");
    });
    socket.on("chat message", function(msg){
        print("message: ", + msg);
        //braodcast ,message: msg to our port
        socket.broadcast.emit("received", {message: msg});

        //save message into database
        connect.then(db =>{
            print("connected well to server");
            let chatMessage = new Chat({message: msg, sender: "Anonymous"});
            chatMessage.save();
        });
    });
});

//fetching the initial chat message from the database
(function(){
    fetch("/chats").then(data=>{
        return data.json();
    }).then(json =>{
        json.map(data =>{
            let list = document.createElement("list");
            let messages = document.createElement("messages");
            let span = document.createElement("span");
            messages.appendChild(list).append(data.message);
            messages.appendChild(span)
            .append("by" + data.sender + ": " + formartTimeAgo(data.createdAt));
        });
    });
})();

