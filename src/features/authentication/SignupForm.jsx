import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const { signUp, isSigningUp } = useSignUp();

  const onSubmit = (user) => {
    // e.preventDefault();
    signUp(user, {
      onSettled: () => reset(),
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {
            required: "This field can't be empty",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field can't be empty",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field can't be empty",
            minLength: {
              value: 8,
              message: "Password must be at least 8 Character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field can't be empty",
            validate: (value) =>
              value === getValues().password || "Password don't match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
