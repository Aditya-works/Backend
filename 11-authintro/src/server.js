import app from "./app/app.js"
import {connectDB} from "./config/db.js"
// await can be put without async but only if its global.
await connectDB();

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})