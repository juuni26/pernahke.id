import React, { useContext, useLayoutEffect, useState, useEffect } from "react";

import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import Axios from "axios";

import { BaseContext } from "../BaseContext";

import "./User.scss";

const Login = () => {
    const [redirect, setRedirect] = useState(null);
    const { token, setToken, setUser, user } = useContext(BaseContext);

    const onFinish = ({ email, password }) => {
        Axios.defaults.xsrfHeaderName = "X-CSRFToken";

        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);

        Axios({
            method: "post",
            url: "/login",
            data: bodyFormData,
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.status === "failed") {
                    message.error(response.data.message);
                } else {
                    message.success(response.data.message);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", response.data.data);
                    setToken(response.data.token);
                    setUser(response.data.data);
                    setRedirect(true);
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    };
    if (redirect) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className="loginn">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!"
                            }
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Login
                        </Button> or <a href="/register">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

export default Login;
