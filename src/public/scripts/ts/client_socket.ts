const io = require('socket.io-client');

module.exports = class ClientSocket{
  connect(){
    const socket = io.connect('localhost:3000');
    
    socket.on('connect', () => {
      console.log('Successfully connected!');
    });
  }
}

