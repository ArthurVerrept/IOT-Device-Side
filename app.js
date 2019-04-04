//requiring necessary npm packages
var five = require("johnny-five");
var board = new five.Board();
const axios = require("axios");


//once board is on do this 
board.on("ready", function() {
  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  // sets the minimum change threshold to 1 to pick up every sound
  var sensor = new five.Sensor({pin: "A0", threshold: 1});
	
  //sets count of 0
  var count = 0;
  //sets pastMin and currentMin value to be equal
  var pastMin = new Date().getMinutes();
  var currentMin = new Date().getMinutes();
  
  //every time the sensor value changes, log the value
  sensor.on("change", function(value) {
	  //once a change happens, reset current min 
	  currentMin = new Date().getMinutes();
	  //check if currentmin is not equal to past min the change happened
	  //check if seconds are zero in which case send as long as
	  //count is greater than 50, this stops axios posting 8 times in one second
	  if (currentMin != pastMin || new Date().getSeconds == 0 && count > 50)
	  {	
	    //create d date object
	    d = new Date();
	    //post through axios
	      axios.post('https://enigmatic-taiga-10166.herokuapp.com/addData', {
	      //send current count, date as object, and each aspect of date time in seperate`
	      count: count,
	      dateTime: d,
	      hour: new Date().getHours(),
	      minute: new Date().getMinutes(),
	      second: 0,
	      day: new Date().getDate(),
	      month: new Date().getMonth(),
	      year: new Date().getFullYear()
	    });
	  //after post request is made reset count and start new 
	  count = 1;
	  pastMin = new Date().getMinutes();
	  console.log("post successful")
	  }
	  //add 1 to count
	  else
	  {
		  count++;
	  }  
  });
});
