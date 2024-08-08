import HeadLabel from "@/components/HeadLable/HeadLabel";
import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Button, message } from "antd";
import "./AddEmployee.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addEmp, getEmpById, updateEmp } from "@/apis/Employee";

const AddEmployee = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [title, setTitle] = useState("Add Employee");

  const navigate = useNavigate();

  // Fetch employee data if 'id' changes

  useEffect(() => {
    async function getEmployeeData() {
      const res = await getEmpById(id);
      const data = res.data.data;
      form.setFieldsValue(data);
    }
    if (id) {
      setTitle("Update Employee");
      getEmployeeData();
    } else {
      setTitle("Add Employee");
    }
  }, [id, form]);

  // Handle form submission
  const onFinish = async (values) => {
    if (!id) {
      const res = await addEmp(values);
      if (res.data.msg !== null) {
        message.error(res.data.msg);
      } else {
        message.success("Submit success");
        form.resetFields(); // Reset form fields on successful submission
        navigate(-1); // Go back
      }
    }else {
      values = {
        ...values,
        id:id
      }
      const res = await updateEmp(values)
      if (res.data.msg !== null) {
        message.error(res.data.msg);
      } else {
        message.success("Submit success");
        form.resetFields(); // Reset form fields on successful submission
        navigate(-1); // Go back
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="addEmp">
      <HeadLabel title={title} goback={true}></HeadLabel>
      <div className="add-emp-container">
        <Form
          form={form}
          id="form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Please input your mobile" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="gender" name="sex">
            <Radio.Group>
              <Radio value="0">Female</Radio>
              <Radio value="1">Male</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="id"
            name="idNumber"
            rules={[{ required: true, message: "Please input your Id" }]}
          >
            <Input />
          </Form.Item>
        </Form>

        <div className="add-emp-footer">
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button form="form" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
