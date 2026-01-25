import React, { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import {
  Card,
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Image,
  Alert,
  Skeleton,
  Empty,
} from "antd";
import {
  EyeOutlined,
  PictureOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const API_BASE = "https://sirivaram-backed.onrender.com";
const BTN_BLUE = "#008cba";
const BTN_GREEN = "#1ab394";

const getToken = () =>
  localStorage.getItem("token") || localStorage.getItem("accessToken") || "";

export default function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openImage, setOpenImage] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payments`,
  });

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }

      const res = await fetch(`${API_BASE}/api/payments/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      if (!res.ok) {
        throw new Error(`API Error ${res.status}`);
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setPayments(list);
      setPagination((prev) => ({ ...prev, total: list.length }));
    } catch (err) {
      setPayments([]);
      setError(err.message || "Unable to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleTableChange = (pag) => {
    setPagination({
      ...pagination,
      current: pag.current,
      pageSize: pag.pageSize,
    });
  };

  const statusTag = (status) => {
    if (!status) return <Tag>—</Tag>;

    switch (status.toUpperCase()) {
      case "VERIFIED":
        return <Tag color="green">Verified</Tag>;
      case "REJECTED":
        return <Tag color="red">Rejected</Tag>;
      case "PENDING_VERIFICATION":
      case "PENDING":
      default:
        return <Tag color="orange">Pending</Tag>;
    }
  };

  const lastFour = (id) => {
    if (!id) return "—";
    return `#${String(id).slice(-4)}`;
  };

  const columns = [
    {
      title: "S.No",
      key: "serial",
      width: 70,
      align: "center",
      fixed: "left",
      render: (_, __, index) =>
        ((pagination.current - 1) * pagination.pageSize + index + 1).toString(),
    },

    {
      title: "Event ID",
      key: "eventId",
      width: 120,
      align: "center",
      render: (record) => lastFour(record.eventId || record.event?.id),
    },
    {
      title: "Payment ID",
      key: "paymentId",
      width: 120,
      align: "center",
      render: (record) => lastFour(record.id),
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      align: "center",
      render: (v) => <Text strong>₹ {v ?? "—"}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: statusTag,
    },
    {
      title: "Date",
      dataIndex: "paidOnDate",
      key: "paidOnDate",
      width: 180,
      align: "center",
      sorter: (a, b) =>
        dayjs(a.paidOnDate).valueOf() - dayjs(b.paidOnDate).valueOf(),
      defaultSortOrder: "descend",
      render: (v) => (v ? dayjs(v).format("DD MMM YYYY, hh:mm A") : "—"),
    },
    {
      title: "Receipt",
      dataIndex: "paymentScreenshotUrl",
      key: "receipt",
      width: 120,
      align: "center",
      fixed: "right",
      render: (url) =>
        url ? (
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setActiveImage(url);
              setOpenImage(true);
            }}
            style={{ color: BTN_BLUE }}
          >
            View
          </Button>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
  ];

  return (
    <UserLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 12px" }}>
        {/* Header Card */}
        <Card
          style={{
            borderRadius: 18,
            marginTop: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
          bodyStyle={{ padding: 16 }}
        >
          <Space
            style={{ width: "100%", justifyContent: "space-between" }}
            align="center"
            wrap
          >
            <Space direction="vertical" size={4}>
              <Title level={3} style={{ margin: 0 }}>
                My Payments
              </Title>
              <Text type="secondary">
                Track your event payments and verification status
              </Text>
            </Space>

            <Button
              icon={<ReloadOutlined />}
              onClick={loadPayments}
              loading={loading}
              type="primary"
              style={{
                background: BTN_GREEN,
                borderColor: BTN_GREEN,
                borderRadius: 10,
                fontWeight: 700,
              }}
            >
              Refresh
            </Button>
          </Space>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert
            style={{ marginTop: 12, borderRadius: 12 }}
            type="error"
            showIcon
            message={error}
            description="If you are not logged in, please log in to view your payments."
          />
        )}

        {/* Table Card */}
        <Card
          style={{ marginTop: 12, borderRadius: 18 }}
          bodyStyle={{ padding: 0 }}
        >
          {loading ? (
            <div style={{ padding: 24 }}>
              <Skeleton active paragraph={{ rows: 8 }} />
            </div>
          ) : payments.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No payments found"
              style={{ padding: 48 }}
            />
          ) : (
            <Table
              dataSource={payments}
              columns={columns}
              rowKey="id"
              bordered
              pagination={{
                ...pagination,
                position: ["bottomRight"],
              }}
              onChange={handleTableChange}
              scroll={{ x: 900 }}
              locale={{ emptyText: "No payments found" }}
            />
          )}
        </Card>

        {/* Receipt Preview Modal */}
        <Modal
          open={openImage}
          onCancel={() => setOpenImage(false)}
          footer={null}
          centered
          width={640}
          title="Payment Receipt"
        >
          {activeImage ? (
            <Image
              src={activeImage}
              alt="Payment receipt"
              style={{ borderRadius: 12, maxWidth: "100%" }}
              width="100%"
              preview={{ mask: "Click to zoom" }}
            />
          ) : (
            <Space
              direction="vertical"
              align="center"
              style={{ width: "100%", padding: 40 }}
            >
              <PictureOutlined style={{ fontSize: 48, color: "#ccc" }} />
              <Text type="secondary">No receipt image available</Text>
            </Space>
          )}
        </Modal>
      </div>
    </UserLayout>
  );
}
