import MySQLEvents from "@rodrigogs/mysql-events";
import { Server } from "socket.io";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import http from "http";
import mysql from "mysql";
import path from "path";

const port = 3000;
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const rooms = {}; // To store room IDs and their corresponding socket IDs
//const Round = { id: "", players: [], active: false, currentPlayerIndex: 0 };
class Round {
  id = String;
  players= [];
  active = false;
  currentPlayerIndex = 0;
  constructor(id, players, active, currentPlayerIndex) {
    this.id = id;
    this.players = players;
    this.active = active;
    this.currentPlayerIndex = currentPlayerIndex;
  }
}
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Define some array variables

let data = Array(0);
let currentData = Array(0);
const program = async () => {
  console.log("program running ");
  const connection = mysql.createConnection({
    host: "160.119.253.205",
    post: "3306",
    user: "bhakiAPI",
    password: "*X8kl?_o2q2_",
    db: "dice",
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true,
  });

  await instance.start();

  instance.addTrigger({
    name: "Monitor all sql statements",
    expression: "dice.gamesession",
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (e) => {
      currentData = e.afffectedRows;
      let data;
      //console.log("afffectedRows ", e.affectedRows[0].before);
      switch (e.type) {
        case "DELETE":
          data = currentData[0].before;
          // Remove user from room
          Object.keys(rooms).forEach((roomId) => {
            if (rooms[roomId].players[socket.id]) {
              delete rooms[roomId].players[socket.id];
              if (Object.keys(rooms[roomId].players).length === 0) {
                delete rooms[roomId];
              }
            }
          });
          break;
        case "UPDATE":
          // UPDATE user from room

          break;

        case "INSERT":
          // UPDATE user from room
         // console.log("new user added");
          // console.log("user info", e.affectedRows[0].after );
         // let data = e.affectedRows[0].after;
          // console.log("user data : ",data);
         // console.log("user info : ", data.PlayerId, "  : ", data.SessionId);
          // io.emit('joinRoom', { userId : data.playerId ,roomId :  data.sessionId})
          break;
        default:
          break;
      }
    },
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program().then();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
});

app.get("/room/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  res.render("room", { roomId });
});

app.get("/throwDice", (req, res) => {
  io.emit("throwDice");
  res.send("Dice roll triggered for all users");
});

app.get("/throwDice/:userId", (req, res) => {
  const userId = req.params.userId;
  //const socketId = userSockets[userId];

  if (socketId) {
    io.to(socketId).emit("throwDice");
    res.send(`Dice roll triggered for user ${userId}`);
  } else {
    res.status(404).send(`User ${userId} not connected`);
  }
});
app.get("/rooms", (req, res) => {
  console.log(rooms);
  console.log("Result: ", JSON.stringify(rooms));
  const response = JSON.stringify(rooms);
  res.json(JSON.parse(response));
});
app.get("/throwDice/room/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const sockets = rooms[roomId];

  if (sockets && sockets.length > 0) {
    sockets.forEach((socketId) => {
      io.to(socketId).emit("throwDice");
    });
    res.send(`Dice roll triggered for room ${roomId}`);
  } else {
    res.status(404).send(`Room ${roomId} not found`);
  }
});

io.on("connection", (socket) => {
 // console.log("A user connected");
  console.log("A user connected with, " + socket.id);

  socket.on("joinRoom", (userId, roomId) => {
    console.log("joinRoom called");
    if (rooms[roomId]) {
      socket.join(roomId);
      rooms[roomId].players.push(userId.toString());
      rooms[roomId].userMap.push({ userId : userId.toString(), socketId : socket.id.toString() });
      console.log(`Player ${socket.id} joined room ${roomId}`);
      let message = {
        messageType : 'MessageType.joinGame',
        message : 'New player joined'

      }
      //io.to(roomId).emit('roomMessage', message);
    } else {
      socket.emit("room_error", "Room does not exist");
    }
  });

  socket.on("create_room", (roomId, userId) => {
    console.log(`create_room  called`);
    if (!rooms[roomId]) {
      rooms[roomId] = {
        round: new Round('',[],false,0),
        players: [],
        userMap : [{userId : userId.toString(), socketId: socket.id.toString()}]
      };
      socket.join(roomId);
      rooms[roomId].players.push(userId.toString());
      console.log(`Room ${roomId} created and player ${socket.id} joined`);
      console.log("Result: ", JSON.stringify( rooms[roomId]));
    } else {
      socket.emit("room_error", "Room already exists");
    }
  });

  socket.on("add_player_to_round", (roomId, userId, roundId) => {
    if (!rooms[roomId]) {
      if(rooms[roomId].round.id !== '') {
        rooms[roomId].round.id =roundId;
      }
      rooms[roomId].round.players.push(userId);
      rooms[roomId].round.active = true;
      rooms[roomId].round.currentPlayerIndex = 1;

    }
    console.log(
      `player ${socket.id} added to round ${rooms[roomId].round.id} `
    );
  });

  socket.on("end_turn", (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].round.currentPlayerIndex =
        (rooms[roomId].currentPlayerIndex + 1) % rooms[roomId].players.length;
      switchTurns(roomId);
    }
  });
  socket.on("throwDice", () => {
    console.log("throwDice");
    socket.broadcast.emit("throwDice", {});
  });
  socket.on("send_private_message", (data) => {
    const { room, targetId, message } = data;
    if (rooms[room]) {
      const targetSocket = rooms[room].players.find(
        (player) => player.id === targetId
      );
      if (targetSocket) {
        targetSocket.emit("private_message", message);
      }
    }
  });

  socket.on("send_message_to_room", (room, message) => {
    console.log('send_message_to_room hit :', room )
    if (rooms[room]) {
      io.to(room).emit('roomMessage', message);
    }
  });
  socket.on("scoreResult", (data) => {
    socket.broadcast.emit("scoreResult", data);
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(player => player.id !== socket.id);

      if (rooms[room].players.length === 0) {
          delete rooms[room];
      } else if (rooms[room].round.currentPlayerIndex >= rooms[room].players.length) {
        
          rooms[room].round.currentPlayerIndex = 0;
      }
  }
  console.log('Player disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// function switchTurns(roomId) {
//   if (rooms[roomId].round.players.length > 0) {
//       const currentPlayer = rooms[roomId].round.players[rooms[roomId].currentPlayerIndex];
//       currentPlayer.emit('your_turn', 'It is your turn now');
//       rooms[roomId].round.players.forEach((player, index) => {
//           if (index !== rooms[roomId].currentPlayerIndex) {
//               player.emit('wait_turn', 'Wait for your turn');
//           }
//       });
//   }
// }

// setInterval(() => {
//   for (const roomId in rooms) {
//       switchTurns(roomId);
//   }
// }, 20000);

function removeUserFromSession(userId,roomId) {
  connect.query("DELETE FROM dice.gamesession where PlayerId = '"+userId+"' and SessionId ='"+roomId+"'", function(err, result) {
    if(err) { throw new Error('Failed');}
    initial_result = initial_result || result;
      
    if(Changed(initial_result, result)) { 
      console.log('úser remnoved from DAtabase')
      socket.emit('changed', result); 
    }

});
}