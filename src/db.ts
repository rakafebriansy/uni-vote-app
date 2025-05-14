import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  
  //get env
  const mongoURL: string = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/voting_app';

  try {
    
    //connect to mongo
    await mongoose.connect(mongoURL);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}
