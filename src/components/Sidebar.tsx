"use client";

import React from "react";
import { Layout, Divider, Typography, Menu, Avatar } from "antd";
import {
  HiOutlineFlag,
  HiOutlineDocumentDuplicate,
  HiDotsHorizontal,
} from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { MdInfoOutline } from "react-icons/md";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "1",
      icon: <HiOutlineFlag size={24} />,
      label: "Processes",
      href: "/processes",
    },
    {
      key: "2",
      icon: <HiOutlineDocumentDuplicate size={24} />,
      label: "Report",
      href: "/report",
    },
    {
      key: "3",
      icon: <AiOutlineSetting size={24} />,
      label: "Configuration",
      href: "/configuration",
    },
    {
      key: "4",
      icon: <MdInfoOutline size={24} />,
      label: "Documentation",
      href: "/documentation",
    },
  ].map((item) => ({
    ...item,
    label: <h4 style={{ margin: "0 0 0 8.8px" }}>{item.label}</h4>,
  }));

  const getSelectedKey = (path: string) => {
    const item = menuItems.find((item) => item.href === path);
    return item ? item.key : "";
  };

  return (
    <Sider
      width={373}
      theme="light"
      style={{
        height: "100vh",
        borderRight: "1px solid #f0f0f0",
        margin: 0,
        padding: 0,
      }}
      className={styles.sidebar}
    >
      <div style={{ marginTop: "40px", marginLeft: "30px" }}>
        <Image
          src="/images/iperfect-logo.svg"
          alt="iPerfect Logo"
          width={117.42}
          height={24}
        />
      </div>
      <div style={{ padding: "0 30px", margin: "28px 0 16px 0" }}>
        <Divider
          style={{
            margin: 0,
            minWidth: "100%",
            height: 2,
          }}
        />
      </div>
      <div style={{ margin: "0 30px 0 30px" }}>
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey(pathname)]}
          style={{ borderRight: 0 }}
          items={menuItems.map((item) => ({
            ...item,
            onClick: undefined,
            label: <Link href={item.href}>{item.label}</Link>,
          }))}
          className={styles.customMenu}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "16px",
          backgroundColor: "#F3F4F8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src="/images/avatar.png" size={56} />
          <div style={{ marginLeft: "12px", flex: 1 }}>
            <Text strong>Aster William</Text>
            <Text type="secondary" style={{ display: "block" }}>
              Engineers
            </Text>
          </div>
          <HiDotsHorizontal style={{ fontSize: "24px", color: "#404252" }} />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
