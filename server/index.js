import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import reportRouter from "./routes/reportRoute.js";
import bookRoute from "./routes/bookRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/reports", reportRouter);
app.use("/api/book", bookRoute);

app.listen(3000, () => {
  console.log(`server started on ${port}`);
});
