import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function SignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: (user) => register(user),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Sign Up Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isSigningUp };
}
