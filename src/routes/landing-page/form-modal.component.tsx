import { Modal } from "antd";
import RequestEmailForm from "./form.component";
import type { AttendeeCreateBody } from "../../api/types";

export default function RequestInviteModal({
  open,
  onCancel,
  onSubmit,
  isPending,
  title,
}: {
  open: boolean;
  onCancel: () => void;
  onSubmit: (data: AttendeeCreateBody) => void;
  isPending: boolean;
  title: string;
}) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      data-testid="form-modal"
    >
      <h1>{title}</h1>
      <RequestEmailForm onSubmit={onSubmit} isPending={isPending} />
    </Modal>
  );
}
