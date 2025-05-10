'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface DialogReusableProps {
  handleLogout?: () => void;
  handleDeleteArticle?: () => void;
  titleTriger: string;
  titleTrigerClassName?: string;
  titleHeader: string;
  textButton: string;
  textDialogDescription?: string;
  classNameButton?: string;
  isLogout?: boolean;
  isDeleteArticles?: boolean;
}

const DialogReusable = ({ handleLogout, textButton, titleTriger, titleTrigerClassName, titleHeader, textDialogDescription, classNameButton, isLogout, handleDeleteArticle, isDeleteArticles }: DialogReusableProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (isLogout) {
      handleLogout?.();
      setOpen(false);
    } else if (isDeleteArticles) {
      handleDeleteArticle?.();
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="px-0 py-1.5 w-full bg-transparent hover:bg-transparent text-red-500  flex justifButtony-start items-center rounded-none md:text-[14px] text-[12px] font-medium cursor-pointer">
          {isLogout && <LogOut size={18} />}
          <span className={titleTrigerClassName}>{titleTriger}</span>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader className="space-y-6">
            <DialogTitle>{titleHeader}</DialogTitle>
            <DialogDescription>{textDialogDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-white text-black border hover:bg-gray-100/80" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className={classNameButton} onClick={handleConfirm}>
              {textButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogReusable;
