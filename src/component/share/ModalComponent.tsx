import { Modal, Button } from "antd";
import React from "react";

interface ModalComponentProps {
  openModel: boolean;
  setOpenModel: (open: boolean) => void;
  title: string; // Title for the modal
  subtitle: string; // Subtitle for the modal
  cancelLabel?: string; // Label for the cancel button
  confirmLabel?: string; // Label for the confirm button
  onCancel?: () => void; // Optional cancel handler
  onConfirm?: () => void; // Optional confirm handler
  children?: React.ReactNode; // Allow additional content to be rendered
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  openModel,
  setOpenModel,
  title,
  subtitle,
  cancelLabel = "Cancel", // Default label for cancel button
  confirmLabel = "Confirm", // Default label for confirm button
  onCancel,
  onConfirm,
  children, // Optional children for custom content
}) => {
  const hideModal = () => {
    setOpenModel(false);
    if (onCancel) onCancel(); // Call the onCancel handler if provided
  };

  const handleApprove = () => {
    if (onConfirm) onConfirm(); // Call the onConfirm handler if provided
    hideModal(); // Close the modal after confirmation
  };

  return (
    <Modal
      open={openModel}
      onCancel={hideModal}
      footer={null} // Remove default footer
      bodyStyle={{
        backgroundColor: "white",
        padding: "20px",
        textAlign: "center",
      }} // Custom body styles
      style={{ top: "20px" }} // Optional: Adjust modal position
      closable={false} // Disable the close button (optional)
    >
      {/* Title and subtitle section */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-black">{title}</h1>
        <h2 className="text-lg text-gray-600">{subtitle}</h2>
      </div>

      {/* Optional custom content */}
      {children && <div className="mb-4">{children}</div>}

      {/* Action buttons */}
      <div className="flex justify-center">
        <Button
          onClick={hideModal}
          style={{
            backgroundColor: "white",
            color: "#000",
            border: "1px solid #d9d9d9",
            marginRight: "10px",
          }}
        >
          {cancelLabel}
        </Button>
        <Button type="primary" onClick={handleApprove}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
