const express = require('express');
const app = express();
const io = require('socket.io')();

//serve up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

const server = app.listen(3000, ()=>{
  console.log('listening on port 3000');
});

var userAmt = 0;

io.attach(server);

io.on('connection', socket =>{

  socket.on('add user', (nickName, userAmt) =>{
    io.emit('chat message', { for : 'everyone', message : `${nickName} has joined!`});
    userAmt++;
  });

  socket.on('chat message', msg => {
    io.emit('chat message', { for : 'everyone', message : msg});
  });

  socket.on('disconnect', (nickName, userAmt) => {
    io.emit('disconnect message', `${nickName} has left.`);
    userAmt--;
  });
});
