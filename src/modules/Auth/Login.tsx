import { Divider } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import "../Auth/auth.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMessage } from "hooks";
import { ILoginDto } from "dtos/Auth";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { login } from "api/AuthApi";
import STORAGEKEYS from "utils/StorageKeys";
import { useEffect, useState } from "react";
import getToken from "utils/getToken";
const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { messageApi } = useMessage();

  const onFinish = async (values: ILoginDto) => {
    setIsLoading(true);
    const response = await login(values);
    if (response.success) {
      if (values.remember) {
        localStorage.setItem(STORAGEKEYS.__TOKEN, response.data.token);
      } else {
        sessionStorage.setItem(STORAGEKEYS.__TOKEN, response.data.token);
      }
      navigate("/dashboard");
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
    setIsLoading(false);
  };

  const onFinishFailed = (values: ValidateErrorEntity<ILoginDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
  };

  const goRegister = () => {
    navigate("../register");
  };

  useEffect(() => {
    const token = getToken().headers.Authorization;
    if (token && token.length !== 0) {
      messageApi.open({
        type: "success",
        content: "You are already login!",
      });
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 justify-center items-center px-2 py-8 sm:px-8 transition-all ease-in-out duration-300 rounded-md shadow-lg ">
      <Divider orientation="center">
        <p className="font-bold text-gray-500 text-2xl m-0 p-0">LOGIN</p>
      </Divider>
      <Form
        name="login"
        className="flex flex-col"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
          label="E-Mail"
          name="email"
          rules={[{ required: true, message: "Please enter your user name!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ span: 16 }}
          className="mb-1 mt-4"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
        >
          <Button
            loading={isLoading}
            icon={<AiOutlineRight className="mt-[2px]" />}
            className="w-full flex flex-row-reverse justify-center items-center gap-x-2"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
        >
          <Button
            onClick={goRegister}
            className="w-full flex flex-row justify-center items-center gap-x-2"
            size="large"
            type="ghost"
          >
            Not registered ? <span className="text-[#36bff5]">Register!</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
