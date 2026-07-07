import razorpay from "../config/razorpay.js";
import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
    console.log("CREATE ORDER HIT");
    console.log(req.body);
  try {
    const { name } = req.body;

    // Decide amount from plan name
    let amount = 0;
    let features = [];

    switch (name) {
      case "Pro":
        amount = 199;
        features = [
          "Unlimited Transactions",
          "Advanced Analytics",
          "Expense Categories",
          "Monthly Reports",
          "Email Support",
        ];
        break;

      case "Premium":
        amount = 499;
        features = [
          "Everything in Pro",
          "AI Expense Insights",
          "PDF & Excel Export",
          "Priority Support",
          "Future Premium Features",
        ];
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid Plan",
        });
    }

    // Free plan doesn't need Razorpay
    if (amount === 0) {
      return res.status(200).json({
        success: true,
        free: true,
      });
    }

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
console.log(order)

const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 1);

const subscription = await Subscription.create({
  user: req.user.id,
  name,
  price: amount,
  duration: "/month",
  features,
  razorpayOrderId: order.id,
  paymentStatus: "PENDING",
  status: "ACTIVE",
  startDate: new Date(),
  endDate,
});

await User.findByIdAndUpdate(req.user.id, {
  subscription: subscription._id,
});
  return res.status(200).json({
  success: true,
  order,
  subscription,
});

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};