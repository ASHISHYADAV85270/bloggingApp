import express from "express";
import path from "path";
import { userRouter } from "./routes/user.js";
import { connectMongoDB } from "./connection.js";
const app = express();
const PORT = 8000;
const dblink =
  "mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority";

connectMongoDB(dblink);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("home");
});
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
