import DialogCategory from './DialogCategory';

interface DialogEditCategory {
  categoryId: string;
}

const DialogEditCategory = ({ categoryId }: DialogEditCategory) => {
  return (
    <div className="flex justify-center items-center text-black">
      <DialogCategory categoryId={categoryId} type="Edit" textButton="Save Changes" titleHeader="Edit Category" titleTriger="Edit" classNameButton="" titleTrigerClassName="text-blue-600 underline underline-offset-2" />
    </div>
  );
};

export default DialogEditCategory;
