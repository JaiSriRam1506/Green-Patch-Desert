import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { HiDuplicate, HiPencil, HiTrash } from "react-icons/hi";
import { CreateCabinMethod, DeleteCabinMethod } from "./useCabinsMethods";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;
  // const queryClient = useQueryClient();
  // const { isLoading: isDeleting, mutate } = useMutation({
  //   mutationFn: deleteCabin,
  //   onSuccess: () => {
  //     toast.success("Cabin has been deleted");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  const { isDeleting, deleteCabin } = DeleteCabinMethod();
  const { isCreating, createCabin } = CreateCabinMethod();

  const handleDuplicate = async () => {
    const data = {
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    };
    console.log(data);
    await createCabin(data, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {/* Check if Discount is Available or not */}
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <button onClick={handleDuplicate}>
          <HiDuplicate />
        </button>
        {/* Converting all the Below Component into Compound Component which is already created */}
        <Modal>
          {/* This is for opening form for Editing the cabins details */}
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm updateCabinData={cabin} />
          </Modal.Window>
          {/* This is for Deleting the Cabins with Confirm Window Button */}
          <Modal.Open>
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
