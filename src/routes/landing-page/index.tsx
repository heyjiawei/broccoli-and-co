import { Button, Modal, message } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { attendeeCreate } from "../../api";
import RequestEmailForm from "./form.component";

const successMessages = {
  title_registered: "Successfully Registered",
  check_your_email: "Check your email!",
};

export default function Page() {
  const [open, setOpen] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const errorNotification = (content: string) => {
    messageApi.open({
      type: "error",
      content,
    });
  };

  const mutation = useMutation({
    mutationFn: attendeeCreate,
    onSuccess: () => {
      setOpen(false);
      setOpenSuccessPopup(true);
      mutation.reset();
    },
    onError: (error) => {
      errorNotification(error.message);
    },
  });

  const onSubmitForm = (formData) => {
    mutation.mutate(formData);
  };

  console.log(`mutation status: ${mutation.status}`);
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => setOpen(true)}>
        Request an invite
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <h1>Request an Invite</h1>
        <RequestEmailForm
          onSubmit={onSubmitForm}
          isPending={mutation.isPending}
        />
      </Modal>
      <Modal
        title={successMessages.title_registered}
        open={openSuccessPopup}
        onOk={() => setOpenSuccessPopup(false)}
        onCancel={() => setOpenSuccessPopup(false)}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}
      >
        {successMessages.check_your_email}
      </Modal>
    </>
  );
}
