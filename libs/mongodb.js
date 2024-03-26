import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
    const connectionString = `mongodb+srv://integrationninjas:${password}@test.vjuinp4.mongodb.net/?retryWrites=true&w=majority`; // clustore url
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
