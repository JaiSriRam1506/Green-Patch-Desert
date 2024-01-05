import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookingTable() {
  const [searchParams] = useSearchParams();
  const filterParams = searchParams.get("status");
  const [column, type] = (searchParams.get("sort") || "startDate-asc").split(
    "-"
  );

  /* Pagination */
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  /* Prepare Filter Condition */
  const filter =
    !filterParams || filterParams === "all"
      ? null
      : {
          field: "status",
          value: filterParams,
          method: "eq",
        };

  /* Prepare SortCondition */
  const sortBy = {
    column,
    type,
  };

  /* Query */
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { error, isLoading, bookings, count };
}
