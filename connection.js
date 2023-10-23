import mongoose from "mongoose";
async function connectMongoDB(dblink) {
  try {
    await mongoose.connect(dblink, { dbName: "BloggingApp" });
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("some error");
  }
}
export { connectMongoDB };
