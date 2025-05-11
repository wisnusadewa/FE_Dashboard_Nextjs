'use client';

import useAuth from '@/hooks/auth/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import FormField from './FormField';

enum RoleEnum {
  Admin = 'Admin',
  User = 'User',
}

const authFormSchema = (type: FormType) => {
  return z.object({
    role: type === 'register' ? z.enum([RoleEnum.Admin, RoleEnum.User]) : z.enum([RoleEnum.Admin, RoleEnum.User]).optional(),
    username: type === 'register' ? z.string().min(1, 'Username field cannot be empty') : z.string().min(1, 'Please enter your username'),
    password: type === 'register' ? z.string().min(8, 'Password must be at least 8 characters long') : z.string().min(1, 'Please enter your password'),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: undefined,
      username: '',
      password: '',
    },
  });

  // Tanstack Query
  const { useLoginQuery, useRegisterQuery } = useAuth();

  // handleSubmit
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === 'register') {
        // console.log({ ...data });
        useRegisterQuery.mutate({ ...data });
        form.reset();
        router.push('/login');
      } else {
        // ini harus mutateAsync karena tidak bisa ke articles jika token belum ke render
        await useLoginQuery.mutateAsync(data);
        router.push('/articles');
      }
    } catch (err) {
      console.log(err);
      toast.error(`error: ${err}`);
    }
  };

  const isLogin = type === 'login';

  return (
    <div className={`neomorph ${!isLogin ? 'w-[343px] h-full pb-10 md:h-[500px] md:w-[400px] ' : 'w-[343px] h-[420px] md:h-[500px] md:w-[400px]'} flex flex-col gap-6`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full px-[16px] ">
          <div className="w-full flex justify-center items-center mt-[40px] mb-[24px]">
            <Image src={'mainLogo.svg'} width={132} height={24} className="w-[132px] h-[24px]" alt="main-logo" />
          </div>
          <FormField control={form.control} label="Username" name="username" placeholder="Input username" />
          <FormField control={form.control} label="Password" name="password" placeholder="Input password" type="password" />
          {!isLogin && (
            <FormField
              control={form.control}
              label="Role"
              name="role"
              type="select"
              placeholder="Select Role"
              optionsRole={[
                {
                  label: RoleEnum.Admin,
                  value: RoleEnum.Admin,
                },
                {
                  label: RoleEnum.User,
                  value: RoleEnum.User,
                },
              ]}
            />
          )}

          <Button disabled={form.formState.isSubmitting || useRegisterQuery.isPending || useLoginQuery.isPending} type="submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        {/* TEXT */}
        <div>
          <p className="text-center">
            {isLogin ? 'Belum memiliki akun?' : 'Already have account?'}
            <Link href={!isLogin ? '/login' : '/register'} className="underline underline-offset-2 text-blue-600 ml-1">
              {!isLogin ? 'Login' : 'Register'}
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
