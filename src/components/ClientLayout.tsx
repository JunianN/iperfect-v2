"use client";

import React from "react";
import { ConfigProvider, Layout } from "antd";
import Sidebar from "./Sidebar";
import theme from "@/theme";

const { Content } = Layout;

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
        <Sidebar />
        <Layout>
          <Content style={{ padding: "24px" }}>{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ClientLayout;
