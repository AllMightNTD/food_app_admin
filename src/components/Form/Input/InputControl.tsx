import {
    FormControl,
    FormControlProps,
    FormHelperText,
    FormLabel,
    OutlinedInputProps,
    inputClasses,
    styled,
} from '@mui/material';
import { Input as MuiInput } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Controller, FieldError, FieldValues, UseControllerProps } from 'react-hook-form';

type AddControlProps = {
    helperText?: string | JSX.Element;
    label?: string;
    fieldError?: FieldError | boolean;
};

type MyInputProps<T extends FieldValues> = UseControllerProps<T> &
    OutlinedInputProps &
    AddControlProps & {
        controlProps?: FormControlProps;
    };

function InputControl<T extends FieldValues>({
    name,
    control,
    defaultValue,
    fullWidth,
    label,
    type = 'text',
    placeholder,
    helperText,
    controlProps,
    required,
    ...props
}: MyInputProps<T>) {
    return (
        <FormControl required={required}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <FormLabel sx={fieldState.error ? { color: '#D32F2F' } : {}}>{label}</FormLabel>
                        <StyledInput {...field} type={type} placeholder={placeholder} />
                        {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                    </>
                )}
            />
        </FormControl>
    );
}

const StyledInput = styled(MuiInput)(
    ({ theme }) => `
    
      .${inputClasses.input} {
        width: 300px;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        color: ${grey[900]};
    
        border: 1px solid ${grey[500]};
        padding: 12px 12px;
        border-radius: 8px;
        &:focus {
          outline: none;
        }
      }
    `,
);
export default InputControl;
