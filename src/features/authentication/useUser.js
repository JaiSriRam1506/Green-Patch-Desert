import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export default function useUser() {
  const response = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const { data: user, isLoading } = response;
  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
