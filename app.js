const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  console.log("post received");

  var querry=req.body.cityName;
  var units="metric";
   var appid="ee54d431bb71981aed34664"//an api of your choice
  var url ="https://api.openweathermap.org/data/2.5/weather?q="+querry+"&units="+units+"&appid="+appid;

  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherdata=JSON.parse(data);
    const temp=weatherdata.main.temp;
    const description =weatherdata.weather[0].description;
    const icon =weatherdata.weather[0].icon;
    const url= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    console.log(temp);
    console.log(description);

    res.write("<h1>the temperature in "+querry+" is"+temp+"</h1>");
    res.write("<h1>the description is "+description+"</h1>");
    res.write("<img src="+url+" alt='pic'></img>");
    res.send();
  })

  })

})



//





app.listen(3000,function(){
  console.log("the server is at 3000");
})
