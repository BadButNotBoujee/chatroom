/** 
+---------------------------------------------------------------------------------------------------+
							SCRIPT BELOW IS FOR RECEIVING AND SENDING MESSAGES
+---------------------------------------------------------------------------------------------------+
**/

var socket = io();

socket.on('sendMessageToClient', function (message) {
	newMessageRecieved(message);
});



function sendAMessage(messageToSend) { 
	socket.emit("newMessage", messageToSend, room, sender)
}

function newMessageRecieved(messageContent){

}



/** 
+---------------------------------------------------------------------------------------------------+
								   SCRIPT BELOW IS FOR LOADING AND MAKING CHATROOMS
+---------------------------------------------------------------------------------------------------+
**/


function makeNewChatRoom(){

}

function loadAllPublicChatRooms(){

}



/** 
+---------------------------------------------------------------------------------------------------+
											SCRIPT BELOW IS FOR SEARCH FEATURE
+---------------------------------------------------------------------------------------------------+
**/

var parentOfSearchResults;
var results = document.createElement('div');
results.setAttribute("id", "resultsList");

/**
Takes input from the given searchField and produces results in the given resultsDivide
**/
function takeInputFromSearchField(searchFieldId, resultsDivideID){
	var searchField = document.getElementById(searchFieldId);
	setParentResult(resultsDivideID);
	
	searchField.addEventListener("keydown", function(){
		clearResultsDivide();
		addResultsToParentOfSearchResults(searchField.value);
	});
}

/** 
Adds a div of matching results to the parentOfSearchResults divide. 
**/
function addResultsToParentOfSearchResults(inputString){
 	searchAndAddMatchesToDivide(results, JSONArrayOfEveryBroadcast, inputString)
 	parentOfSearchResults.appendChild(results);
}

/**checks if the input string is a substring of any entries in the JSONArrayOfEveryBroadcast array, if they are then 
 the function adds the matching entries to the resultsDivide passed in.
**/
function searchAndAddMatchesToDivide(resultsDivide, arrayToSearch, inputString){

   for (index = 0; index < arrayToSearch.length; index++) {
     
    if (arrayToSearch[index].title.substr(0, inputString.length).toUpperCase() == inputString.toUpperCase()) {
        addResultElementTo(resultsDivide, arrayToSearch[index]);   
           
    }
  }
}

/** 
Takes an Object from the DOM and appends a single result child element to that HTML element object.
**/
function addResultElementTo(parent, broadcast){
    var element = document.createElement("div");
    element.innerHTML = produceBootstrapCard(broadcast.title, checkStatusOfBroadcast(broadcast), broadcast.description);
   
     element.addEventListener("click", function(event) {
           
     });
     
     parent.appendChild(element);
}

function clearResultsDivide(){
	results.innerHTML = "";
	parentOfSearchResults.removeChild(results);

}

function setParentResult(divideID){
 parentOfSearchResults = document.getElementById(divideID);
 parentOfSearchResults.appendChild(results);
}

