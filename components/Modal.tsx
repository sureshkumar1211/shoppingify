"use client";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: (e: React.MouseEvent<HTMLElement>) => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full">
      <div className="relative top-20 mx-auto px-8 py-5 border w-[30%] shadow-lg rounded-3xl bg-white">
        <div className="w-full flex justify-end">
          <IconButton
            className="text-sm ml-auto cursor-pointer text-[#828282]"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <h4 className="text-xl font-medium text-[#34333A] text-left">
          {title}
        </h4>
        <footer className="w-full flex justify-end mt-5">
          <div className="flex gap-4 text-base">
            <button
              onClick={secondaryAction}
              className="outline-none text-[#34333A] font-medium"
            >
              {secondaryActionLabel}
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="outline-none bg-[#EB5757] px-6 py-4 rounded-xl font-bold text-white"
            >
              {actionLabel}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
