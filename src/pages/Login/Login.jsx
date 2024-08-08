import React from "react";
import { Button, Form, Input } from "antd";
import Loginpic from "@/assets/login/login-l.png";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import LoginLogo from "@/assets/login/icon_logo.png";
import './Login.scss'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "@/store/UserStore/UserStore";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (formValue) => {
    await dispatch(fetchLogin(formValue))
    navigate('/')
  };

  return (
    <div className="login">
      <div className="login-container container flex ">
        <img src={Loginpic} alt="" />
        <div class="login-form bg-white flex flex-c">
          <Form
            validateTrigger={['onBlur']}
            name="normal_login"
            className="ant-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="title">
              <img src={LoginLogo} alt="" />
            </div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                className="form-item"
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              className=""
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },{
                  pattern:/^.{6,}$/,
                  message:'Passwords must greater than 6 characters '
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                className="form-item"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button text-white bg-dark form-item"
              >
                Log in
              </Button>
              
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
