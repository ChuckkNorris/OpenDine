import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";
import { FieldValue, FieldValues, FormState, RegisterOptions, useController } from "react-hook-form";

export type TextFormFieldProps = {
  control?: any;
  name: string;
  label?: string;
  rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined;
} & TextFieldProps

export const TextFormField = ({name, control, rules, helperText, ...restProps}: TextFormFieldProps) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules: rules ? rules : { required: restProps.required },
    defaultValue: ''
  });

  return (
    <TextField
      fullWidth
      variant="outlined"
      onChange={field.onChange} // send value to hook form 
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value} // input value
      name={field.name} // send down the input name
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      helperText={error?.message as string ?? helperText}
      error={!!error}
      {...restProps}
      required={rules?.required ? true : restProps.required}
    />
  )
}