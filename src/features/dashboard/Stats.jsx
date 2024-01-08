import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineChartBar,
} from "react-icons/hi";

import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  recentBooking,
  confirmedStays,
  cabinCount,
  numDays,
}) {
  //1. No of Booking
  const numBooking = recentBooking.length;

  //2.Total Sales
  const totalSales = recentBooking.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );

  //3.No of Confirmed Booking or Check Ins
  console.log(confirmedStays);
  const confirmedCheckIns = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num checked in nights / all available nights (num days * num cabins)
  return (
    <>
      <Stat
        title="Booking"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineCash />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check Ins"
        color="yellow"
        icon={<HiOutlineCalendar />}
        value={confirmedCheckIns}
      />
      <Stat
        title="Occupancy Rate"
        color="blue"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
