import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create_Update_Cabins,
  deleteCabin as deleteCabinApi,
  getCabins,
} from "../../services/apiCabins";
import toast from "react-hot-toast";

export function CreateCabinMethod() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (data) => {
      create_Update_Cabins(data);
    },
    onSuccess: () => {
      toast.success("New Cabin has created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}

export function UpdateCabinMethod() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cabinData, editId }) =>
      create_Update_Cabins(cabinData, editId),
    onSuccess: () => {
      toast.success("Cabin has updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateCabin, isUpdating };
}

export function DeleteCabinMethod() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin has been deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { isDeleting, deleteCabin };
}

export function GetCabinsTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins };
}
