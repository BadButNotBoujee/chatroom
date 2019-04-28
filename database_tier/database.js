
const postGresAPI = require('pg');

const pool = new postGresAPI.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

var exports = module.exports;


exports.verifyUser = function(username, key){
 return true;
};



function makeParameterizedQuery(query, parameters, functionToUse){
 pool.connect(function(error, client, done){
	 if(error){
	 	processError(error);
	 }else{
	 	client.query(query, parameters, function (error, result) {
	 		if(error){
	 			processError(error);
	 		}else {
	 			functionToUse(result);
	 		}
	 	}); 
	 }
 })
}


function processError(error){


}


function testDatabaseConnection() {
	
}


function getAllCurrentBroadcasts(functionToCall){
	 database.makeAParameterizedQueryUsingPool('SELECT * FROM Broadcast;',[], function(result){
	 	functionToCall(result);
	 });
}

function addNewBroadcast(channelName, description, functionToCall){
	const text = 'INSERT INTO Broadcast (URLExtention, Title, Description, Status) VALUES($1, $1, $2, $3)';
	const values = [channelName, description,'UNDEFINED'];

   database.makeAParameterizedQueryUsingPool(text, values, function(result){
	 	functionToCall(result);
	 });
}
