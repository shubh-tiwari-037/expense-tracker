import express from "express";

import { auth } from "../middleware/auth.middleware.js";

import { createOrder } from "../controllers/payment.controller.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-order", auth, createOrder);

export default paymentRoute;