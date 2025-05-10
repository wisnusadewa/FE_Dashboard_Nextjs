import EditForm from '@/components/articles/admin/EditForm';
import Navbar from '@/components/navbar/Navbar';

const page = () => {
  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="border bg-white">
        <Navbar />
      </div>

      <div className="flex justify-center items-center h-full w-full px-[20px] py-[20px]">
        <div className="h-[1226px] w-full bg-gray-50 rounded-[12px] px-[24px] py-[24px]">
          <EditForm />
        </div>
      </div>
    </div>
  );
};

export default page;
