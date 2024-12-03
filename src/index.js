const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")//ejs cna also use in place of it
const collection=require("./mongodb")
const templatePath=path.join(__dirname,'../templates')
app.use(express.static("public"));
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
//taken from signup.hbs
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    //putting info in mongodb
    await collection.insertMany([data])
    res.render("home")
})

app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({email:req.body.email})
        if(check.password===req.body.password){
            res.render("home")
        }else{
            res.send("wrong password")
        }
    }catch{
        res.send("wrong password")
    }
    
})
app.listen(3000,()=>{
    console.log("port connected");
    
})