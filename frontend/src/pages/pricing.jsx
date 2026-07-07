  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  export default function Pricing() {
    const navigate = useNavigate();
    const handlePayment = async (plan) => {
      try {
        // Create Order
        const { data } = await axios.post(
          "http://localhost:5000/api/payment/create-order",
          {
            name: plan.name,
          },
          {
            withCredentials: true,
          },
        );
        
console.log("API RESPONSE:", data);
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,

          amount: data.order.amount,

          currency: data.order.currency,

          name: "Expense Tracker",

          description: `${plan.name} Subscription`,

          order_id: data.order.id,

          handler: async function (response) {
            const verify = await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                ...response,
                plan,
              },
              {
                withCredentials: true,
              },
            );

            if (verify.data.success) {
              alert("Payment Successful");

              navigate("/dashboard");
            }
          },

          theme: {
            color: "#2563eb",
          },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
      } catch (error) {
        console.log(error);
      }
    };

    const plans = [
      {
        name: "Pro",
        price: "₹199",
        duration: "/month",
        button: "Choose Pro",
        color: "bg-blue-600",
        popular: true,
        features: [
          "Unlimited Transactions",
          "Advanced Analytics",
          "Expense Categories",
          "Monthly Reports",
          "Email Support",
        ],
      },
      {
        name: "Premium",
        price: "₹499",
        duration: "/month",
        button: "Choose Premium",
        color: "bg-green-600",
        features: [
          "Everything in Pro",
          "AI Expense Insights",
          "PDF & Excel Export",
          "Priority Support",
          "Future Premium Features",
        ],
      },
    ];

    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
            Choose Your Plan
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-3 mb-12">
            Unlock premium features to manage your expenses like a pro.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl bg-white dark:bg-gray-900 shadow-lg border transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-xl rounded-tr-2xl">
                    MOST POPULAR
                  </span>
                )}

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    {plan.name}
                  </h2>

                  <div className="text-center mt-6">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>

                    <span className="text-gray-500">{plan.duration}</span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-green-500 text-lg">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePayment(plan)}
                    className={`mt-10 w-full py-3 rounded-lg text-white font-semibold ${plan.color}`}
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
