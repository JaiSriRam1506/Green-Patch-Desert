import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  const filterDate = Number(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), filterDate).toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${filterDate}`],
  });

  const confirmedStays = data?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { data, isLoading, confirmedStays, filterDate };
}
