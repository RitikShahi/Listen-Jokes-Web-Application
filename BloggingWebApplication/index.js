import express from "express"
import bodyParser from "body-parser"
const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.post("/create",(req,res)=>{
    res.render("create.ejs",{
        check:false
    })
})
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        check:false
    })
})
var count =0;
var arr=[];
app.post("/",(req,res)=>{
    arr[count]={
        title:req.body["title"],
        content:req.body["content"],
    }
    res.render("index.ejs",{
        arr:arr,
        check:true
    })
    count+=1;
})



app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}`)
})

