const express = require('express');
const app = express();
const io = require('socket.io')();

app.use(express.static('public'));

app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

const server = app.listen(3000, ()=>{
  console.log('listening on port 3000');
});

io.attach(server);

var users = 0;

io.on('connection', socket =>{

  socket.on('add user', (nickName) =>{
    ++users;
    io.emit('chat message', { for : 'everyone', message : `${nickName} has joined!`, users});

    console.log(users);
  });

  socket.on('chat message', msg => {
    io.emit('chat message', { for : 'everyone', message : msg});
  });

  socket.on('disconnect', (nickName) => {
      --users;
    io.emit('disconnect message', `${nickName} has left.`, {
      users
    });
    console.log(users);
  });
});
