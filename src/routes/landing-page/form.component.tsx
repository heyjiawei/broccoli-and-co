import { Form, Input } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import SubmitButton from "../../components/submit-button.component";

const formFields = {
  name: "My Full Name",
  email: "My E-mail",
  confirm_email: "Confirm E-mail",
  send: "Send Invite",
};

const validationMessages = {
  confirm_email: "Please confirm your email!",
};

const errorMessages = {
  email_not_match: "The new email that you entered do not match!",
};

export default function RequestEmailForm({ onSubmit, isPending }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
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
        label={formFields.name}
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
        label={formFields.email}
        name="email"
        rules={[{ type: "email" }, { required: true }]}
      >
        <Input prefix={<MailOutlined />} placeholder="alex.anderson@mail.com" />
      </Form.Item>
      <Form.Item
        label={formFields.confirm_email}
        name="confirm"
        dependencies={["email"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: validationMessages.confirm_email,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("email") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(errorMessages.email_not_match));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <SubmitButton form={form} isPending={isPending}>
          {formFields.send}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
}
