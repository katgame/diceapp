import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
setupSocket(io);



const rooms = {};

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Define some array variables

let data = Array(0);
let currentData = Array(0);

const program = async () => {

  console.log('program running ');
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
      console.log('afffectedRows ', e.affectedRows[0].before);
      switch (e.type) {
        case "DELETE":
          data = currentData[0].before;
          // Remove user from room
          // Object.keys(rooms).forEach((roomId) => {
          //   if (rooms[roomId].members[socket.id]) {
          //     delete rooms[roomId].members[socket.id];
          //     if (Object.keys(rooms[roomId].members).length === 0) {
          //       delete rooms[roomId];
          //     }
          //   }
          // });
          break;
        case "UPDATE":
          // UPDATE user from room

          break;

        case "INSERT":
          // UPDATE user from room
          console.log('new user added', )
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


io.on("connection", (socket) => {
  console.log("A user connected");



  socket.on("joinRoom", (roomId, profile) => {
    socket.join(roomId);
    console.log(
      `User ${profile.firstName} with ID ${socket.id} joined room ${roomId}`
    );

    // Store user details in the rooms object
    if (!rooms[roomId]) {
      rooms[roomId] = { members: {} };
    }
    rooms[roomId].members[socket.id] = profile;

    // Emit welcome message with user details
    io.to(roomId).emit(
      "message",
      `Hello world, welcome to room ${roomId}, ${profile.firstName}`
    );

    printRooms(); // Print all rooms and their members
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    // Remove the user from all rooms they were part of and possibly delete the room if empty
    Object.keys(rooms).forEach((roomId) => {
      if (rooms[roomId].members[socket.id]) {
        delete rooms[roomId].members[socket.id];
        if (Object.keys(rooms[roomId].members).length === 0) {
          delete rooms[roomId];
        }
      }
    });
    printRooms(); // Print updated rooms info
  });
});

function printRooms() {
  console.log("Current rooms and their members:");
  Object.entries(rooms).forEach(([roomId, details]) => {
    console.log(`Room ${roomId}:`);
    Object.entries(details.members).forEach(([id, user]) => {
      console.log(`  Member ID ${id}: ${user.name}, Tokens: ${user.tokens}`);
    });
  });
}

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

<<<<<<< HEAD
// import express from 'express';
// import { createServer } from 'http';
// import { Interface } from 'readline';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);
// const io = new Server(server);


// const rooms = {};cl

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('joinRoom', (roomId, profile, session) => {
//     socket.join(roomId);
//     console.log(`User ${profile.name} with ID ${socket.id} joined room ${roomId}`);
    
//     // Store user details in the rooms object
//     if (!rooms[roomId]) {
//       rooms[roomId] = { members: {}, game: {} };
//     }
//     rooms[roomId].members[socket.id] = profile;

//     // Emit welcome message with user details
//     io.to(roomId).emit('message', `Hello world, welcome to room ${roomId}, ${profile.name}`);
//     io.to(roomId).emit('session', session);

//     console.log('Room members:', rooms[roomId].members);
//     console.log('Number members:', Object.keys(rooms[roomId].members).length);
//     if (Object.keys(rooms[roomId].members).length === 2) {
//       // Start the game when there are two players in the room
//       rooms[roomId].game = { started: true };
//       updateGame(roomId, rooms[roomId].game);
//     }
    

//     printRooms(); // Print all rooms and their members
//   });

//   socket.on('disconnect', () => {
//     console.log(`User ${socket.id} disconnected`);
//     // Remove the user from all rooms they were part of and possibly delete the room if empty
//     Object.keys(rooms).forEach(roomId => {
//       if (rooms[roomId].members[socket.id]) {
//         delete rooms[roomId].members[socket.id];
//         if (Object.keys(rooms[roomId].members).length === 0) {
//           delete rooms[roomId];
//         }
//       }
//     });
//     printRooms(); // Print updated rooms info
//   });
// });

// function updateGame(roomId, gameDetails) {
//   // update the game
//   console.log('Game started');
//   io.to(roomId).emit('updateGame', rooms[roomId].game);
// }

// function printRooms() {
//   console.log("Current rooms and their members:");
//   Object.entries(rooms).forEach(([roomId, details]) => {
//     console.log(`Room ${roomId}:`);
//     Object.entries(details.members).forEach(([id, user]) => {
//       console.log(`  Member ID ${id}: ${user.name}, Tokens: ${user.tokens}`);
//     });
//   });
// }

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// app.get('/rooms', (req, res) => {
//   res.json(rooms);
// });

// app.get('/rooms/:roomId', (req, res) => {
//   const roomId = req.params.roomId;
//   res.json(rooms[roomId]);
// });

// app.get('/rooms/:roomId/members', (req, res) => {
//   const roomId = req.params.roomId;
//   res.json(rooms[roomId]?.members);
// });
// // request

// app.get('/rooms/:roomId/members/:memberId', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   res.json(rooms[roomId]?.members[memberId]);
// });

// app.get('/rooms/:roomId/members/:memberId/tokens', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   res.json(rooms[roomId]?.members[memberId]?.tokens);
// });

// app.get('/rooms/:roomId/members/:memberId/tokens/:tokens', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   const tokens = req.params.tokens;
//   rooms[roomId].members[memberId].tokens = tokens;
//   res.json(rooms[roomId]?.members[memberId]?.tokens);
// });

// app.get('/rooms/:roomId/members/:memberId/firstName', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   res.json(rooms[roomId]?.members[memberId]?.firstName);
// });

// app.get('/rooms/:roomId/members/:memberId/firstName/:firstName', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   const firstName = req.params.firstName;
//   rooms[roomId].members[memberId].firstName = firstName;
//   res.json(rooms[roomId]?.members[memberId]?.firstName);
// });

// app.get('/rooms/:roomId/members/:memberId/lastName', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   res.json(rooms[roomId]?.members[memberId]?.lastName);
// });

// app.get('/rooms/:roomId/members/:memberId/lastName/:lastName', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   const lastName = req.params.lastName;
//   rooms[roomId].members[memberId].lastName = lastName;
//   res.json(rooms[roomId]?.members[memberId]?.lastName);
// });

// app.get('/rooms/:roomId/members/:memberId/email', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   res.json(rooms[roomId]?.members[memberId]?.email);
// });

// app.get('/rooms/:roomId/members/:memberId/email/:email', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   const email = req.params.email;
//   rooms[roomId].members[memberId].email = email;
//   res.json(rooms[roomId]?.members[memberId]?.email);
// });

// app.get('/rooms/:roomId/members/:memberId/phone', (req, res) => {
//   const roomId = req.params.roomId;
//   const memberId = req.params.memberId;
//   res.json(rooms[roomId]?.members[memberId]?.phone);
// });

=======
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.get("/rooms/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  res.json(rooms[roomId]);
});

app.get("/rooms/:roomId/members", (req, res) => {
  const roomId = req.params.roomId;
  res.json(rooms[roomId]?.members);
});
// request

app.get("/rooms/:roomId/members/:memberId", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  res.json(rooms[roomId]?.members[memberId]);
});

app.get("/rooms/:roomId/members/:memberId/tokens", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  res.json(rooms[roomId]?.members[memberId]?.tokens);
});

app.get("/rooms/:roomId/members/:memberId/tokens/:tokens", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  const tokens = req.params.tokens;
  rooms[roomId].members[memberId].tokens = tokens;
  res.json(rooms[roomId]?.members[memberId]?.tokens);
});

