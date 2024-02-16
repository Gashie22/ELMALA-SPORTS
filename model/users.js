const mongoose=require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    CompanyName :{type : String,required:true},
    Representative :{type : String,required:true},
    CallorMeeting :{type : String,required:true},
    Details :{type : String,required:true}, 
    Telephone :{type : String,required:true},
    Email :{type : String,required:true},
    Status :{type : String,required:true},
    NeworExisting :{type : String},
    Currency :{type : String},
    Date : {type:Date , default: Date.now() }  
},{
    timestamps:true ,
}) 

module.exports=mongoose.model('Userdata',userSchema)