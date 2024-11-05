import { Button, Grid2 as Grid } from '@mui/material';
import { TextFormField } from 'modules/common/components/form-fields/text-form-field.component';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export interface MenuItemFormProps {
  isConsolidated?: boolean;
}

export const MenuItemForm = ({ isConsolidated }: MenuItemFormProps) => {
  const { register, handleSubmit, control, formState: {isValid, dirtyFields, errors, touchedFields } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  const standardFieldSize = useMemo(() => isConsolidated ? { md: 2,  xs: 3 } : { xs: 12, sm: 6, md: 4 }, [isConsolidated]);
  const standardCtaSize = useMemo(() => isConsolidated ? { md: 2,  xs: 3 } : { xs: 12 }, [isConsolidated]);
 
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Grid container spacing={2}>
        <Grid size={standardFieldSize}>
          <TextFormField
            label="Name"
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
          />
        </Grid>
        <Grid size={standardFieldSize}>
          <TextFormField
            name="description"
            rules={{ required: "Description is required", minLength: { value: 5, message: "Must be 5 chars long" } }}
            control={control}
            // helperText="Please enter a description"
            label="Description"
          />
        </Grid>
        <Grid size={standardFieldSize}>
          <TextFormField
            label="Number of Guests"
            name="numberOfGuests"
            type='number'
            rules={{
              required: "Must provide a number of guests",
              min: { value: 1, message: 'Must have at least 1 guest'},
              max: { value: 20, message: 'Cannot book more than 20 guests per reservation online'}
            }}
            control={control}
            required
          />
        </Grid>
        <Grid size={standardFieldSize}>
          <TextFormField
            label="Price"
            name="price"
            type='number'
            rules={{
              required: "Must enter a price",
              min: { value: 0.01, message: 'Price must be greater than 0.01'},
              max: { value: 100, message: 'Price must be less than or equal to 100'}
            }}
            control={control}
            required
          />
        </Grid>
        <Grid size={standardFieldSize}>
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
        </Grid>
        <Grid size={standardCtaSize}>
          <Button disabled={!isValid} type='submit'>Add Item</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default MenuItemForm;
