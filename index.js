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

// Start server
server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
