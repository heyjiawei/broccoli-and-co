import { Button, Modal, message } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { attendeeCreate } from "../../api";
import RequestEmailForm from "./form.component";
import StickyHeader from "../../components/sticky-header/sticky-header.component";
import StickyFooter from "../../components/sticky-footer/sticky-footer.component";
import classes from "./layout.module.css";

const successMessages = {
  title_registered: "Successfully Registered",
  check_your_email: "Check your email!",
};

const headerContent = {
  company_logo: "Broccoli and Co",
};

const pageContent = {
  eat_healthy_live_better: "Eat Healthy. Live Better.",
};

const footerContent = {
  company_rights: "© [2025] Broccoli & Co. All rights reserved.",
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

  return (
    <>
      {contextHolder}
      <StickyHeader>
        <h1>{headerContent.company_logo}</h1>
      </StickyHeader>

      <section className={`${classes.screenHeight} ${classes.container}`}>
        <h1 className={classes.typographLarge}>
          {pageContent.eat_healthy_live_better}
        </h1>
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
      </section>

      <StickyFooter>
        <p>{footerContent.company_rights}</p>
      </StickyFooter>
    </>
  );
}
