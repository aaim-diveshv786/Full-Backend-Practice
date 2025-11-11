import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import jwt from 'jsonwebtoken';
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";

export const verifyJWT = asyncHandler(async(req , res , next)=>{
    try{const token = req.cookies?.accessToken || req.header("Authoriztion")?.replace("Bearer" , "")

    if(!token){
        throw new ApiError(401 , 'Access token is required');
    }

    const decodedToken =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select('-password -refreshToken');

    if(!user){
        throw new ApiError(401 , 'Invalid access token1');
    }

    req.user = user;
    next();
}catch(error){
        console.log("error is" , error);

    throw new ApiError(401 , 'Invalid access token2');
}

})