const socket = io();

// select my 3 buttons that will allow me to connect to the rooms
const connectRoom1 = document.querySelector('#connectRoom1');
const connectRoom2 = document.querySelector('#connectRoom2');
const connectRoom3 = document.querySelector('#connectRoom3');

// events that, upon clicking, will connect me to the rooms

connectRoom1.addEventListener('click', () => {
  socket.emit('connect to room', 'room1');
});

connectRoom2.addEventListener('click', () => {
  socket.emit('connect to room', 'room2');
});

connectRoom3.addEventListener('click', () => {
  socket.emit('connect to room', 'room3');
});

// Send message

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  socket.emit('message', formData.get('message'));
})

// recieve event of message 

socket.on('send message', data => {
  const { room, message } = data; 
  console.log(room)
  const li = document.createElement('li');
  li.textContent = message

  const sala = document.querySelector(`#${room}`);
 
  sala.appendChild(li)
});