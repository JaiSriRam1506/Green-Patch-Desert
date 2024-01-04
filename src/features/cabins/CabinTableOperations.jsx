import TableOperation from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
export default function CabinTableOperations() {
  return (
    <TableOperation>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />
      <SortBy
        sortBy="sort"
        options={[
          { label: "Sort By Name(A-Z)", value: "name-asc" },
          { label: "Sort By Name(Z-A)", value: "name-des" },
          { label: "Sort By Price(Low-High)", value: "regularPrice-asc" },
          { label: "Sort By Price(High-Low)", value: "regularPrice-des" },
          { label: "Sort By Capacity(Low-High)", value: "maxCapacity-asc" },
          { label: "Sort By Capacity(High-Low)", value: "maxCapacity-des" },
        ]}
      />
    </TableOperation>
  );
}
