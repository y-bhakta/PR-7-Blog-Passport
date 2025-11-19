import mongoose from 'mongoose';
import dotenv from './config.js';

const db=async()=>{
    try {
        await mongoose.connect(dotenv.MONGODB_URI);
        console.log('Database connected successfully..');        
    } catch (error) {
        console.log(error.message);        
    }
}
export default db();