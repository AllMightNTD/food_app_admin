import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = import.meta.env.VITE_API_URL as string;

export const request = axios.create({
    baseURL: baseUrl, // Sử dụng baseURL thay vì baseUrl
});

// Sau đó, bạn có thể sử dụng axiosInstance để thực hiện các yêu cầu.
