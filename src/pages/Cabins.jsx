import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setShowForm((showForm) => !showForm)}>
        Add a Cabins
      </Button>
      <Row>{showForm && <CreateCabinForm />}</Row>
    </>
  );
}

export default Cabins;
