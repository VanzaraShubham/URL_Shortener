import mongoose from "mongoose";

const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB Connection Failed ❌", error.message);
    process.exit(1);
  }
};

export default connectedDB;