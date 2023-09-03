var express = require("express");
const dotenv = require('dotenv');

var app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 3000;


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

  

  
mongoose.connect('mongodb+srv://aman:21632AMAN@cluster0.jrfj4bn.mongodb.net/mernstck?retryWrites=true&w=majority').then(()=>{
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
    
    var date = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    
    date = date.split(",");
    
    date = date[0];
    date=date.split("/");

    const d = date[0];
    const m = date[1];
    const y= date[2];

    const get_all = await todays.find({});
    var easy=[];
    var med=[];
    var hard=[];
    
    for(var i=get_all.length-1;i>=0 && i>=get_all.length-6;i--){
        if(get_all[i].scoreBot===0)
            break;
            if(get_all[i].easy.length>0){
                for(var j=0;j<get_all[i].easy.length;j++){
                    if(get_all[i].easy[j]!="")
                    easy.push(get_all[i].easy[j]);
                }
            }
            if(get_all[i].medium.length>0){
                for(var j=0;j<get_all[i].medium.length;j++){
                    if(get_all[i].medium[j]!="")
                    med.push(get_all[i].medium[j]);
                }
            }
            if(get_all[i].hard.length>0){
                for(var j=0;j<get_all[i].hard.length;j++){
                    if(get_all[i].hard[j]!="")
                    hard.push(get_all[i].hard[j]);
                }
            }
        
        // if(get_all[i].medium.length>0)
        // med.push(get_all[i].medium);
        // if(get_all[i].hard.length>0)
        // hard.push(get_all[i].hard);

    }
    console.log(hard.length);

    res.render(path.join(__dirname, "/test.ejs"),{easy:easy,medium:med,hard:hard});


    // if(date.getDay()==7){

    // }else{
    //     res.render(path.join(__dirname, "/error.ejs"));
    // }



    //res.render(path.join(__dirname, "/home.ejs"),{d:d,m:m,y:y});
});



app.post("/submit_test", async (req,res)=>{

    var date = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    
    date = date.split(",");
    
    date = date[0];
    date=date.split("/");

    const d = date[0];
    const m = date[1];
    const y= date[2];
  
        var diff = req.body.ans;

        
        const dd = d+"-"+m+"-"+y;
        const today_data = new todays({date:dd,scoreBot:0,self:-1*diff,easy:[],medium:[],hard:[]});

        today_data.save().then(() => {
            //res.status(201).json({ message: "registered !! " });
        }).catch((err)=>console.log(err));

    
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
    

   //return res.render(path.join(__dirname, "/graph.ejs"),{dates:dd,scb_arr:scb_arr,scs_arr:scs_arr});
});



app.get("/", async (req, res) => {
    
    var date = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    
    date = date.split(",");
    
    date = date[0];
    date=date.split("/");

    const d = date[0];
    const m = date[1];
    const y= date[2];
    



    res.render(path.join(__dirname, "/home.ejs"),{d:d,m:m,y:y});
});


app.post("/submit", async (req,res)=>{

    var date = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    
    date = date.split(",");
    
    date = date[0];
    date=date.split("/");

    const d = date[0];
    const m = date[1];
    const y= date[2];
    const dd = d+"-"+m+"-"+y;

    var easylinks = "a,b";
    var mediumlinks = "a,b";
    var hardlinks = "a,b";
    
    

    const easyarray = easylinks.split(",");
    const mediumarray = mediumlinks.split(",");
    const hardarray = hardlinks.split(",");
    



    const scb = req.body.scb;
    const scs = req.body.scs;

    const today_data = new todays({date:dd,scoreBot:scb,self:scs,easy:easyarray,medium:mediumarray,hard:hardarray});
   //console.log(dd);
   //console.log(today_data);
    const get_it = await todays.find({date:dd});
    //console.log(get_it.length);
    if(get_it.length === 0){
        await  today_data.save().then(() => {
            console.log("done");
          }).catch((err)=>console.log(err));
         
    }else{
        await deleteOne({date:dd}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    
  });
        await  today_data.save().then(() => {
            console.log("done");
          }).catch((err)=>console.log(err));
        
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





app.listen(PORT, () => {
    console.log("Server listening on port " + `${PORT}`);
});
