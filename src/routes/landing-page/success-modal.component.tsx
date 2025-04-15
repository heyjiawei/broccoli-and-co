import { Modal } from "antd";

export default function SuccessModal({
  open,
  onClose,
  title,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={(_, { OkBtn }) => <OkBtn />}
      data-testid="success-modal"
    >
      {content}
    </Modal>
  );
}
