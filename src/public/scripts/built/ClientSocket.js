var io = require('socket.io-client');
var Socket;
(function (Socket) {
    var ClientSocket = (function () {
        function ClientSocket() {
        }
        ClientSocket.prototype.connect = function () {
            var socket = io.connect('localhost:3000');
            socket.on('news', function (data) {
                console.log('Connected');
            });
        };
        return ClientSocket;
    }());
    module.exports = ClientSocket;
})(Socket || (Socket = {}));
//# sourceMappingURL=ClientSocket.js.map