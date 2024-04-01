const socket = io('http://localhost:3000');
const form = document.getElementById('sendContainer')
const messageInput = document.getElementById('messageImp')
const messageContainer = document.querySelector('.container')


const append = (message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
}


const name = prompt("enter your name to join")
socket.emit('new-user-joined',name)
socket.on('user-joined',data=>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left')
})

// form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`you:${message}`)
//     socket.emit('send',message)
//     messageInput.value = ""
// })

socket.on('left',name =>{
    append(`${name} left the chat`,'left')
})






