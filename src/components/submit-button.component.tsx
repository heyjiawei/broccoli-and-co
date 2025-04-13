import { useEffect, useState } from "react";
import { Button, Form } from "antd";
import type { FormInstance } from "antd";

export default function SubmitButton({
  form,
  children,
}: {
  form: FormInstance;
  children?: React.ReactNode;
}) {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields()
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button block type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
}
