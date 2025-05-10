'use client';

import useUser from '@/hooks/user/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import DialogReusable from './DialogReusable';
import ResponsiveImage from './ResponsiveImage';

interface classNameNavbarProps {
  classNameNavbar?: string;
  srcExt?: string;
  profileNameArticlesIsMd?: string;
}

const Navbar = ({ classNameNavbar, srcExt, profileNameArticlesIsMd }: classNameNavbarProps) => {
  const { useGetUserProfile } = useUser();
  const { data: currentUser, isLoading, error } = useGetUserProfile();
  // console.log('currentUser', currentUser);

  const router = useRouter();

  if (isLoading) <p>loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleLogout = () => {
    console.log('handleLogout clicked');
    localStorage.clear();
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <div
      className={`${
        classNameNavbar
          ? `${classNameNavbar} w-full flex justify-between items-center bottom-0 h-[64px] md:h-[96px] px-4 md:px-[60px] `
          : 'w-full flex justify-between items-center bottom-0 bg-white md:bg-transparent text-white h-[64px] md:h-[96px] px-4 md:px-[60px]'
      }`}
    >
      <div className="w-full flex">
        <ResponsiveImage srcExt={srcExt} />
      </div>

      <Popover>
        <PopoverTrigger className="flex justify-center items-center gap-2 cursor-pointer">
          <div className="flex w-[32px] h-[32px] justify-center items-center border rounded-full">
            <Image className="w-full object-cover" src={'/next.svg'} width={50} height={50} alt="profile" />
          </div>
          <p className={`${profileNameArticlesIsMd ? `${profileNameArticlesIsMd} hidden md:block underline underline-offset-4` : 'hidden md:block underline underline-offset-4 text-black'} `}>{currentUser?.username}</p>
        </PopoverTrigger>

        {/* isi pop-up  */}
        <PopoverContent className="w-[120px] md:w-[224px] px-[5px] py-0">
          <div>
            <Button onClick={handleProfile} className="px-0 py-0 w-full bg-transparent hover:bg-transparent text-black  flex justify-start rounded-none border-b md:text-[14px] text-[12px] font-medium">
              My Account
            </Button>
            <DialogReusable handleLogout={handleLogout} textButton="Logout" titleHeader="Logout" titleTriger="Logout" textDialogDescription="Are you sure want to logout?" type="Delete" isLogout />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
