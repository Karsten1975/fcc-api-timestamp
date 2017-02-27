const express = require('express');
const app = express();

app.set("view engine", "ejs");

//INDEX Page which contains the instructions
app.get('/', function(req, res){
    res.render("index");
});

//ROUTE for the API Feedback
app.get('/:inputString', function(req, res){
    var inputString = req.params.inputString;
    if (parseInt(inputString)) {
        inputString = inputString * 1000;
    }
    var inputDate = new Date(inputString);
    var output ={};
    output.unix = inputDate.getTime() / 1000;
    
    var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var monthOutput = monthArr[inputDate.getMonth()];
    var dayOutput = inputDate.getDate();
    if(dayOutput < 10){
        dayOutput = "0" + dayOutput;
    }
    
    if (!monthOutput || !dayOutput || !inputDate.getFullYear()){
        output.natural = null;
    } else {
        output.natural = monthOutput + " " + dayOutput + ', ' + inputDate.getFullYear();
    }
 
    res.json(output);
   
});
//ROUTE for any other invalid url
app.get ('*', function(req, res){
   res.send('ERROR 404 - Page does not exist'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The server has started .... YEAH!!!');
});