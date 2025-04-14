import { useState } from "react";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { attendeeCreate } from "../../api";
import type { AttendeeCreateBody } from "../../api/types";

export function useRequestInvite() {
  const [open, setOpen] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const errorNotification = (content: string) => {
    messageApi.open({
      type: "error",
      content,
    });
  };

  const { isPending, mutate, reset } = useMutation({
    mutationFn: attendeeCreate,
    onSuccess: () => {
      setOpen(false);
      setOpenSuccessPopup(true);
      reset();
    },
    onError: (error) => {
      errorNotification(error.message);
    },
  });

  const onSubmitForm = (formData: AttendeeCreateBody) => {
    mutate(formData);
  };

  return {
    open,
    setOpen,
    openSuccessPopup,
    setOpenSuccessPopup,
    onSubmitForm,
    isPending,
    contextHolder,
  };
}
