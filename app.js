const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


let query = "Lahore";
let unit = "metric";
let keyId = "d299d8b516decc2ff566db3376a86607";

let url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  query +
  "&units=" +
  unit +
  "&appid=" +
  keyId;


  function updateUrl(city,unit){
    query=city;

   url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  query +
  "&units=" +
  unit +
  "&appid=" +
  keyId;
    
  }


  function getUrl(res){
    https.get(url, function (response) {
            console.log("This is response", response.statusCode);
      
            if (response.statusCode == 200) {
              response.on("data", function (data) {
                const weatherData = JSON.parse(data);
      
                const weatherDescription = weatherData.weather[0].description;
                const iconValue = weatherData.weather[0].icon;

                const icon = "http://openweathermap.org/img/wn/"+iconValue+"@2x.png";
      
                res.write(
                  "<h1> The weather description is : " + weatherDescription + " </h1>"
                );
                res.write(
                  "<h2> and temperature is : " + weatherData.main.temp + "</h2>"
                );
      
                res.write("<p>The icon: </p><img src= " + icon + ">");
                res.end()
              });
            } else {
              res.send("Error");
            }
          });
      
  }

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    console.log("app.post :",req.body.city)
    console.log("app.post :",req.body.temp)
   
    let cityQuery=req.body.city;
    let unitQuery=req.body.temp;
     
    //query=req.body.city;
    updateUrl(cityQuery,unitQuery)
    getUrl(res)

});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
