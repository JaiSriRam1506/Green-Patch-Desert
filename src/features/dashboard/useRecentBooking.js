import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export default function useRecentBooking() {
  const [searchParams] = useSearchParams();

  const filterDate = Number(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), filterDate).toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${filterDate}`],
  });

  return { data, isLoading };
}
