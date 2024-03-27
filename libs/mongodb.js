import mongoose from "mongoose";

let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
    const connectionString = `mongodb+srv://integrationninjas:${password}@test.vjuinp4.mongodb.net/?retryWrites=true&w=majority`; // clustore url
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;