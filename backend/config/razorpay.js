import Razorpay from "razorpay";

console.log("KEY ID LENGTH:", process.env.RAZORPAY_KEY_ID?.length);
console.log("KEY SECRET LENGTH:", process.env.RAZORPAY_KEY_SECRET?.length);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;