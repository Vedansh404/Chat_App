const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  //   console.log(`new user has connected`);
  socket.on("client-message", (message) => {
    console.log(`New Client Message`, message);
    io.emit("message", message);
  });
});

// express mera sari http req ko handle karega
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(3000, () => {
  console.log(`Listening on Port: 3000`);
});
