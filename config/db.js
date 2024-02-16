const mongoose= require('mongoose')
mongoose.set('strictQuery',false)

const connectDB=async ()=>{
    try{ 
        const conn= await mongoose.connect(process.env.URI);
        console.log (`DB connected now`);

    }catch(error){
        console.log(error)
    }  
}

module.exports=connectDB ;