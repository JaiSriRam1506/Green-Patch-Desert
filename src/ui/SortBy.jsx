import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ sortBy = "sort", options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get(sortBy);

  const selectOption = (e) => {
    searchParams.set(sortBy, e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      selectOption={selectOption}
      active={currentSort}
    />
  );
}
