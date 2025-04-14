import { lazy } from "react";
import { Button, Modal } from "antd";
import { useRequestInvite } from "./hooks";
import StickyHeader from "../../components/sticky-header/sticky-header.component";
import StickyFooter from "../../components/sticky-footer/sticky-footer.component";
import classes from "./layout.module.css";

const RequestEmailForm = lazy(() => import("./form.component"));

const successMessages = {
  title_registered: "Successfully Registered",
  check_your_email: "Check your email!",
};

const headerContent = {
  company_logo: "Broccoli and Co",
};

const pageContent = {
  eat_healthy_live_better: "Eat Healthy. Live Better.",
  request_invite_button: "Request an invite",
};

const footerContent = {
  company_rights: "© [2025] Broccoli & Co. All rights reserved.",
};

export default function Page() {
  const {
    open,
    setOpen,
    openSuccessPopup,
    setOpenSuccessPopup,
    onSubmitForm,
    isPending,
    contextHolder,
  } = useRequestInvite();

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
          {pageContent.request_invite_button}
        </Button>
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          destroyOnClose
        >
          <h1>{pageContent.request_invite_button}</h1>
          <RequestEmailForm onSubmit={onSubmitForm} isPending={isPending} />
        </Modal>
        <Modal
          title={successMessages.title_registered}
          open={openSuccessPopup}
          onOk={() => setOpenSuccessPopup(false)}
          onCancel={() => setOpenSuccessPopup(false)}
          footer={(_, { OkBtn }) => <OkBtn />}
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
