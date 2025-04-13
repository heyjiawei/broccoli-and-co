import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Form } from "antd";
import type { FormInstance } from "antd";

export default function SubmitButton({
  form,
  isPending,
  children,
}: {
  form: FormInstance;
  isPending: boolean;
  children?: React.ReactNode;
}) {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      block
      type="primary"
      htmlType="submit"
      disabled={!submittable || isPending}
    >
      {isPending ? <LoadingOutlined /> : null}
      {children}
    </Button>
  );
}
