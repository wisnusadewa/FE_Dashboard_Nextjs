import DialogCategory from './DialogCategory';

interface DialogDeleteCategoryProps {
  categoryId: string;
}

const DialogDeleteCategory = ({ categoryId }: DialogDeleteCategoryProps) => {
  return (
    <div className="flex justify-center items-center text-black">
      <DialogCategory
        categoryId={categoryId}
        type="Delete"
        textButton="Delete"
        titleHeader="Delete Category"
        titleTriger="Delete"
        classNameButton="bg-red-500 hover:bg-red-400"
        titleTrigerClassName="text-red-500 underline underline-offset-2"
      />
    </div>
  );
};

export default DialogDeleteCategory;
