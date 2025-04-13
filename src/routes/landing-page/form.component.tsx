import { useState } from "react";
import { Form, Input } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import SubmitButton from "../../components/submit-button.component";

export default function RequestEmailForm() {
  const [form] = Form.useForm();

  const action = (changedValues, values) => {
    console.log(`changedValues: ${JSON.stringify(changedValues, null)}`);
    console.log(`values: ${JSON.stringify(values, null, 2)}`);
  };

  const onFinish = (values) => {
    console.log(`onFinish: ${JSON.stringify(values, null, 2)}`);
  };
  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={onFinish}
      // initialValues={{ layout: formLayout }}
      // onValuesChange={onFormLayoutChange}
      // style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
    >
      <Form.Item
        label="My Full Name"
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
        label="My E-mail"
        name="email"
        rules={[{ type: "email" }, { required: true }]}
      >
        <Input prefix={<MailOutlined />} placeholder="alex.anderson@mail.com" />
      </Form.Item>
      <Form.Item
        label="Confirm E-mail"
        name="confirm"
        dependencies={["email"]}
        // hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your email!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("email") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new email that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <SubmitButton form={form}>Send Invite</SubmitButton>
      </Form.Item>
    </Form>
  );
}
