import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookingTable() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
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
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  /* Prefetch Data */
  const totalPage = Math.ceil(count / import.meta.env.VITE_PAGE_SIZE);

  if (page < totalPage)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { error, isLoading, bookings, count };
}
