import { Suspense, lazy } from "react";
import { Button } from "antd";
import { useRequestInvite } from "./hooks";
import StickyHeader from "../../components/sticky-header/sticky-header.component";
import StickyFooter from "../../components/sticky-footer/sticky-footer.component";
import { content } from "./translations";
import classes from "./layout.module.css";

const RequestEmailFormModal = lazy(() => import("./form-modal.component"));
const SuccessModal = lazy(() => import("./success-modal.component"));

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSuccessClose = () => setOpenSuccessPopup(false);

  return (
    <>
      {contextHolder}
      <StickyHeader>
        <h1>{content.header.company_logo}</h1>
      </StickyHeader>

      <section className={`${classes.screenHeight} ${classes.container}`}>
        <h1 className={classes.typographyLarge}>
          {content.page.eat_healthy_live_better}
        </h1>

        <Button type="primary" onClick={handleOpen}>
          {content.page.request_invite_button}
        </Button>

        <Suspense fallback={null}>
          <RequestEmailFormModal
            open={open}
            onCancel={handleClose}
            onSubmit={onSubmitForm}
            isPending={isPending}
            title={content.page.request_invite_button}
          />
        </Suspense>

        <Suspense fallback={null}>
          <SuccessModal
            open={openSuccessPopup}
            onClose={handleSuccessClose}
            title={content.messages.title_registered}
            content={content.messages.check_your_email}
          />
        </Suspense>
      </section>

      <StickyFooter>
        <p>{content.footer.all_rights_reserved}</p>
      </StickyFooter>
    </>
  );
}
