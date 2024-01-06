import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Logout has successful"), queryClient.removeQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logOut, isLoggingOut };
}
