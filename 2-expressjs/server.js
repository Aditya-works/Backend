const express = require("express");

const app = express();
// addeventlistener type is like app.get(path,callback) 
app.get("/",(req,res)=>{
    console.log("hello i am server");
    res.send("okay its good to see you");
})
// middleware to parse json data from frontend
app.use(express.json());
// req has body, query, params, files etc in it.
app.post("/chullu",(req,res)=>{
    console.log(req.body);
    res.send("i got data from frontend");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})