const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

//Port from env variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);

//CORS ref: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/index.html
const io = socketIo(server, {
  cors: {
    //change the origin address when deployed
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let players = [];

io.on("connection", (socket) => {
  socket.emit("login", { myId: socket.id, players });
  console.log("New client connected");

  socket.on("join", (data) => {
    const { id, name } = data;
    const player = {
      id: id,
      name: name,
    };
    players.push(player);
    console.log("We have a new client: " + player.id);

    // console.log(players);
    socket.broadcast.emit("join", players);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
