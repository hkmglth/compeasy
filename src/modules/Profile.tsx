import autoAnimate from "@formkit/auto-animate";
import { Avatar, Button, Divider, Select, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useMessage } from "hooks";
import { IUserDto } from "dtos/User";
import { useNavigate } from "react-router-dom";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
const Profile = () => {
  const parentLastActions = useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { messageApi } = useMessage();
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const onFinish = (values: IUserDto) => {
    let tempUser: IUserDto = { ...values };

    setUser(tempUser);
    messageApi.open({
      type: "success",
      content: "Company updated successfully!",
    });
    navigate("../");
  };

  const onFinishFailed = (values: ValidateErrorEntity<IUserDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
  };

  useEffect(() => {
    parentLastActions.current && autoAnimate(parentLastActions.current);
  }, [parentLastActions]);

  return (
    <div className="flex flex-col relative items-center h-full">
      <Divider orientation="left">
        <p className="flex flex-row gap-x-3 items-center m-0 p-0">
          <Avatar
            className="bg-sky-300 shadow-lg"
            size={64}
            src={user.userPic}
          />
          Profile
          <EditOutlined />
        </p>
      </Divider>
      <Button
        type="primary"
        shape="circle"
        size="large"
        onClick={toggleIsEdit}
        className="flex flex-row absolute top-7 right-6 items-center justify-center shadow-lg"
      >
        <EditOutlined className="text-xl mb-2 mr-[2px]" />
      </Button>
      <div
        className="relative flex flex-col w-full flex-wrap gap-4 items-center justify-center"
        ref={parentLastActions}
      >
        {isEdit ? (
          <>
            <Form
              name="updateCompany"
              className="flex flex-col bg-gray-200 p-4 rounded-md shadow-lg md:w-1/2 xl:w-1/4 max-w-5xl"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24, className: "!-mb-2" }}
                wrapperCol={{ span: 24 }}
                label="First name"
                name="firstName"
                valuePropName="firstName"
              >
                <Input
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24, className: "!-mb-2" }}
                wrapperCol={{ span: 24 }}
                label="Sur name"
                name="surName"
                valuePropName="surName"
              >
                <Input
                  value={user.surName}
                  onChange={(e) =>
                    setUser({ ...user, surName: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24, className: "!-mb-2" }}
                wrapperCol={{ span: 24 }}
                label="E-mail"
                name="email"
                valuePropName="email"
              >
                <Input
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24, className: "!-mb-2" }}
                wrapperCol={{ span: 24 }}
                label="Role"
                name="role"
                valuePropName="role"
              >
                <Input
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24, className: "!-mb-2" }}
                wrapperCol={{ span: 24 }}
              >
                <div className="flex flex-row gap-x-3 justify-end">
                  <Button
                    onClick={toggleIsEdit}
                    danger
                    type="default"
                    className="flex flex-row items-center justify-between"
                  >
                    <CloseOutlined />
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="flex flex-row items-center justify-between"
                  >
                    <PlusOutlined />
                    Update
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center bg-gray-200 p-4 gap-4 rounded-md shadow-lg">
            <Avatar
              className="bg-sky-300 shadow-lg mb-4"
              size={128}
              src={user.userPic}
            />
            <p className="text-base m-0 p-0 flex flex-row w-full gap-x-3">
              <UserOutlined />
              <span className="w-full text-center">
                {`${user.firstName} ${user.surName}`}
              </span>
            </p>
            <p className="text-base m-0 p-0 flex flex-row w-full gap-x-3 items-center justify-center">
              <MailOutlined />
              <span className="w-full text-center">{`${user.email}`}</span>
            </p>
            <p className="text-base m-0 p-0 flex flex-row w-full gap-x-3 items-center justify-center">
              <DatabaseOutlined />
              <span className="w-full text-center">{`${user.role}`}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
