import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { GetCabinsTable } from "../cabins/useCabinsMethods";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { data: recentBooking, isLoading: rBookingLoading } =
    useRecentBooking();
  const {
    data: recentStays,
    isLoading: rStaysLoading,
    confirmedStays,
    filterDate: numDays,
  } = useRecentStays();

  const { cabins, isLoading: cabinLoading } = GetCabinsTable();

  if (rBookingLoading || rStaysLoading || cabinLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        recentBooking={recentBooking}
        recentStays={recentStays}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <p>Sales 1</p>
      <p>Sales 1</p>
      <p>Sales 1</p>
    </StyledDashboardLayout>
  );
}
