const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (reg, res) => {
  res.send('Server is Running!');
})

// websocket connection
io.on('connection', (socket) => {
  // gives us an id for the socket on frontend
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }) =>{
    io.to(userToCall).emit('calluser', { signal: signalData, from, name});
  });

  socket.on('answercall', (data) =>{
    io.to(data.to).emit('callaccepted', data.signal);
  });
});

// Start server
server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
