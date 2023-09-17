import { Box, Container, Paper, Stack, styled, FormControl, FormLabel, FormHelperText, Button } from '@mui/material';
import { Input, inputClasses } from '@mui/base/Input';
import logo from '../../assets/images/FASTFODD.png';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoginType } from '../../lib/type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
// import { sleep } from 'react-query/types/core/utils';

const validateLogin = yup
    // Tạo  object validate cùng với message của nó
    .object({
        email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
        password: yup.string().required('Password không được bỏ trống'),
    })
    // Bắt buộc
    .required();
const Login: React.FC = () => {
    const {
        control,
        handleSubmit,

        // isSubmitting : biểu thị cho việc dữ liệu đã được gửi đi hay chưa
        formState: { isSubmitting },
    } = useForm<LoginType>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(validateLogin),
    });

    const onSubmit: SubmitHandler<LoginType> = async (values) => {
        console.log('values', values);
        console.log(isSubmitting);

        const request = await axios.post('https://localhost:8080/login', {
            values,
        });
        console.log('request_2', request);
    };
    return (
        <Container sx={{ ...styleContainer }}>
            <LoginPaper>
                <Box sx={{ ...styleFormLogin }} component="form" onSubmit={handleSubmit(onSubmit)}>
                    <img style={{ width: '60px', borderRadius: '8px', height: '60px' }} src={logo} />

                    {/* Sử dụng Controller cho các trường dữ liệu */}
                    <FormControl required>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <FormLabel sx={fieldState.error ? { color: '#D32F2F' } : {}}>Email</FormLabel>
                                    <StyledInput {...field} placeholder="Email" />
                                    {fieldState.error && (
                                        <FormHelperText error>{fieldState.error.message}</FormHelperText>
                                    )}
                                </>
                            )}
                        />
                    </FormControl>

                    <FormControl required>
                        {/* Kiểm soát name và control -> render view */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <FormLabel sx={fieldState.error ? { color: '#D32F2F' } : {}}>Password</FormLabel>
                                    <StyledInput {...field} placeholder="Password" type="password" />
                                    {fieldState.error && (
                                        <FormHelperText error>{fieldState.error.message}</FormHelperText>
                                    )}
                                </>
                            )}
                        />
                    </FormControl>

                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#ffcc00',
                            width: '150px',
                            padding: '8px 12px',
                            fontWeight: 600,
                            color: 'white',
                        }}
                    >
                        Login
                    </LoadingButton>
                </Box>
            </LoginPaper>
        </Container>
    );
};

const styleContainer = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
};
const StyledInput = styled(Input)(
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

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};
const LoginPaper = styled(Paper)({
    borderRadius: '10px',
});
const styleFormLogin = {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
};
export { Login };
