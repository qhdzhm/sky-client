import React from "react";
import { Modal } from "antd";
import { Button, Form, Input } from "antd";
import "./Password.scss";
const Password = ({ passwordFormVisible, handlePasswardForm }) => {
  const handleOk = () => {
    handlePasswardForm();
  };
  const handleCancel = () => {
    handlePasswardForm();
  };

  //
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      className="cust-modal"
      title="Change Password"
      open={passwordFormVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="passwordForm"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        validateTrigger={["onBlur"]}
        id="passwordForm"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Old Password"
          name="Oldpassword"
          rules={[
            { required: true, message: "Please input your old password!" },
            {
              pattern: /^.{6,}$/,
              message: "Passwords must greater than 6 characters ",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your new password!" },
            {
              pattern: /^.{6,}$/,
              message: "Passwords must greater than 6 characters ",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="repassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            {
              pattern: /^.{6,}$/,
              message: "Passwords must greater than 6 characters ",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {/* Note: No need to duplicate the Submit button here */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Password;
