import { toast } from 'sonner';
import axiosInstance from './axios';

export const Login = async (data: LoginParams) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    console.log('data fetch login?:', response.data);
    return response.data;
  } catch (err) {
    console.error('error : ', err);
    toast.error('login gagal!');
  }

  return;
};

export const Register = async (data: RegisterParams) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    // console.log('data?:', response.data);
    return response.data;
  } catch (err) {
    console.error('error : ', err);
    toast.error('Register gagal!');
  }

  return;
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>('/auth/profile');
    // console.log('response data getProfile', response.data);
    return response.data;
  } catch (err) {
    console.error('err:', err);
    throw err; // jadi tetap return Promise<User> , karena menggunakan TanStack Query dan error tersebut dihandle oleh onError.
  }
};
