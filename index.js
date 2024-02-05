import express from "express";
import bodyParser from "body-parser";
const app= express();
const port= 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
res.render("main.ejs")
});

app.get("/Home",(req,res)=>{
    res.render("main.ejs")
})

app.get("/Login",(req,res)=>{
    res.render("login.ejs")
})
app.get("/button",(req,res)=>{
    res.render("main.ejs")
})
app.get("/service",(req,res)=>{
    res.render("service.ejs")
})
app.get("/contact",(req,res)=>{
    res.render("login.ejs")
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
});

