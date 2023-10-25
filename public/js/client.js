//TODO: Using cdn socket io use this io function 
const socket = io()

const form  = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const userContainer = document.querySelector(".active-user");

var audio = new Audio('ting.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.style.fontWeight = 'bold';
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position == 'left'){
        audio.play();
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message != "" || message.length > 0){
        append(`You : ${message}`,'right');
        socket.emit('send',message);
    }
    messageInput.value = '';
});

//TODO : new User Joined
const userPrompt = prompt("Enter your name to join") 
socket.emit('new-user-joined',userPrompt);


socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
});

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
});


socket.on('leave',name=>{
    if(name != null){
        append(`${name}: left the chat`,'right');
    }
});