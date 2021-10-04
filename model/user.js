const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
   name:({
       type:String,

   }),
   email:({
       type:String,
       required:true,
       minlength:5,
       maxlength:200,
   }),
   password:({
       type:String,
       required:true,
       minlength:5,
       maxlength:200,
   }),

})
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
    return token
}

const User=mongoose.model("User",userSchema)

module.exports=User