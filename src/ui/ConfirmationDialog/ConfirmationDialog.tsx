import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  highlightedText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  highlightedText,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: ConfirmationDialogProps) => {
  const hasHighlightedText = highlightedText && highlightedText.trim().length > 0;

  const highlightedTextDisplay = hasHighlightedText ? (
    <div className="text-center my-3">
      <span className="font-medium text-secondary-800 bg-secondary-100 px-3 py-1 rounded-md break-all">
        {highlightedText}
      </span>
    </div>
  ) : null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-auto m-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      contentLabel={title}
    >
      <h3 className="text-lg font-medium mb-4 text-secondary-900">{title}</h3>
      <p className="mb-2 text-secondary-700">{message}</p>
      {highlightedTextDisplay}
      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="btn-danger"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};