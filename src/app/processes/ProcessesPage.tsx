"use client";

import React from "react";
import {
  Typography,
  DatePicker,
  Button,
  Table,
  Progress,
  Space,
  Avatar,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineCheck } from "react-icons/ai";
import {
  MdOutlineStickyNote2,
  MdUndo,
  MdRestartAlt,
  MdArrowForwardIos,
} from "react-icons/md";
import styles from "./ProcessesPage.module.css";

const { Title } = Typography;

interface ProcessRecord {
  key: string;
  status: string;
  process: string;
  version: string;
  progress: number;
  lastModified: string;
  avatarUrl: string;
}

const getProgressColor = (progress: number) => {
  if (progress < 100) return "#F47920";
  return "#1268B3";
};

const ProcessesPage: React.FC = () => {
  const columns: ColumnsType<ProcessRecord> = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: 244,
      render: (status: string, record: ProcessRecord) => {
        const getStatusStyle = () => ({
          display: "flex",
          alignItems: "center",
          marginLeft: "29px",
        });

        const getCircleStyle = (bgColor: string, color: string) => ({
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: bgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "12px",
          color: color,
          fontSize: "20.16px",
          fontWeight: 600,
        });

        switch (status) {
          case "Done":
            return (
              <div style={getStatusStyle()}>
                <div
                  style={{
                    ...getCircleStyle("#1268B3", "#F3F4F8"),
                  }}
                >
                  <AiOutlineCheck color="#F3F4F8" size={24} />
                </div>
                <span style={{ fontSize: "20.16px", fontWeight: 400 }}>
                  Done
                </span>
              </div>
            );
          case "In Progress":
            return (
              <div style={getStatusStyle()}>
                <div style={getCircleStyle("#F3F4F8", "#F47920")}>
                  {record.key}
                </div>
                <span style={{ fontSize: "20.16px", fontWeight: 400 }}>
                  In Progress
                </span>
              </div>
            );
          case "Unavailable":
            return (
              <div style={getStatusStyle()}>
                <div
                  style={{
                    ...getCircleStyle("#EEEFF1", "#B3B5BD"),
                    border: "2px solid #B3B5BD",
                  }}
                >
                  {record.key}
                </div>
                <span style={{ fontSize: "20.16px", color: "#B3B5BD" }}>
                  Unavailable
                </span>
              </div>
            );
          default:
            return <span>{status}</span>;
        }
      },
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      render: (process: string, record: ProcessRecord) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "20.16px",
              fontWeight: 400,
              color: record.status === "Unavailable" ? "#B3B5BD" : "#13162A",
            }}
          >
            {process}
          </span>
          <span
            style={{ fontSize: "9.72px", color: "#B3B5BD", fontWeight: 400 }}
          >
            Version: {record.version}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: ProcessRecord) => {
        const iconColor =
          record.status === "Unavailable" ? "#B3B5BD" : "#13162A"; // Change color based on status
        return (
          <Space
            size="middle"
            style={{ display: "flex", justifyContent: "center", gap: "6px" }}
          >
            <div
              style={{
                border: "1px solid #EEEFF1",
                borderRadius: "8px",
                display: "flex",
                padding: "6px",
              }}
            >
              <MdOutlineStickyNote2 size={28} color={iconColor} />
            </div>
            <div
              style={{
                border: "1px solid #EEEFF1",
                borderRadius: "8px",
                display: "flex",
                padding: "6px",
              }}
            >
              <MdUndo size={28} color={iconColor} />
            </div>
            <div
              style={{
                border: "1px solid #EEEFF1",
                borderRadius: "8px",
                display: "flex",
                padding: "6px",
              }}
            >
              <MdRestartAlt size={28} color={iconColor} />
            </div>
            <div
              style={{
                border: "1px solid #EEEFF1",
                borderRadius: "8px",
                display: "flex",
                padding: "6px",
              }}
            >
              <MdArrowForwardIos size={28} color="#404252" />
            </div>
          </Space>
        );
      },
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      align: "center" as const,
      render: (progress: number, record: ProcessRecord) => {
        if (record.status === "Unavailable") {
          return null; // or return null if you want it empty
        }
        return (
          <div className={styles.progressWrapper}>
            <Progress
              percent={progress}
              strokeColor={getProgressColor(progress)}
              trailColor="#F3F4F8"
              format={(percent) => `${percent}%`}
              status="normal"
            />
          </div>
        );
      },
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "lastModified",
      align: "center" as const,
      render: (lastModified: string, record: ProcessRecord) => {
        if (record.status === "Unavailable") {
          return null; // or return null if you want it empty
        }
        return (
          <div className={styles.lastModifiedWrapper}>
            <Avatar src={"/images/avatar.png"} size={28} />
            <span className={styles.lastModifiedDate}>{lastModified}</span>
          </div>
        );
      },
    },
  ];

  const data: ProcessRecord[] = [
    {
      key: "1",
      status: "Done",
      process: "Input data",
      version: "V10.24.10:31",
      progress: 100,
      lastModified: "14/11/24, 14:31",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    {
      key: "2",
      status: "In Progress",
      process: "Cleansing",
      version: "V10.24.10:31",
      progress: 50,
      lastModified: "Today, 14:31",
      avatarUrl: "https://example.com/avatar2.jpg",
    },
    {
      key: "3",
      status: "Unavailable",
      process: "Rawmat",
      version: "V10.24.10:31",
      progress: 0,
      lastModified: "",
      avatarUrl: "https://example.com/avatar3.jpg",
    },
    {
      key: "4",
      status: "Unavailable",
      process: "Tie in",
      version: "V10.24.10:31",
      progress: 0,
      lastModified: "",
      avatarUrl: "https://example.com/avatar4.jpg",
    },
  ];

  const getRowClassName = (record: ProcessRecord) => {
    return record.status === "Unavailable" ? styles.unavailableRow : "";
  };

  return (
    <div style={{ padding: "16px 20px" }}>
      <Title style={{ marginTop: 0, marginBottom: 0 }} level={4}>
        Processes
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          marginTop: "28px",
        }}
      >
        <div>
          <span style={{ marginRight: "12px", color: "#404252" }}>
            Pilih tanggal:
          </span>
          <DatePicker
            defaultValue={null}
            format="dddd, DD MMMM YYYY"
            style={{ width: "273px" }}
            className={styles.boldDatePicker}
          />
        </div>
        <Button
          type="primary"
          style={{
            backgroundColor: "#FF2624",
            width: "109px",
            height: "44px",
            fontSize: "20.16px",
            borderRadius: "4px",
            fontWeight: 600,
          }}
        >
          Reset all
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={getRowClassName}
        className={styles.customTable}
      />
      <div className={styles.dailyReportSection}>
        <div className={styles.dailyReportHeader}>
          <Title level={4} className={styles.dailyReportTitle}>
            Daily Report
          </Title>
          <Button
            type="primary"
            style={{
              width: "182px",
              height: "44px",
              borderRadius: "4px",
              backgroundColor: "#B3B5BD",
              fontSize: "20.16px",
              fontWeight: 600,
            }}
          >
            Generate report
          </Button>
        </div>
        <div className={styles.messageRectangle}>
          <span className={styles.dailyReportMessage}>
            Please finish all your processes above!
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessesPage;
