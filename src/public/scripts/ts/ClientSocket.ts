const io = require('socket.io-client');

interface SocketData {
  message: string;
}

namespace Socket{

  class ClientSocket{
    connect(){
      const socket = io.connect('localhost:3000');
      
      socket.on('news', (data: SocketData) => {
        console.log('Connected');
      });
    }
  }

  module.exports = ClientSocket;
  
}

