import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: (user) => loginApi(user),
    onSuccess: (user) => {
      toast.success("Login has successful"),
        navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user?.user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isLogging };
}
