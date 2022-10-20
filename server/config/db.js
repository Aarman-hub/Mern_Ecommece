import mongoose from "mongoose";


const connectDB = async () =>{
    const db = process.env.MONGO_URI;
    try {
        mongoose.connect(db, {useNewUrlParser:true});
        console.log('Server Connected!')
    } catch (err) {
        process.exit();
    }
}

export default connectDB;