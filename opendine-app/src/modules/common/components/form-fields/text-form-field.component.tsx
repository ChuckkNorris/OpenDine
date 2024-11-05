import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import { FieldValue, FieldValues, FormState, RegisterOptions, useController } from "react-hook-form";


// {...register("description", { required: true })}

export type TextFormFieldProps = {
 // errors?: any;
  control?: any;
  name: string;
  label?: string;
  rules: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined;
  // formState: FormState<FieldValues>,
}// & TextFieldProps

export const TextFormField = ({name, label, control, rules}: TextFormFieldProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <TextField
      fullWidth
      // name={restProps.name}
      variant="outlined"
    //  helperText={props.errors['description']?.message}
      onChange={field.onChange} // send value to hook form 
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value} // input value
      name={field.name} // send down the input name
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      // helperText="Please enter a description"
      // {...restProps}
      helperText={error?.message as string ?? "Enter a description"}
      error={!!error}
    />
  )
}