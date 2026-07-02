import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (form) => {
    try {
      const res = await login({
        email: form.email.trim(),
        password: form.password,
      });

      toast.success(res.message || "Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
