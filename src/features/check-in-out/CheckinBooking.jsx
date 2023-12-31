import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [paidBreakfast, setPaidBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { isLoading, booking } = useBooking();
  const { checkIn, checkingIn } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const navigate = useNavigate();

  useEffect(() => setConfirmedPaid(booking?.isPaid), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakfastPrice = settings?.breakfastPrice * numNights * numGuests;

  async function handleCheckin() {
    if (paidBreakfast) {
      await checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    } else await checkIn({ bookingId, breakfast: {} });
    navigate("/");
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            onChange={() => setPaidBreakfast((brk) => !brk)}
          >
            Want to opt-in for breakfast for Amount{" "}
            {formatCurrency(breakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id={bookingId}
          checked={confirmedPaid}
          disabled={(confirmedPaid && !paidBreakfast) || checkingIn}
          onChange={() => setConfirmedPaid((confirmed) => !confirmed)}
        >
          I confirm that {guests?.fullName} has paid total Amount of{" "}
          {formatCurrency(totalPrice + breakfastPrice)}(
          {`${formatCurrency(totalPrice)}+${formatCurrency(breakfastPrice)}`})
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={
            (confirmedPaid && !paidBreakfast) || checkingIn || !paidBreakfast
          }
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
