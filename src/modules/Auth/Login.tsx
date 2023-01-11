import { Divider, message } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import "../Auth/auth.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth, useMessage } from "hooks";
import { ILoginDto } from "dtos/Auth";
import STORAGEKEYS from "utils/StorageKeys";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { messageApi } = useMessage();
  const onFinish = (values: ILoginDto) => {
    if (user.email === values.email && user.password === values.password) {
      localStorage.setItem(STORAGEKEYS.__TOKEN, "token");
      navigate("/");
    } else {
      alert("hata");
    }
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
