const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/loginsignup")
.then(()=>{
    console.log("mongodb connected");
    
}).catch(()=>{
    console.log("failed to connect");
    
})
//creating schema
const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("collection1",LogInSchema)
module.exports=collection