import React, { useContext, useLayoutEffect, useState, useEffect } from "react";

import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Axios from "axios";

import {
  Redirect
} from "react-router-dom";


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 4,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [redirect,setRedirect] = useState(null);

  const onFinish = ({name,password,email,alamat,phone,ktp}) => {
    // console.log('Received values of form: ', values);

    Axios.defaults.xsrfHeaderName = "X-CSRFToken";

    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("alamat", alamat);
    bodyFormData.append("no_telp",phone);
    bodyFormData.append("ktp", ktp);

    Axios({
        method: "post",
        url: "/register",
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
                setRedirect(true);
            }
            // }
            // setVisibleVideo(false);
        })
        .catch(function (response) {
            console.log(response);
        });


  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="0">+62</Option>        
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  
  if(redirect){
return  <Redirect to='/login'/>
  }
  else {
    return (    
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{     
          prefix: '+62',
        }}
        scrollToFirstError
      >
  
  <Form.Item
          name="name"
          label={
            <span>
              Full Name
              {/* <Tooltip title="Your full name sr?">
                <QuestionCircleOutlined />
              </Tooltip> */}
            </span>
          }
          rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="alamat"
          label={
            <span>
              Asal
            </span>
          }
          rules={[{ required: true, message: 'Please input your place!', whitespace: true }]}
        >
          <TextArea/>
        </Form.Item>    
          
  
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: false, message: 'Please input your phone number!' }]}
        >
          <Input placeholder="opsional (untuk keperluan mendatang)" pattern="[0-9\/]*"  addonBefore={prefixSelector}  style={{ width: '100%' }} />
        </Form.Item>
  
        
  
        <Form.Item
          name="ktp"
          label={
            <span>
              KTP 
            </span>
          }
          rules={[{ required: false, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input pattern="[0-9\/]*" placeholder="opsional (untuk keperluan mendatang)" minLength={16} maxLength={16} />
        </Form.Item>
        
  
  
          
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
  
};

export default RegistrationForm;