let http = require("http");

let server = http.createServer((req, res) => {
    console.log("hello i am server");
    res.end("ok its good to see you");
})

server.listen(3000, ()=>{
    console.log("server is running on port 3000");
})