import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const navigate = useNavigate();
  const { register: registerUser, googleAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

    const handleGoogleSignup = async (credentialResponse) => {
    try {
      await googleAuth(credentialResponse.credential);

      toast.success("Google Signup Successful");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google Signup Failed");
    }
  };

  const onSubmit = async (form) => {
    try {
      const res = await registerUser({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      toast.success(res.message || "Signup Successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded w-full"
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded w-full"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Creating account..." : "Signup"}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => toast.error("Google Signup Failed")}
            />
          </div>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
