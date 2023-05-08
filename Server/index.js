require('dotenv').config({ path: '.env' })
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const cors=require('cors')
const mongoose= require('mongoose')
const bodyParser=require('body-parser')
const User=require("./models/user")
const Zone=require("./models/zone")
const passport=require('passport')
const session=require('express-session')
const passportLocal=require('passport-local')

// import { Configuration, OpenAIApi } from 'openai';





mongoose.connect("mongodb+srv://laukik2210:XOp0u5I4G4sODa1K@cluster0.jfqmg.mongodb.net/UserDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MONGO CONNECTION OPEN!!")
})
.catch(err=>{
    console.log(err)
})

const db= mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})

const app=express();

app.use(bodyParser.json())
app.use(cors())
const sessionConfig={
    name:'nigga',
    secret:'nicesecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
const users={};


app.post('/register',async(req,res)=>{
    try{
    const {username,password,plateNumber} = req.body
    
    const user = new User({username,
        plateNumber
    })
    // console.log(password)
    
    const registeredUser = await User.register(user, password)
    // user.save()
    // const user = new User({username});
    // await user.setPassword(password);
    // await user.save();
    req.login(registeredUser,err=>{
        if (err){
            console.log(err)
        }
    console.log("registered")
    res.status(201).send(registeredUser)
    })
    }catch(e){
        res.status(401).send(e)
    }
    
})
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),async(req,res)=>{
   
    // const {username,password}=req.body
    
    // const user=new User({username})
    // // console.log(password)
    
    // const registeredUser=await User.register(user,password)
    // // user.save()
    // // const user = new User({username});
    // // await user.setPassword(password);
    // // await user.save();
    console.log("logged in")
    res.status(201).send({user:req.user})
})
app.get('/allZones',async(req,res)=>{
    const allZones=await Zone.find({})
    res.status(200).json({result:allZones})
})








app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { console.log(err); }
    });
    console.log("logged out");
    res.status(200);
});
app.post("/updateZone", async(req, res)=>{
    const {zoneId}=req.body
    const zone=await Zone.findById(zoneId);
    zone.remainingParkingSpaces--;
    await zone.save()
    console.log("logged out");
    res.status(204);
});
app.post("/createZones",async(req,res)=>{
    await Zone.deleteMany({})
    const parkingSpaces = [
        {
          name: 'Parking Zone A',
        //   coordinates:[19.2032676,72.8828754],
          latitude:19.2032676,
          longitude:72.8828754,
          numberOfParkingSpaces:100,
          remainingParkingSpaces:100,
          shortAddress:"Thane",
          ownerAddress:"0xc28509EFAa8A7CD1369cEDc0a1140f6F1Fa8f46D",
          rate:0.0024
        },
        {
            name: 'Parking Zone B',
            // coordinates:[19.1917083,72.9379975],
            latitude:19.1917083,
            longitude:72.9379975,
            numberOfParkingSpaces:100,
            shortAddress:"Thane",
          remainingParkingSpaces:100,
            ownerAddress:"0x96F24D8eB318e96bda639e8098abD64d6976A287",
            rate:0.0013
        },
        {
            name: 'Parking Zone C',
    
            // coordinates:[19.1917083,72.9379975],
            latitude:20.1917083,
            longitude:72.9379975,
            numberOfParkingSpaces:100,
            shortAddress:"Thane",
          remainingParkingSpaces:100,
            ownerAddress:"0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64",
            rate:0.0034
        },
        {
            name: 'Parking Zone D',
    
            // coordinates:[19.1917083,72.9379975],
            latitude:21.1917083,
            longitude:71.9379975,
            numberOfParkingSpaces:100,
            shortAddress:"Thane",
          remainingParkingSpaces:100,
            ownerAddress:"0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64",
            rate:0.0065
        },
        {
            name: 'Parking Zone E',
    
            // coordinates:[19.1917083,72.9379975],
            latitude:21.1317083,
            longitude:69.9379975,
            numberOfParkingSpaces:100,
            shortAddress:"Thane",
          remainingParkingSpaces:100,
            ownerAddress:"0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64",
            rate:0.0043
        },
        {
            name: 'Parking Zone G',
    
            // coordinates:[19.1917083,72.9379975],
            latitude:19.6032676,
          longitude:72.7828754,
            numberOfParkingSpaces:100,
            shortAddress:"Thane",
          remainingParkingSpaces:100,
            ownerAddress:"0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64",
            rate:0.0045
        },
        {
            name: 'Parking Zone F',
    
            // coordinates:[19.1917083,72.9379975],
            latitude:19.1032676,
          longitude:72.0828754,
            numberOfParkingSpaces:100,
            shortAddress:"Thane",
          remainingParkingSpaces:100,
            ownerAddress:"0x5a9C2547088D1F82e17B56B4f2dCdE86856ECe64",
            rate:0.0089
        }
    ]
    await Zone.insertMany(parkingSpaces)
    res.status(200).send({
        success:true
    });
})
app.listen(4000,()=>{
    console.log('Listening on 4000')
})