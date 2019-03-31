var five = require("johnny-five");
var board = new five.Board();
const axios = require("axios");



board.on("ready", function() {
  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var sensor = new five.Sensor({pin: "A0", threshold: 1});
	
  //sets count of 0
  //sets pastMin and currentMin value to be equal
  var count = 0;
  var pastMin = new Date().getMinutes();
  var currentMin = new Date().getMinutes();
  
  // When the sensor value changes, log the value
  sensor.on("change", function(value) {
	  //once a change happens, reset current min 
	  currentMin = new Date().getMinutes();
	  //check if currentmin is not equal to before the change happened
	  if (new Date().getSeconds() == 0)
	  {	
		 //var send = count;
		 axios.post('https://enigmatic-taiga-10166.herokuapp.com/addData', {
			 count: count,
			 date: myDate()
		 });
		 //if they are not equal a post request must be made sending the total for prev minute
		 //after post request is made reset count and start new 
		  count = 1;
		  pastMin = new Date().getMinutes();
	  }
	  else
	  {
		  count++;
	  }  
	//value = (value * 100) - 50000;
	console.log(count, currentMin, pastMin, new Date().getSeconds());
  });
});


function myDate(){

	var d = new Date().getDate();
	var m = new Date().getMonth();
	var y = new Date().getFullYear();
	
	var h = new Date().getHours();
	var min = new Date().getMinutes();
	var s = new Date().getSeconds();
	
	m+= 1;
	var n =  d + ":" + m + ":" + y + "  " + h + ":" + min +":"+ s;
	n.toString();
	return n;

}
