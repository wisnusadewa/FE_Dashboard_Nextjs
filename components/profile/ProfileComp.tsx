'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useUser from '@/hooks/user/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const ProfileComp = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/');
  };

  const { useGetUserProfile } = useUser();
  const { data: user } = useGetUserProfile();
  console.log('user?', user);

  return (
    <div>
      <Card className="w-[335px] h-[436px] flex justify-between items-center border-none shadow-none">
        <CardHeader className="w-full font-semibold text-[20px] flex items-center justify-center text-centerorder">
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="h-full w-full flex flex-col items-center gap-6">
          <div className="flex w-[68px] h-[68px] justify-center items-center border rounded-full">
            <Image className="w-full object-cover" src={'/next.svg'} width={50} height={50} alt="profile" />
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="flex w-full h-[44px] bg-gray-100 text-[16px] rounded-md justify-center items-center px-2">
              <div className="flex justify-between">
                <p className=" w-24 font-semibold">Username</p>
                <span>:</span>
              </div>
              <p className=" font-normal text-center w-full">{user?.username}</p>
            </div>

            <div className="flex w-full h-[44px] bg-gray-100 text-[16px] rounded-md justify-center items-center px-2">
              <div className="flex justify-between">
                <p className=" w-24 font-semibold">Password</p>
                <span>:</span>
              </div>
              <p className=" font-normal text-center w-full">xxx</p>
            </div>

            <div className="flex w-full h-[44px] bg-gray-100 text-[16px] rounded-md justify-center items-center px-2">
              <div className="flex justify-between">
                <p className="w-24 font-semibold">Role</p>
                <span>:</span>
              </div>
              <p className=" font-normal text-center w-full">{user?.role}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-center items-center">
          <Button onClick={handleHome} className="rounded-md w-full">
            Back to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileComp;
