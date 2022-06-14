const express = require ('express')
const https= require('https')

const app=express()

let url= "https://api.openweathermap.org/data/2.5/weather?q=Lahore&units=metric&appid=d299d8b516decc2ff566db3376a86607" 

app.get('/',function(req,res){

    https.get(url,function(response){
        console.log("This is response",response.statusCode)
        
      
        if(response.statusCode == 200 ){
            
            response.on('data',function(data){
            const weatherData = JSON.parse(data)

            const weatherDescription = weatherData.weather[0].description
            
            const icon = 'http://openweathermap.org/img/wn/50d@2x.png'
            


            res.write("<h1> The weather description is : " + weatherDescription + " </h1>")
            res.write("<h2> and temperature is : "+ weatherData.main.temp+ "</h2>" )
            
            res.write("<p>The icon: </p><img src= "+icon +">")
        
        })
        }

        
    })
 
})





app.listen(3000,function(){
    console.log("server is running on port 3000")
} )      