import React, { MouseEventHandler } from "react";
import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  content,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col justify-center">
        <p className="mb-6">{content}</p>
        <div>
          <Button onClick={onConfirm as MouseEventHandler} className="mr-2">
            {confirmLabel}
          </Button>
          <Button outline onClick={onCancel as MouseEventHandler}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
