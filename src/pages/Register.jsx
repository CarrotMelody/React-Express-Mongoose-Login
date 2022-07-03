import React, { useState, useEffect } from "react";
import { Typography, Button, Form, Input, Select } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import styled from "styled-components";
import { UserAtom } from "../store";
import { request, postUserRegister } from "../api";
import { handleError } from "../functions";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const LoginContainer = styled.div`
  background: url(https://images.unsplash.com/photo-1587586291914-bdbe84ec1416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)
    0 / cover fixed;
`;
const LoginBackground = styled.div`
  width: 25vw;
  height: 45vh;
  background: hsla(0, 0%, 100%, 0.9);
`;

const authorityList = [
  {
    value: 1,
    label: "系統管理員",
  },
  {
    value: 2,
    label: "一般會員",
  },
];

export default function Register() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useAtom(UserAtom);
  const [authority, setAuthority] = useState(2);

  useEffect(() => {
    // 已登入無法再訪問登入頁面
    if (state.token) {
      navigate("/");
    }
  }, [pathname]);

  // 選擇權限
  const handleChange = (value) => {
    setAuthority(value);
  };

  // 成功送出
  const onFinish = (values) => {
    const { account, password } = values;
    const payload = { account, password, authority };

    postUserRegister(payload)
      .then((res) => {
        const { account, authority } = res.data.user;
        const { token } = res.data;
        // 將用戶資料及 token 保存到全局狀態中
        setState({ account, authority, token });
        // 將 token 放入請求頭中
        request.defaults.headers["Authorization"] = "Bearer " + token;
        // 跳轉至首頁
        navigate("/");
      })
      .catch((e) => handleError(e));
  };

  // 送出失敗
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginContainer className="w-100 h-100 jc-center al-center">
      <LoginBackground className="column jc-center al-center">
        <Title className="mb-1">註冊</Title>
        <Form
          className="w-80 column jc-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="mb-2"
            label="帳號"
            name="account"
            rules={[{ required: true, message: "請輸入帳號!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="mb-2"
            label="密碼"
            name="password"
            rules={[{ required: true, message: "請輸入密碼!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="mb-2"
            label="權限"
            name="authority"
            initialValue={2}
            rules={[{ required: true, message: "請選擇權限!" }]}
          >
            <Select onChange={handleChange}>
              {authorityList.map(({ value, label }) => (
                <Option value={value}>{label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className="w-100" type="primary" htmlType="submit">
              註冊
            </Button>
          </Form.Item>
          <Paragraph className="jc-center">
            已有帳號?<Link to="/login">前往登入!</Link>
          </Paragraph>
        </Form>
      </LoginBackground>
    </LoginContainer>
  );
}
