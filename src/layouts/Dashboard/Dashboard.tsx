import { Layout, Menu, Modal, theme } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HddOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./dashboard.css";
import { useAuth } from "hooks";
import STORAGEKEYS from "utils/StorageKeys";
const Dashboard = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem(STORAGEKEYS.__TOKEN);
    navigate("/");
  };

  return (
    <>
      <Layout className="h-screen">
        <Sider
          className="flex flex-col py-4 shadow-lg"
          trigger={null}
          theme="light"
          collapsible
          collapsed={collapsed}
        >
          <div>
            <div
              className={`logo ${
                collapsed ? "logo-expanded" : "logo-collapsed"
              }`}
            />
            <p className="truncate text-sm md:text-base font-medium antialiased text-center">
              {collapsed ? user.firstName : user.firstName + " " + user.surName}
            </p>
          </div>
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: "Home",
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "Profile",
              },
              {
                key: "3",
                icon: <HddOutlined />,
                label: "Compaines",
              },
              {
                className: "!absolute !bottom-4",
                key: "4",
                icon: <LogoutOutlined />,
                label: "Logout",
                onClick: showModal,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="mx-5 mt-5 rounded-md shadow-lg"
            style={{ background: colorBgContainer }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "text-xl",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="m-5 rounded-md p-4 shadow-lg"
            style={{
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Modal"
        open={open}
        onOk={logout}
        onCancel={hideModal}
        okType="primary"
        okText="Yes"
        cancelText="No"
      >
        <p>Bla bla ...</p>
      </Modal>
    </>
  );
};

export default Dashboard;
