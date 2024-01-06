import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCheckedOutBooking } =
    useMutation({
      mutationFn: (bookingId) => deleteBooking(bookingId),
      onSuccess: () => {
        toast.success("Booking has been deleted");
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });

  return { isDeleting, deleteCheckedOutBooking };
}
