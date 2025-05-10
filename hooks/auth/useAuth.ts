'use client';

import { AppDispatch } from '@/app/store';
import { loginRedux } from '@/app/store/slice/userSlice';
import { Login, Register } from '@/lib/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useAuth = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  // Query Login
  const useLoginQuery = useMutation({
    mutationKey: ['currentUser'],
    mutationFn: Login,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        toast.success('login berhasil');
        // console.log('data dari query', data);

        // simpan token pada redux ( data.token )
        localStorage.setItem('token', data.token);
        dispatch(loginRedux({ role: data.role, token: data.token }));
      }
    },
  });

  // Query Register
  const useRegisterQuery = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: Register,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['registerUser'] });
        toast.success('register berhasil');

        console.log('data dari query', data);
      }
    },
  });

  return { useLoginQuery, useRegisterQuery };
};

export default useAuth;
