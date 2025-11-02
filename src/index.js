
import connectDB  from './db/index.js';
import dotenv from 'dotenv';
import app from './app.js';

connectDB()
.then(()=>{
     app.on("error" , (error)=>{
          console.log('Error starting the server', error);
          throw error; 

     })
     app.listen(process.env.port||8000 , ()=>{
          console.log(`Server is running on port ${process.env.port||8000}`);

     })
})
.catch(
     (error)=>{
          console.log("Error in the database connection " , error);
     }
)


dotenv.config({
     path:'./env'
});

// import express from 'express';
// const app = express();
// ( async ()=>{ 
//     try{
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//         app.on('error',(error)=>{
//             console.log('Error starting the server', error);
//             throw error;
//         })
//         app.listen(process.env.port , ()=>{
//             console.log(`Server is running on port ${process.env.port}`);
//         })
//     }catch(error){
//         console.log('Error connecting to the database', error);

//     }
// })();

