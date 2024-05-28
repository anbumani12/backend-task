const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config/db');
const { PORT } = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('bid', (bidData) => {
    io.emit('update', bidData);
  });

  socket.on('notify', (notificationData) => {
    io.emit('notification', notificationData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
