import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { HiArrowUpOnSquareStack } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const [confirmCheckBox, setConfirmCheckBox] = useState(false);
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking();
  const { checkOut, checkingOut } = useCheckOut();
  if (isLoading) return <Spinner />;

  const status = booking?.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {status === "unconfirmed" && (
        <Checkbox
          checked={booking.status === "unconfirmed"}
          id={bookingId}
          disabled={confirmCheckBox || booking.status === "unconfirmed"}
          onChange={() => setConfirmCheckBox((prev) => !prev)}
        >
          I {booking?.fullName} Confirm, I have paid the Amount
        </Checkbox>
      )}
      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            CheckIn
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquareStack />}
            onClick={() => checkOut(bookingId)}
            disabled={checkingOut}
          >
            Check Out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
