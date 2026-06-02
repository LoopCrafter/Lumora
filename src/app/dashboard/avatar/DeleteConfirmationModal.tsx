"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  avatarName: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  avatarName,
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmAction = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isDeleting && onClose()}
    >
      <DialogContent className="w-full max-w-[440px] bg-neutral-900 border border-white/10 text-white rounded-2xl p-6 gap-4 shadow-2xl overflow-hidden">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Trash2 className="size-5 text-red-500" />
            Delete Avatar
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm leading-normal">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">"{avatarName}"</span>?
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row sm:justify-end gap-3 mt-2 w-full">
          <Button
            type="button"
            variant="ghost"
            disabled={isDeleting}
            onClick={onClose}
            className="flex-1 sm:flex-none bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white rounded-xl h-10 px-4"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={handleConfirmAction}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl h-10 px-4 gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
