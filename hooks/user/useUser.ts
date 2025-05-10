import { getUserProfile } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  // Query Profile
  const useGetUserProfile = () => {
    return useQuery<User>({
      queryKey: ['currentUser'],
      queryFn: getUserProfile,
    });
  };

  return { useGetUserProfile };
};

export default useUser;
