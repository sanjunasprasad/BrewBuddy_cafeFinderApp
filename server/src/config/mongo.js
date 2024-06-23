import mongoose, { mongo } from 'mongoose';

const connectDB = async() =>{
    try{
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect("mongodb+srv://sanjuna:sanju@cluster0.y3z5x9b.mongodb.net/BrewBuddy?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Database Connected');
    }catch(err){
        console.log(err);
    }
}

export default connectDB;

