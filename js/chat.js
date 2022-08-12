(function(){
    //var socket = io();
    const io = require("socket.io")(3000,{
        wsEngine: "eiows"});
    $("form").submit(function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#m").val());
        $("#m").val("");
    return true;
    });
})();

