import express from "express";
import cors from "cors";
import morgan from "morgan";


import userRoute from "./routes/user.route.js";
import transactionRoute from "./routes/transaction.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USER API ENDPOINT

app.use("/api/v1/users", userRoute);
app.use("/api/v1/transaction", transactionRoute);
// app.use(morgan("dev"));

export default app;