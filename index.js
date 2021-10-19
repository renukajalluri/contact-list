const express=require("express");
const path = require('path');
const bp = require("body-parser");

const app = express();
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("assets"));

//middleware1
// app.use((req,res,next)=>{
//     console.log("middleware1 is called");
//     next();
// });

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));

const contactList = [
   
]

console.log(contactList);
app.get("/",(req,res)=>{
   res.render("home",{title:"contacts list",
                      contact_list :contactList,exist:"no"});
});
app.get("/practice",(req,res)=>{
     res.render("practice",{title:"its not me"})
});

app.post("/",(req,res)=>{
   console.log(req.body);
   let phone=(req.body.phone)
   console.log(contactList);
   let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
   console.log(contactIndex);
   if( contactIndex>=0){
      res.render("home",{title:"contacts list",
                      contact_list :contactList,exist:"yes"});
         }
   else{
         contactList.push(req.body);
         console.log(contactList);
         res.redirect("/")
      }
});

app.get("/d/",(req,res)=>{
   console.log(req.query);
  let phone=(req.query.phone)

   let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
   if( contactIndex){
         contactList.splice(contactIndex,1);
         // res.redirect("/");
   }
   
      res.redirect("/");
   
   
  
});




app.listen(3000,(error)=>{
   if(error){console.log("There is an error",error)}
   else{console.log("listening on port 3000")}
});