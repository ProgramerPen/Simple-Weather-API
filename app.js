const { json } = require('body-parser');
const express = require ('express');
const https = require('https');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req , res){

    res.sendFile(__dirname+"/index.html");
})


app.post("/" , function(req, res){
    console.log(req.body.fav_language);
    const appid = env.process.weatherid;
    const cityname = req.body.cityIn;
    const units = req.body.uniteIn;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q="+ cityname +"&units=" + units;
    
    https.get (url, function(response){
    console.log(response.statusCode);
    response.on ("data" , function(data){
        const wthr = JSON.parse(data)
        const dscrb = wthr.weather[0].description;
        const city = wthr.name;
        const temp = wthr.main.temp;
        const icon = wthr.weather[0].icon;
        
       
        
         const aurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        const iurl ="<img src=" +aurl+ ">"
        res.write("<h1>Temperature in " + city + " is " +temp+ " Celsius, and the sky is " + dscrb +"</h1>")
        res.write(iurl)
        res.send()
    })


})

})


app.listen(3000, function(){
    console.log("3000 listening");
})