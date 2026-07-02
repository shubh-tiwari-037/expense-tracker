import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllUsersApi, deleteUserApi } from "../../apis/adminApi";

export default function AdminUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: getAllUsersApi,
  });

  const { mutate: removeUser, isPending } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: (res) => {
      toast.success(res.message || "User deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to delete user"),
  });

  const users = data?.users || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load users</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow divide-y dark:divide-gray-800">
          {users.map((u) => (
            <div key={u._id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{u.fullName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {u.email} · {u.role}
                </p>
              </div>
              <button
                onClick={() => removeUser(u._id)}
                disabled={isPending}
                className="text-sm text-red-500 hover:underline disabled:text-gray-400"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
