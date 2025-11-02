import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        lowercase:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,
        default:'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png',
        required:true,

    },
    coverImage:{
        type:String,
    },
    watchHistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
    }
],
password:{
    type:String,
    required:[true,'Password is required'],

},
refreshToken:{
    type:String,
}


},{timestamps:true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);

}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
       { _id:this._id,
        username:this.username,
        email:this.email,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIREY,
    }
    )
    
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
       { _id:this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIREY,
    }
    )
    
}                                                                      
export const User = mongoose.model({"User":userSchema});
