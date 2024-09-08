const config = require("./config/config.json")
const express =  require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// db connection
mongoose
.connect("mongodb://127.0.0.1:27017/usermanagement")
.then(()=>console.log("connection successfully"))
.catch((err)=>console.log(err))

 
// configration
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// api routes

// user routes
app.use("/api/v1/userRoutes", require("./routes/userRoutes"));

// book routes
app.use("/api/v1/bookRoutes", require("./routes/booksRoutes"));


// server port
const port = config.PORT || 8000;
app.listen(port,()=>{
    console.log(`server is running on: ${port}`);
    
})