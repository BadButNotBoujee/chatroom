const cool = require('cool-ascii-faces')
const express = require('express')
const chatroomController = require('./presentation_tier/chatroom_controller');
const databaseInterface = require('./database_tier/database')
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http');
const bodyParser = require('body-parser')
var socketIO = require("socket.io");


var app = express();
var server = http.createServer(app).listen(PORT, function () {console.log(`Listening on ${ PORT }`);});
var socketio = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function(request, response){
	
	 response.render('pages/index', {error: null});	
	

});

app.get('/:roomName', function(request, response){
	if(request.params.roomName!=null){
	 var key = request.params.roomName;
    var room = chatroomController.findAndGetRoom(key);
    if(room!=null){
	  response.render('pages/login', {room_title: room.name, key: key});	
	 }else{
	  response.redirect('/');
	 }
	 	
	}else{
	 response.render('pages/index');	
	}

});


app.post('/makeRoom', function (request, response) {
	
	
	if(checkForBlank(request.body.room_title)){
		room = chatroomController.makeNewRoom(request.body.room_title, socketio);
		response.render('pages/details', {link: formatRoomURL(request, room.key)});
	}else{
	
		 response.render('pages/index', {error: "please enter a room name"});	
	
	}
 
});
 
app.post('/chatroom',  function(request, response){
	var username = request.body.username;
   var roomKey = request.body.key;
   var room = chatroomController.findAndGetRoom(roomKey);

	   
   
	if(room!=null || checkForBlank(username)){
	  response.render("pages/chatroomTemplate", {uname: username, namespace:roomKey});
	}else{
	 response.redirect('/');
	}
	
});



function formatRoomURL(request, room) {
return  request.protocol + '://' + request.get('host') + "/" + room;
}

function checkForBlank(string){
var patternForSomeText = new RegExp("[^(\s)]+");
return patternForSomeText.test(string); 
}

