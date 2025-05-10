import { Plus } from 'lucide-react';
import DialogCategory from './DialogCategory';

const DialogAddCategory = () => {
  return (
    <div className="flex justify-center items-center gap-2 px-2 bg-blue-600 rounded-[6px] ">
      <Plus size={18} className="text-white" />
      <DialogCategory type="Add" textButton="Add" titleHeader="Add Category" titleTriger="Add Category" classNameButton="" titleTrigerClassName="" />
    </div>
  );
};

export default DialogAddCategory;
