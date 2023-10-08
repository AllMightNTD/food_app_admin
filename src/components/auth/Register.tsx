import * as React from 'react';
import { Box, Container, Paper, Stack, styled, FormControl, FormLabel, FormHelperText, Button } from '@mui/material';
import { Input, inputClasses } from '@mui/base/Input';
import logo from '../../assets/images/FASTFODD.png';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoginType, RegisterType } from '../../lib/type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import InputControl from '../Form/Input/InputControl';
import { request } from '../../lib/request';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import { sleep } from 'react-query/types/core/utils';

const validateLogin = yup
    // Tạo  object validate cùng với message của nó
    .object({
        name: yup.string().required('Username không được bỏ trống'),
        email: yup.string().email('Email sai định dạng').required('Email không được bỏ trống'),
        password: yup.string().required('Password không được bỏ trống'),
    })
    // Bắt buộc
    .required();

const Register: React.FC = () => {
    const {
        control,
        handleSubmit,

        // isSubmitting : biểu thị cho việc dữ liệu đã được gửi đi hay chưa
        formState: { isSubmitting },
    } = useForm<RegisterType>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
        resolver: yupResolver(validateLogin),
    });
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<LoginType> = async (values) => {
        console.log('values', values);
        console.log(isSubmitting);

        const response = await request.post('/auth/register', values);
        // if(response?.data.status === 200){

        // }
        if (response?.data.success) {
            toast.success('Đăng kí thành công', {
                onClose: () => {
                    navigate('/login');
                },
                autoClose: 2000,
            });
        }
        console.log('request_2', request);
    };

    return (
        <Container sx={{ ...styleContainer }}>
            <LoginPaper>
                <Box sx={{ ...styleFormLogin }} component="form" onSubmit={handleSubmit(onSubmit)}>
                    <img style={{ width: '60px', borderRadius: '8px', height: '60px' }} src={logo} />

                    {/* Sử dụng Controller cho các trường dữ liệu */}

                    <InputControl
                        // required
                        control={control}
                        name="name"
                        type="text"
                        label="Username"
                        placeholder="Username...."
                    />
                    <InputControl
                        // required
                        control={control}
                        name="email"
                        label="Email"
                        // type="email"
                        placeholder="Email...."
                    />

                    <InputControl
                        // required
                        control={control}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password...."
                    />

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
export { Register };
