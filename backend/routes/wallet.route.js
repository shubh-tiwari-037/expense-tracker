import express from "express";

import { getWalletSummary } from "../controllers/wallet.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const walletRoute = express.Router();

walletRoute.get("/", auth, getWalletSummary);

export default walletRoute;
