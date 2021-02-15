const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
const port = 2000;
const userRouter = require("./router/userRouter");
const query = require("./database");

app.use(cors());
app.use(bodyParser());

let userCount = 0;
app.io = io;
app.userCount = userCount;
let users = [];

io.on("connection", (socket) => {
  userCount += 1;
  console.log("User Connected", userCount);
  io.emit("JumlahUser", userCount);

  socket.on("join room", (room) => {
    console.log(`join ${room}`);
    socket.join(room);
  });

  socket.on("leave room", (room) => {
    console.log(`leave ${room}`);
    socket.leave(room);
  });

  socket.on("chat", ({ message, room }) => {
    query(`INSERT INTO chat (chat, room) VALUES ('${message}', '${room}')`);
    io.to(room).emit("chat", message);
  });

  socket.on("disconnect", () => {
    userCount--;
    console.log("User Disconnected, Remaining: ", userCount);
    io.emit("JumlahUser", userCount);
  });
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Express API</h1>");
});

app.use("/users", userRouter);

server.listen(port, () => console.log(`API active at port ${port}`));
