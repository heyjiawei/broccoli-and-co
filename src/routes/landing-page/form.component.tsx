import { Form, Input } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { content } from "./translations";
import SubmitButton from "../../components/submit-button.component";
import type { AttendeeCreateBody } from "../../api/types";

export default function RequestEmailForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (formData: AttendeeCreateBody) => void;
  isPending: boolean;
}) {
  const [form] = Form.useForm();

  const onFinish = (values: AttendeeCreateBody) => {
    onSubmit({ name: values.name, email: values.email });
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        label={content.form.name}
        name="name"
        validateTrigger="onBlur"
        rules={[
          { type: "string" },
          { min: 3 },
          { required: true },
          // TODO: strip off empty spaces from front and back of string and if there is more than 1 space in between
          // Is there a name validation library?
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Alex Anderson" />
      </Form.Item>
      <Form.Item
        label={content.form.email}
        name="email"
        rules={[{ type: "email" }, { required: true }]}
      >
        <Input prefix={<MailOutlined />} placeholder="alex.anderson@mail.com" />
      </Form.Item>
      <Form.Item
        label={content.form.confirm_email}
        name="confirm"
        dependencies={["email"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: content.validation.confirm_email,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("email") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(content.messages.email_not_match)
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <SubmitButton form={form} isPending={isPending}>
          {content.form.send}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
}
