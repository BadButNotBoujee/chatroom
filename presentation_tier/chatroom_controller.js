var uniqid = require('uniqid');
var exports = module.exports;

var currentRooms = [];

function Room(roomName, io){
 this.name = roomName;
 this.key = uniqid();
 this.socket = io.of("/"+this.key);
}


exports.sendMessage = function (namespace, username, message){
 	for (var i = 0; i < currentRooms.length; i++) {
 	var room = currentRooms[i];
 	console.log("looking for: " + namespace)
   if(room.key == namespace){
     console.log("sending message to all: " + namespace)
     room.socket.emit('incoming_message', room.name, username , message);
   }
 }

}

exports.makeNewRoom = function (roomName, io){
 var room = new Room(roomName, io);

	room.socket.on("connection", function(socket) {

		socket.emit('status', "connected");
      
		socket.on("outgoing_message", function(chatroom, username, message){
			exports.sendMessage(chatroom, username, message);
		});			
		
	}); 
 
 currentRooms.push(room);
 return room;
}

exports.findAndGetRoom = function (key) {
 for (var i = 0; i < currentRooms.length; i++) {
 	var room = currentRooms[i];
   if(room.key == key){
    return room;
   }
 }
 
 return null;
}

