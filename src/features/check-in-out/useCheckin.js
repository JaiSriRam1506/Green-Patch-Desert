import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate: checkIn, isLoading: checkingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Checked In for #${data.id} has been successful`);
      /* queryClient.invalidateQueries({
        queryKey: ["booking"],
      }); */
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { checkIn, checkingIn };
}
