import mongoose from 'mongoose';
import { MONGO_URI } from '$env/static/private';
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI as string,{
      dbName:"users"
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Could not connect to the database');
  }
};

export default connectDB;
