import { Modal, Button } from "antd";
import React from "react";

interface ModelComponentProps {
  openModel: boolean;
  setOpenModel: (open: boolean) => void;
  title: string;        // Title for the modal
  subtitle: string;     // Subtitle for the modal
  cancelLabel?: string; // Label for the cancel button
  confirmLabel?: string; // Label for the confirm button
  onCancel?: () => void; // Optional cancel handler
  onConfirm?: () => void; // Optional confirm handler
}

const ModalComponent: React.FC<ModelComponentProps> = ({
  openModel,
  setOpenModel,
  title,
  subtitle,
  cancelLabel = "Cancel", // Default label
  confirmLabel = "Confirm", // Default label
  onCancel,
  onConfirm,
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
      bodyStyle={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      style={{ top: '20px', border: 'none' }} // Optional: Adjust modal position and remove border
      closable={false} // Disable the close button (optional)
    >
      <div className="text-center mb-4">
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{title}</h1>
        <h2 style={{ fontSize: '16px', color: '#555' }}>{subtitle}</h2>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={hideModal} style={{ backgroundColor: 'white', marginRight: '10px' }}>
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
