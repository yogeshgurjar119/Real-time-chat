const express = require("express");
const app = express();
const socketIO = require("socket.io");

const SERVER_PORT = 8000
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on:- ${SERVER_PORT}`);
});


const io = socketIO(server)

const  users = {};

io.on("connection",(socket)=>{
  console.log("User socket connection ")
  socket.on("new-user-joined",(name)=>{
    if(name !== null || name !== undefined|| name !== ""){
        users[socket.id] = name;
        // activeUsers.add(name);
        socket.broadcast.emit('user-joined',name);
    }
    // io.emit("new user",[...activeUsers])   //spread add all user 
  });


  //emit => send on => receive
    socket.on("send",(message)=>{
      // console.log('work')
        socket.broadcast.emit("receive",{message:message,name: users[socket.id]})
    });

//If User Disconnected
socket.on("disconnect",()=>{
  socket.broadcast.emit('leave',users[socket.id]);
  delete users[socket.id];
})

socket.on("typing",(data)=>{
  socket.broadcast.emit("typing",data)
})
})   //listen event on()  and work for evenvt


//static files
app.use(express.static("public"))
