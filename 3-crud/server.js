const express = require("express");

const app = express();
const port = 3000;
// use is used to put middlewares.
let users = [];
app.use(express.json());
//get = read
app.get("/",(req,res)=>{
    res.send(users);
});
// req has query, files/file, params, body etc.
app.post("/create",(req,res)=>{
    let user = req.body;
    users.push(user);
    res.send("users saved successfully");
})
// params have an object with key value pair of the params passed in the url.
app.delete("/delete/:id",(req,res)=>{
    let {id} = req.params;
    let usersData = users.filter((val)=> val.id != id);
    users = usersData;
    res.send("user deleted successfully");
})
//let {id} = req.params; this creates a variable id and also extracts the propert id from existing object by destructuring.
app.put("/update/:id",(req,res)=>{
    let {id} = req.params;
    let {name} = req.body;
    let updatedUser = users.map((val)=>
        val.id == id? {...val, name: name}: val
    )
    users = updatedUser;
    res.send(users);
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})