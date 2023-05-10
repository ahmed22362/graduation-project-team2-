const express = require("express")
var body_parser = require("body-parser")
const validator = require("./utils/validator")
const pool = require("./db/pool")
const morgan=require("morgan")
var petRoute = require("./routes/petRouter")
var solidRoute = require("./routes/solidRouter")
var clinicRoute = require("./routes/clinicRouter")
var userRouter = require("./routes/userRouter")
const  chatRouter = require("./routes/chatRouter")
const socketIO = require('socket.io');
const app = express()
app.use(morgan("dev"))

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE,PATCH, OPTIONS"
  )
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.use("/pet", petRoute)
app.use("/solid", solidRoute)
app.use("/clinic", clinicRoute)
app.use("/user", userRouter)

// app.use("/", (req, res) => {
//   res.status(200).json({ status: "success", msg: "home page" })
// })

// app.listen(3222, async () => {
//   // validator.checkConnection().then(await validator.isAdminExistAndCreateIt())
//   console.log(`server working on port ${3222}....`)
// })

//chat
const server = app.listen(3222, async () => {
  await validator.isAdminExistAndCreateIt()
  console.log(`server working on port ${3222}....`)
})
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    // Broadcast the message to all connected clients
    socket.broadcast.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.use("/chat",chatRouter)
//
// post('/messages', (req, res) => {
//   const { senderId, receiverId, messageText } = req.body;
//   const createdAt = new Date();
//   const query = 'INSERT INTO messages (sender_id, receiver_id, message_text, created_at) VALUES ($1, $2, $3, $4)';
//   const values = [senderId, receiverId, messageText, createdAt];
//
//   connectino.dbQuery(query, values, (error, result) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error sending message');
//     } else {
//       res.status(200).send('Message sent successfully');
//     }
//   });
// });
