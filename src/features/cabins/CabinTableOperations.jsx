import TableOperation from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
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
    </TableOperation>
  );
}
