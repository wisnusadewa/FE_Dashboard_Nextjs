'use client';

import useUser from '@/hooks/user/useUser';
import { LogOut, Newspaper, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Get Profile
  const { useGetUserProfile } = useUser();
  const { data: currentUser } = useGetUserProfile();
  console.log('currentUser', currentUser);

  // Menu items.
  const items = [
    {
      title: 'Articles',
      url: '/articles',
      icon: Newspaper,
    },
    {
      title: 'Category',
      url: '/category',
      icon: Tag,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <Sidebar className="flex flex-col bg-blue-600">
      <SidebarHeader className="h-fit mt-2">
        <SidebarGroupLabel className="flex justify-start items-center w-full h-full">
          <Image alt="logo" src="mainLogoWhite.svg" width={134} height={24} className="w-[134px] h-[24px] object-cover" priority />
        </SidebarGroupLabel>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup className="h-full">
          <SidebarGroupContent className="h-full flex ">
            <SidebarMenu className="h-full gap-2">
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="">
                    <SidebarMenuButton
                      data-state={pathname.startsWith(item.url) ? 'active' : undefined}
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-500 flex items-center"
                      isActive={pathname.startsWith(item.url)}
                      asChild
                    >
                      <Link href={item?.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>

              <Button className="h-fit font-sm font-normal py-2 px-0 has-[>svg]:px-2 bg-transparent shadow-none flex justify-start items-center text-white hover:bg-blue-500" onClick={handleLogout}>
                <LogOut />
                <p>Logout</p>
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
