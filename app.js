var express = require("express");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let today = new Schema({
    date:{
      type: String
    },
    scoreBot:{
        type: Number
    }
    ,
    self:{
        type: Number
    }
    ,
    easy:[{
     
        type:String
      
    }],
    medium:[{
       
          type:String
       
      }],
      hard:[{
       
          type:String
    
      }],
  });

  DATABASE='mongodb+srv://UserName:Password@cluster0.jrfj4bn.mongodb.net/mernstck?retryWrites=true&w=majority'

  
mongoose.connect(DATABASE).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("not connected to database");
});

const todays = mongoose.model("todays", today);


app.get("/a", async (req, res) => {
    const data = await todays.find({});
    const size = data.length;
    var dates=[];
    var scb_arr=[];
    var scs_arr=[];
    for(var i =0;i<size;i++){
        dates.push(data[i].date);
        dates.push("@");
        scb_arr.push(data[i].scoreBot);
        scb_arr.push("@");
        scs_arr.push(data[i].self);
        scs_arr.push("@");

    }
    //console.log(data);
    //console.log(size);





    res.render(path.join(__dirname, "/graph.ejs"),{dates:dates,scb_arr:scb_arr,scs_arr:scs_arr});
    
});


app.get("/b", async (req, res) => {
    const data = await todays.find({});
    const size = data.length;
    var dates=[];
    var scb_arr=[];
    var scs_arr=[];
    for(var i =0;i<size;i++){
        dates.push(data[i].date);
        dates.push("@");
        scb_arr.push(data[i].scoreBot);
        scb_arr.push("@");
        scs_arr.push(data[i].self);
        scs_arr.push("@");

    }
    //console.log(data);
    //console.log(size);





    res.render(path.join(__dirname, "/graph2.ejs"),{dates:dates,scb_arr:scb_arr,scs_arr:scs_arr});
    
});



app.get("/test", async (req, res) => {
    
    const date = new Date();
    //console.log();
    const d = date.getDate();
    const m = date.getMonth()+1;
    const y= date.getFullYear();

    const get_all = await todays.find({});
    var easy = [];
    var med=[];
    var hard=[];
    for(var i=get_all.length-1;i>=0 && i>=get_all.length-6;i--){
        if(get_all[i].scoreBot===0)
            break;
        easy.push(get_all[i].easy);
        med.push(get_all[i].medium);
        hard.push(get_all[i].hard);

    }
    //console.log(easy);

    res.render(path.join(__dirname, "/test.ejs"),{easy:easy,medium:med,hard:hard});


    // if(date.getDay()==7){

    // }else{
    //     res.render(path.join(__dirname, "/error.ejs"));
    // }



    //res.render(path.join(__dirname, "/home.ejs"),{d:d,m:m,y:y});
});



app.post("/submit_test", async (req,res)=>{

    const date = new Date();
    if(date.getDay()===7){
        var diff = req.body.ans;

        const d = date.getDate();
        const m = date.getMonth()+1;
        const y= date.getFullYear();
        const dd = d+"-"+m+"-"+y;
        const today_data = new todays({date:dd,scoreBot:66,self:-1*diff,easy:[],medium:[],hard:[]});

        today_data.save().then(() => {
            //res.status(201).json({ message: "registered !! " });
        }).catch((err)=>console.log(err));

    }else{
        res.render(path.join(__dirname, "/error.ejs"));
    }



   // res.render(path.join(__dirname, "/graph.ejs"),{dates:dates,scb_arr:scb_arr,scs_arr:scs_arr});
});



app.get("/", async (req, res) => {
    
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth()+1;
    const y= date.getFullYear();
    



    res.render(path.join(__dirname, "/home.ejs"),{d:d,m:m,y:y});
});


app.post("/submit", async (req,res)=>{

    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth()+1;
    const y= date.getFullYear();

    const dd = d+"-"+m+"-"+y;

    var easylinks = req.body.easylinks;
    var mediumlinks = req.body.mediumlinks;
    var hardlinks = req.body.hardlinks;
    

    const easyarray = easylinks.split(",");
    const mediumarray = mediumlinks.split(",");
    const hardarray = hardlinks.split(",");
    



    const scb = req.body.scb;
    const scs = req.body.scs;

    const today_data = new todays({date:dd,scoreBot:scb,self:scs,easy:easyarray,medium:mediumarray,hard:hardarray});
   const get_it = await todays.find({date:dd});
   if(!get_it){
    today_data.save().then(() => {
        //res.status(201).json({ message: "registered !! " });
    }).catch((err)=>console.log(err));
    //res.render(path.join(__dirname, "/graph.ejs"),{dates:dates,scb_arr:scb_arr,scs_arr:scs_arr});
   }
    

    
    const data = await todays.find({});
    const size = data.length;
    var dates=[];
    var scb_arr=[];
    var scs_arr=[];
    for(var i =0;i<size;i++){
        dates.push(data[i].date);
        dates.push("@");
        scb_arr.push(data[i].scoreBot);
        scb_arr.push("@");
        scs_arr.push(data[i].self);
        scs_arr.push("@");

    }
    //console.log(data);
    //console.log(size);





    res.render(path.join(__dirname, "/graph.ejs"),{dates:dates,scb_arr:scb_arr,scs_arr:scs_arr});
});







app.listen(3000, () => {
    console.log("Server listening on port " + " 3000");
});