const mongoose=require('mongoose')
const Schema=mongoose.Schema

const zoneSchema= new Schema({
   name:String,
   numberOfParkingSpaces:Number,
   remainingParkingSpaces:Number,
   latitude:String,
   longitude:String,
   shortAddress:String,
   ownerAddress:String,
   rate:Number
})


module.exports=mongoose.model('Zone',zoneSchema)