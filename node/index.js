// const io = require('socket.io')(8000)
// const users = {}
// io.on('connection',socket =>{
//     socket.on('new-user-joined',name =>{
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined',name);
//     })
//     socket.on('send',message =>{
//         socket.broadcast.emit('receive',{message,users[socket.id]})
//     })

//     socket.on('disconnect',message =>{
//         socket.broadcast.emit('left',users[socket.id]);
//         delete users[socket.id]
//     })
// })




// const io = require('socket.io')(3000);

const io = require('socket.io')(3000, {
    cors: {
      origin: ["http://127.0.0.1:5500", "http://localhost:8080"],
      methods: ["GET", "POST"]
    }
  });
  
const users = {};
  


io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log("new user joined")
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, user: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

