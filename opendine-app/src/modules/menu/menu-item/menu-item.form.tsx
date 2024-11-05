import { Button, Grid2 as Grid, TextField } from '@mui/material';
import { TextFormField } from 'modules/common/components/form-fields/text-form-field.component';
import { FieldValues, FormState, useController, useForm } from 'react-hook-form';

export interface MenuItemFormProps {
}

{/* <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl> */}

export const MenuItemForm = ({}: MenuItemFormProps) => {
  const { register, handleSubmit, control, formState: {dirtyFields, errors, touchedFields } } = useForm();
  // const {
  //   field,
  //   fieldState: { invalid, isTouched, isDirty },
  //   formState: { touchedFields, dirtyFields }
  // } = useController({
  //   name,
  //   control,
  //   rules: { required: true },
  // });
  console.log('FORM STATE: ', dirtyFields, errors, touchedFields);
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Grid container spacing={2}>
        {/* <Grid size={12}>
          <TextField
            {...register("name", { required: true })}
            fullWidth
            label="Name"
            name="name"
            required
            variant="outlined"
          />
        </Grid> */}
        <Grid size={12}>
          <TextFormField
            name="description"
            rules={{ required: "Is req'd", minLength: { value: 5, message: "Must be 5 chars long" } }}
            control={control}
            // formState={{dirtyFields, errors, touchedFields} as FormState<FieldValues>}
            // helperText={errors['description'] ? "Please enter a description" : "No error"}
            label="Description"
            // {...register("description", { required: "Please enter a description", minLength: { value: 5, message: "Must be 5 chars long" }})}
            // required
          />
          {/* <TextField
            {...register("description", { required: true })}
            fullWidth
            label="Description"
            name="description"
            required
            variant="outlined"
            helperText={formState.dirtyFields['description'] && "Please enter a description of the item."}
            error={!!formState.dirtyFields['description']}
          /> */}
        </Grid>
        {/* <Grid size={12}>
          <TextField
            {...register("price", { required: true })}
            fullWidth
            label="Price"
            name="price"
            required
            variant="outlined"
          />
        </Grid> */}
        {/* <Grid size={{xs: 12}}>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              {...register("image", { required: false })}
              type="file"
              hidden
            />
          </Button>
        </Grid> */}
        <Grid>
          <Button type='submit'>Add Item</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default MenuItemForm;
