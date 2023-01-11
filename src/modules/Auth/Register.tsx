import { Divider } from "antd";
import { Button, Form, Input } from "antd";
import "../Auth/auth.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IRegisterDto } from "dtos/Auth";
import { useMessage } from "hooks";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
const Register = () => {
  const navigate = useNavigate();
  const { messageApi } = useMessage();
  const onFinish = (values: IRegisterDto) => {
    navigate("../login");
  };

  const onFinishFailed = (values: ValidateErrorEntity<IRegisterDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
  };

  const goRegister = () => {
    navigate("../login");
  };

  return (
    <div className="flex flex-col bg-gray-100 justify-center items-center px-2 py-8 sm:px-8 transition-all ease-in-out duration-300 rounded-md shadow-lg">
      <Divider orientation="center">
        <p className="font-bold text-gray-500 text-2xl m-0 p-0">REGISTER</p>
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "Please enter your surname!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Please enter your e-mail!" }]}
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
          labelCol={{ span: 24, className: "!-mb-2" }}
          wrapperCol={{ span: 24 }}
        >
          <Button
            icon={<AiOutlineRight className="mt-[2px]" />}
            className="w-full mt-4 flex flex-row-reverse justify-center items-center gap-x-2"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Register
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
            Are you registered ? <span className="text-[#36bff5]">Login!</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
