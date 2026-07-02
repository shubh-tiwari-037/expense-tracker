import express from "express";
import cors from "cors";
// import morgan from "morgan";

import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import transactionRoute from "./routes/transaction.route.js";
import walletRoute from "./routes/wallet.route.js";
import adminRoute from "./routes/admin.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
const app = express();


const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ENDPOINTS

app.use("/api/auth", userRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/wallet", walletRoute);
app.use("/api/admin", adminRoute);
// app.use(morgan("dev"));

app.use(notFound);
app.use(errorHandler);

export default app;