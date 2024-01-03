import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import { CreateCabinMethod, UpdateCabinMethod } from "./useCabinsMethods";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ updateCabinData = {}, onCloseModal }) {
  const { id: editId, ...cabinData } = updateCabinData;
  const isEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? cabinData : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = CreateCabinMethod();
  const { isUpdating, updateCabin } = UpdateCabinMethod();

  // Moved the below code into useCabinMethods.js file

  // const queryClient = useQueryClient();

  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: (data) => {
  //     create_Update_Cabins(data);
  //   },
  //   onSuccess: () => {
  //     toast.success("New Cabin has created");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     reset();
  //   },
  //   onError: (error) => {
  //     // console.log(error);
  //     toast.error(error.message);
  //   },
  // });

  // const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
  //   mutationFn: ({ cabinData, editId }) =>
  //     create_Update_Cabins(cabinData, editId),
  //   onSuccess: () => {
  //     toast.success("Cabin has updated");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     reset();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const onSubmit = (data) => {
    if (editId !== undefined) {
      let cabinData =
        typeof data.image === "string"
          ? data
          : { ...data, image: data.image[0] };
      updateCabin(
        { cabinData, editId },
        {
          onSuccess: (data) => {
            //console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            //console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };
  const isWorking = isCreating || isUpdating;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be at-least 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Regular Price should be at-least 1",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            //   validate: (value) =>
            //     getValues().regularPrice <= value ||
            //     "Discount should be less than Regular Price",
            //
          })}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors?.description?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEdit ? false : "This Field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors?.image?.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEdit ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
