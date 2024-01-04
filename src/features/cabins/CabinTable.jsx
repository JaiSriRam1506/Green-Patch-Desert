import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { GetCabinsTable } from "./useCabinsMethods";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

/* const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`; */

/* const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
 */
export default function CabinTable() {
  const response = GetCabinsTable();
  const { isLoading, cabins } = response;

  const [searchParams] = useSearchParams();

  /* Using Search Params We are filtering the Cabins based on all, No Discount, With Discount */
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabin;

  if (filterValue === "all") filteredCabin = cabins;
  if (filterValue === "no-discount")
    filteredCabin = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabin = cabins?.filter((cabin) => cabin.discount > 0);

  /* Using Search Params We are sorting the Cabins */
  const sortParams = searchParams.get("sort") || "startDate-des";
  const [sortValue, sortType] = sortParams.split("-");

  const modifier = sortType === "asc" ? 1 : -1;
  filteredCabin = filteredCabin?.sort(
    (a, b) => (a[sortValue] - b[sortValue]) * modifier
  );

  /* const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  }); */

  if (isLoading) return <Spinner />;
  /* return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  ); */

  /* Using Compound Table i.e reusable Table we will implement the above one */
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          data={filteredCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
