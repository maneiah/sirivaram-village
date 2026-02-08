import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";


import UserLayout from "../layouts/UserLayout";

import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Skeleton,
  Alert,
  Empty,
  Modal,
  Image,
  Tooltip,
  Divider,
  Form,
  InputNumber,
  message,
  DatePicker,
} from "antd";

import {
  CalendarOutlined,
  EnvironmentOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  SearchOutlined,
  LockOutlined,
  GlobalOutlined,
  WalletOutlined,
  CreditCardOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// ✅ APIs
const EVENTS_API = "https://sirivaram-backed.onrender.com/api/events";
const MY_PAYMENTS_API = "https://sirivaram-backed.onrender.com/api/payments/my";
const PAY_API_BASE = "https://sirivaram-backed.onrender.com/api/payments/event";

// ✅ Button colors
const BTN_BLUE = "#008cba";
const BTN_GREEN = "#1ab394";

// ✅ JWT token helper
const getToken = () => localStorage.getItem("token");

export default function Events() {


  const [events, setEvents] = useState([]);
  const [userPayments, setUserPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortBy, setSortBy] = useState("startDesc");

  // QR modal
  const [qrOpen, setQrOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  // Payment Modal
  const [payOpen, setPayOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const extractEventsArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.events)) return payload.events;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.data?.events)) return payload.data.events;
    return [];
  };

  const loadEvents = async () => {
    try {
      setError("");
      const res = await axios.get(EVENTS_API);
      const list = extractEventsArray(res.data);
      setEvents(Array.isArray(list) ? list : []);
    } catch (err) {
      setEvents([]);
      setError(
        err?.response?.data?.message || err?.message || "Unable to load events",
      );
    }
  };

  const loadUserPayments = async () => {
    const token = getToken();
    if (!token) {
      setUserPayments([]);
      return;
    }

    try {
      const res = await axios.get(MY_PAYMENTS_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = Array.isArray(res.data) ? res.data : [];
      setUserPayments(list);
    } catch (err) {
      setUserPayments([]);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load your payments",
      );
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadEvents(), loadUserPayments()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredEvents = useMemo(() => {
    let list = Array.isArray(events) ? [...events] : [];

    if (visibility !== "all") {
      const wantPublic = visibility === "public";
      list = list.filter((e) => !!e.isPublic === wantPublic);
    }

    if (yearFilter !== "all") {
      list = list.filter((e) => e.year === Number(yearFilter));
    }

    if (debouncedQ) {
      list = list.filter((e) => {
        const t = (e.title || "").toLowerCase();
        const d = (e.description || "").toLowerCase();
        const v = (e.venue || "").toLowerCase();
        return (
          t.includes(debouncedQ) ||
          d.includes(debouncedQ) ||
          v.includes(debouncedQ)
        );
      });
    }

    list.sort((a, b) => {
      const da = dayjs(a.startDate).valueOf();
      const db = dayjs(b.startDate).valueOf();
      return sortBy === "startDesc" ? db - da : da - db;
    });

    return list;
  }, [events, visibility, yearFilter, sortBy, debouncedQ]);

  const availableYears = useMemo(() => {
    const years = [...new Set(events.map((e) => e.year).filter(Boolean))];
    return years.sort((a, b) => b - a);
  }, [events]);

  const openQr = (url) => {
    if (!url) return;
    setQrUrl(url);
    setQrOpen(true);
  };

  const openPayModal = (event) => {
    setSelectedEvent(event);
    setPayOpen(true);

    form.setFieldsValue({
      amount: event?.ticketPrice ?? 0,
      paymentTxnId: "",
      paymentScreenshotUrl: "",
      paidOnDate: dayjs(),
      year: dayjs().year(),
    });
  };

  const submitPayment = async () => {
    try {
      const token = getToken();
      if (!token) {
        message.error("Authentication required. Please log in again.");
        return;
      }
      if (!selectedEvent?.id) return;

      const values = await form.validateFields();
      setPaying(true);

      const payload = {
        amount: Number(values.amount),
        paymentTxnId: values.paymentTxnId?.trim() || "",
        paymentScreenshotUrl: values.paymentScreenshotUrl?.trim() || "",
        paidOnDate: values.paidOnDate.toISOString(),
        year: Number(values.year || dayjs().year()),
      };

      await axios.post(`${PAY_API_BASE}/${selectedEvent.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Payment submitted! Admin will verify soon.");
      setPayOpen(false);
      setSelectedEvent(null);
      form.resetFields();

      // Refresh user payments to update status/button immediately
      await loadUserPayments();
    } catch (err) {
      message.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit payment",
      );
    } finally {
      setPaying(false);
    }
  };

  const formatTicketPrice = (price) => {
    const p = Number(price ?? 0);
    return p > 0 ? `₹${p.toFixed(0)}` : "Free";
  };

  const getPaymentForEvent = (eventId) => {
    return userPayments.find((p) => p.eventId === eventId);
  };

  const getStatusDisplay = (payment) => {
    if (!payment) return null;

    let color = "orange";
    let text = "Pending";

    if (payment.status === "VERIFIED") {
      color = "green";
      text = "Verified";
    } else if (payment.status === "REJECTED") {
      color = "red";
      text = "Rejected";
    } else if (payment.status === "PENDING_VERIFICATION") {
      text = "Pending";
    }

    return (
      <Tag
        color={color}
        style={{
          borderRadius: 999,
          height: 32,
          display: "flex",
          alignItems: "center",
        }}
      >
        {text}
      </Tag>
    );
  };

  return (
    <UserLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 12px" }}>
        {/* Header Card */}
        <Card
          style={{
            borderRadius: 18,
            marginTop: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
          bodyStyle={{ padding: 16 }}
        >
          <Row gutter={[12, 12]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Space direction="vertical" size={4}>
                <Title level={3} style={{ margin: 0 }}>
                  Events
                </Title>
                <Text type="secondary">
                  Browse all events (past & upcoming), view details, QR codes,
                  and submit payment proof.
                </Text>
              </Space>
            </Col>

            <Col
              xs={24}
              md={10}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Space wrap>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadData}
                  loading={loading}
                  style={{
                    borderRadius: 10,
                    borderColor: BTN_GREEN,
                    color: BTN_GREEN,
                  }}
                >
                  Refresh
                </Button>
                <Tag
                  style={{
                    borderRadius: 999,
                    padding: "4px 10px",
                    background: "#f6ffed",
                    borderColor: "#b7eb8f",
                    color: "#389e0d",
                  }}
                >
                  Showing: <b>{filteredEvents.length}</b>
                </Tag>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "14px 0" }} />

          {/* Filters */}
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} sm={24} md={12}>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by title, venue, description..."
                style={{ borderRadius: 12, height: 40 }}
              />
            </Col>

            <Col xs={12} sm={8} md={4}>
              <Select
                value={visibility}
                onChange={setVisibility}
                style={{ width: "100%", height: 40 }}
                options={[
                  { value: "all", label: "All" },
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                ]}
              />
            </Col>

            <Col xs={12} sm={8} md={4}>
              <Select
                value={yearFilter}
                onChange={setYearFilter}
                style={{ width: "100%", height: 40 }}
                options={[
                  { value: "all", label: "All Years" },
                  ...availableYears.map((y) => ({ value: String(y), label: String(y) })),
                ]}
              />
            </Col>

          
          </Row>
        </Card>

        {/* Error */}
        {error && !loading && (
          <Alert
            style={{ marginTop: 12, borderRadius: 14 }}
            type="error"
            message="Unable to load events"
            description={
              <Space direction="vertical" size={8}>
                <Text>{error}</Text>
                <Button
                  onClick={loadData}
                  icon={<ReloadOutlined />}
                  style={{
                    borderRadius: 10,
                    background: BTN_GREEN,
                    borderColor: BTN_GREEN,
                    color: "#fff",
                  }}
                >
                  Try again
                </Button>
              </Space>
            }
            showIcon
          />
        )}

        {/* Empty */}
        {!error && !loading && filteredEvents.length === 0 && (
          <Card style={{ marginTop: 12, borderRadius: 16 }}>
            <Empty description="No events found" />
          </Card>
        )}

        {/* Events Grid */}
        <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} lg={8}>
                  <Card style={{ borderRadius: 16 }}>
                    <Skeleton active paragraph={{ rows: 4 }} />
                  </Card>
                </Col>
              ))
            : filteredEvents.map((e) => {
                const hasPrice = (e.ticketPrice ?? 0) > 0;
                const userPayment = getPaymentForEvent(e.id);
                const paymentStatus = userPayment?.status;

                const showPayButton =
                  hasPrice && (!paymentStatus || paymentStatus === "REJECTED");

                return (
                  <Col key={e.id} xs={24} sm={12} lg={8}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: 16,
                        height: "100%",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        border: "1px solid #f0f0f0",
                      }}
                      bodyStyle={{ padding: 20 }}
                    >
                      <Space
                        direction="vertical"
                        size={14}
                        style={{ width: "100%" }}
                      >
                        {/* Header with Title and Status */}
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 8,
                            }}
                          >
                            <Title
                              level={5}
                              style={{
                                margin: 0,
                                fontSize: 17,
                                fontWeight: 700,
                                flex: 1,
                              }}
                              ellipsis={{ rows: 2 }}
                            >
                              {e.title || "Event"}
                            </Title>
                            <Tag
                              icon={
                                e.isPublic ? (
                                  <GlobalOutlined />
                                ) : (
                                  <LockOutlined />
                                )
                              }
                              color={e.isPublic ? "success" : "error"}
                              style={{ margin: 0, borderRadius: 8 }}
                            >
                              {e.isPublic ? "Public" : "Private"}
                            </Tag>
                          </div>

                          {/* Date Range Display */}
                          <Space size={4} style={{ marginBottom: 4 }}>
                            <CalendarOutlined
                              style={{ color: "#1890ff", fontSize: 14 }}
                            />
                            <Text strong style={{ fontSize: 14, color: "#1890ff" }}>
                              {dayjs(e.startDate).format("DD MMM YYYY")}
                              {e.endDate &&
                                dayjs(e.endDate).format("YYYYMMDD") !==
                                  dayjs(e.startDate).format("YYYYMMDD") &&
                                ` - ${dayjs(e.endDate).format("DD MMM YYYY")}`}
                            </Text>
                          </Space>

                          {/* Event Status Tag */}
                          <Tag
                            color={
                              dayjs(e.startDate).isAfter(dayjs())
                                ? "processing"
                                : "default"
                            }
                            style={{ borderRadius: 8, fontSize: 12 }}
                          >
                            {dayjs(e.startDate).isAfter(dayjs())
                              ? "🎉 Upcoming"
                              : "📅 Past Event"}
                          </Tag>
                        </div>

                        <Divider style={{ margin: 0 }} />

                        {/* Description */}
                        <Text
                          type="secondary"
                          style={{
                            fontSize: 13,
                            lineHeight: 1.6,
                            display: "block",
                            minHeight: 60,
                          }}
                        >
                          {(e.description || "No description available").length > 120
                            ? `${(e.description || "No description available").slice(0, 120)}...`
                            : e.description || "No description available"}
                        </Text>

                        {/* Venue and Price Info */}
                        <Space direction="vertical" size={8} style={{ width: "100%" }}>
                          <Space size={8}>
                            <EnvironmentOutlined
                              style={{ color: "#52c41a", fontSize: 16 }}
                            />
                            <Text style={{ fontSize: 13 }}>
                              <Text strong>Venue:</Text> {e.venue || "TBA"}
                            </Text>
                          </Space>
                          <Space size={8}>
                            <WalletOutlined
                              style={{ color: "#faad14", fontSize: 16 }}
                            />
                            <Text style={{ fontSize: 13 }}>
                              <Text strong>Price:</Text> {formatTicketPrice(e.ticketPrice)}
                            </Text>
                          </Space>
                        </Space>

                        <Divider style={{ margin: 0 }} />

                        {/* Action Buttons */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                        >
                          <Space size={8}>
                            {getStatusDisplay(userPayment)}

                            {showPayButton && (
                              <Button
                                type="primary"
                                icon={<CreditCardOutlined />}
                                onClick={() => openPayModal(e)}
                                style={{
                                  borderRadius: 8,
                                  background: BTN_GREEN,
                                  borderColor: BTN_GREEN,
                                  fontWeight: 600,
                                }}
                                size="small"
                              >
                                Pay Now
                              </Button>
                            )}
                          </Space>

                          <Tooltip
                            title={e.qrImageUrl ? "View QR Code" : "No QR available"}
                          >
                            <Button
                              disabled={!e.qrImageUrl}
                              icon={<QrcodeOutlined />}
                              onClick={() => openQr(e.qrImageUrl)}
                              style={{
                                borderRadius: 8,
                                background: e.qrImageUrl ? BTN_BLUE : "#f5f5f5",
                                borderColor: e.qrImageUrl ? BTN_BLUE : "#d9d9d9",
                                color: e.qrImageUrl ? "#fff" : "#bfbfbf",
                                fontWeight: 600,
                              }}
                              size="small"
                            >
                              QR Code
                            </Button>
                          </Tooltip>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                );
              })}
        </Row>
      </div>

      {/* QR Modal */}
      <Modal
        open={qrOpen}
        onCancel={() => setQrOpen(false)}
        footer={null}
        title="Event QR Code"
        centered
      >
        {qrUrl ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={qrUrl}
              alt="Event QR"
              style={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
              width={300}
            />
          </div>
        ) : (
          <Empty description="No QR available" />
        )}
      </Modal>

      {/* Payment Modal */}
      <Modal
        open={payOpen}
        onCancel={() => {
          setPayOpen(false);
          setSelectedEvent(null);
          form.resetFields();
        }}
        title={
          selectedEvent
            ? `Payment for: ${selectedEvent.title}`
            : "Submit Payment"
        }
        onOk={submitPayment}
        confirmLoading={paying}
        okText="Submit Payment"
        centered
        okButtonProps={{
          style: {
            background: BTN_GREEN,
            borderColor: BTN_GREEN,
            fontWeight: 700,
          },
        }}
      >
        <Text type="secondary">
          Submit your payment proof. Admin will review and verify it.
        </Text>
        <Divider />
        <Form form={form} layout="vertical">
          <Form.Item
            label="Amount (₹)"
            name="amount"
            rules={[{ required: true }]}
          >
            <InputNumber disabled precision={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Transaction ID (optional)" name="paymentTxnId">
            <Input placeholder="e.g., UPI TXN ID" />
          </Form.Item>

          <Form.Item
            label="Screenshot URL (optional)"
            name="paymentScreenshotUrl"
          >
            <Input placeholder="Paste direct image link (imgbb.com, etc.)" />
          </Form.Item>

          <Form.Item
            label="Paid On"
            name="paidOnDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Year (optional)" name="year">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </UserLayout>
  );
}
