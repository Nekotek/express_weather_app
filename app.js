const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/res", function(req, res) {
  let cityGot = req.body.city;
  const apiKey = "nope";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityGot + "&appid=" + apiKey + "&units=metric";
  https.get(url, function(getRes) {
    console.log(getRes.statusCode);
    getRes.on("data", function(data) {
      const weatherData = JSON.parse(data);
      let cityName = weatherData.name;
      let temp = weatherData.main.temp;
      let weatherType = weatherData.weather[0].description;
      let weatherTypeIcon = weatherData.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + weatherTypeIcon + "@2x.png";
      res.write("<h1>Temperatura w " + cityName + " wynosi " + temp + " stopni celsjusza</h1>");
      res.write("<h3>Sytuacja wyglada jak " + weatherType + "</h3>");
      res.write("<img src=" + iconURL + " alt=" + weatherType + ">")
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("App is running on port 3000;");
})
