import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { updateProfileApi, changePasswordApi } from "../apis/authApi";

export default function Profile() {
  const { user, refreshUser } = useAuth();

  const profileForm = useForm({ defaultValues: { fullName: user?.fullName || "" } });
  const passwordForm = useForm();

  const onUpdateProfile = async (form) => {
    try {
      const res = await updateProfileApi({ fullName: form.fullName.trim() });
      toast.success(res.message || "Profile updated");
      await refreshUser();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const onChangePassword = async (form) => {
    try {
      const res = await changePasswordApi({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success(res.message || "Password changed");
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Account Info</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user?.email}</p>

        <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="flex flex-col gap-3">
          <input
            type="text"
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
            {...profileForm.register("fullName", {
              required: "Full name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
          />
          {profileForm.formState.errors.fullName && (
            <p className="text-red-500 text-xs">{profileForm.formState.errors.fullName.message}</p>
          )}

          <button
            type="submit"
            disabled={profileForm.formState.isSubmitting}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 self-start px-4"
          >
            {profileForm.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Change Password</h2>

        <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Current Password"
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
            {...passwordForm.register("currentPassword", { required: "Current password is required" })}
          />
          {passwordForm.formState.errors.currentPassword && (
            <p className="text-red-500 text-xs">{passwordForm.formState.errors.currentPassword.message}</p>
          )}

          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-2 rounded"
            {...passwordForm.register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {passwordForm.formState.errors.newPassword && (
            <p className="text-red-500 text-xs">{passwordForm.formState.errors.newPassword.message}</p>
          )}

          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 rounded hover:bg-gray-900 disabled:bg-gray-400 self-start px-4"
          >
            {passwordForm.formState.isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