app.get("/rooms/:roomId/members/:memberId/firstName", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  res.json(rooms[roomId]?.members[memberId]?.firstName);
});

app.get("/rooms/:roomId/members/:memberId/firstName/:firstName", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  const firstName = req.params.firstName;
  rooms[roomId].members[memberId].firstName = firstName;
  res.json(rooms[roomId]?.members[memberId]?.firstName);
});

app.get("/rooms/:roomId/members/:memberId/lastName", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  res.json(rooms[roomId]?.members[memberId]?.lastName);
});

app.get("/rooms/:roomId/members/:memberId/lastName/:lastName", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  const lastName = req.params.lastName;
  rooms[roomId].members[memberId].lastName = lastName;
  res.json(rooms[roomId]?.members[memberId]?.lastName);
});

app.get("/rooms/:roomId/members/:memberId/email", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  res.json(rooms[roomId]?.members[memberId]?.email);
});

app.get("/rooms/:roomId/members/:memberId/email/:email", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  const email = req.params.email;
  rooms[roomId].members[memberId].email = email;
  res.json(rooms[roomId]?.members[memberId]?.email);
});

app.get("/rooms/:roomId/members/:memberId/phone", (req, res) => {
  const roomId = req.params.roomId;
  const memberId = req.params.memberId;
  res.json(rooms[roomId]?.members[memberId]?.phone);
});
>>>>>>> cf82a84fde7b4ec75ea44e8accaa6057d7d91d92
