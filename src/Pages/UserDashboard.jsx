import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Button,
  List,
  Avatar,
  Tag,
  Badge,
  Skeleton,
  Empty,
  Divider,
  message,
  Progress,
  Statistic,
} from "antd";
import {
  CalendarOutlined,
  WalletOutlined,
  PictureOutlined,
  ReadOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const API_BASE = "https://sirivaram-backed.onrender.com";

const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const safeStr = (v) => (v === null || v === undefined ? "" : String(v));

const formatDateRange = (startDate, endDate) => {
  if (!startDate) return "—";
  const s = dayjs(startDate);
  const e = endDate ? dayjs(endDate) : null;
  if (!e || e.isSame(s, "day")) return s.format("DD MMM YYYY");
  return `${s.format("DD MMM YYYY")} - ${e.format("DD MMM YYYY")}`;
};



export default function UserDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [counts, setCounts] = useState({
    upcomingEvents: 0,
    payments: 0,
    gallery: 0,
    blogs: 0,
  });

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const quickCards = useMemo(
    () => [
      {
        title: "Events",
        desc: "Upcoming events",
        icon: <CalendarOutlined style={{ fontSize: 24 }} />,
        path: "/events",
        color: "#1890ff",
        count: counts.upcomingEvents,
      },
      {
        title: "Payments",
        desc: "Payment records",
        icon: <WalletOutlined style={{ fontSize: 24 }} />,
        path: "/payments",
        color: "#52c41a",
        count: counts.payments,
      },
      {
        title: "Gallery",
        desc: "Photo memories",
        icon: <PictureOutlined style={{ fontSize: 24 }} />,
        path: "/gallery",
        color: "#faad14",
        count: counts.gallery,
      },
      {
        title: "Blogs",
        desc: "Latest articles",
        icon: <ReadOutlined style={{ fontSize: 24 }} />,
        path: "/blogs",
        color: "#722ed1",
        count: counts.blogs,
      },
    ],
    [counts],
  );

  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoading(true);

      try {
        const [meRes, eventsRes, paymentsRes, blogsRes, galleryRes] =
          await Promise.all([
            fetch(`${API_BASE}/api/users/me`, {
              headers: { ...getAuthHeaders() },
            }).catch(() => null),

            fetch(`${API_BASE}/api/events/upcoming`).catch(() => null),
            fetch(`${API_BASE}/api/payments/my`, {
              headers: { ...getAuthHeaders() },
            }).catch(() => null),
            fetch(`${API_BASE}/api/blogs`).catch(() => null),
            fetch(`${API_BASE}/api/gallery`).catch(() => null),
          ]);

        const meData = meRes ? await safeJson(meRes) : null;
        const eventsData = eventsRes ? await safeJson(eventsRes) : null;
        const paymentsData = paymentsRes ? await safeJson(paymentsRes) : null;
        const blogsData = blogsRes ? await safeJson(blogsRes) : null;
        const galleryData = galleryRes ? await safeJson(galleryRes) : null;

        if (!alive) return;

        if (meRes?.ok && meData) {
          setUser(meData);
        } else {
          setUser(null);
        }

        const eventsList = Array.isArray(eventsData) ? eventsData : [];
        const paymentsList = Array.isArray(paymentsData) ? paymentsData : [];
        const blogsList = Array.isArray(blogsData) ? blogsData : [];
        const galleryList = Array.isArray(galleryData) ? galleryData : [];

        setUpcomingEvents(eventsList.slice(0, 5));
        setRecentPayments(paymentsList.slice(0, 5));
        setLatestBlogs(blogsList.slice(0, 5));

        setCounts({
          upcomingEvents: eventsList.length,
          payments: paymentsList.length,
          gallery: galleryList.length,
          blogs: blogsList.length,
        });
      } catch (err) {
        message.warning(err?.message || "Dashboard data not loaded.");
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, []);

  const name = localStorage.getItem("name") || (user ? user.name : "User");

  // Calculate payment stats
  const verifiedPayments = recentPayments.filter(
    (p) => p?.status === "VERIFIED"
  ).length;
  const pendingPayments = recentPayments.filter(
    (p) => p?.status === "PENDING"
  ).length;
  const paymentCompletionRate =
    counts.payments > 0
      ? Math.round((verifiedPayments / counts.payments) * 100)
      : 0;

  return (
    <UserLayout>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 16px" }}>
        {/* Hero Welcome Card */}
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            marginBottom: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          bodyStyle={{ padding: "32px 24px" }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={16}>
              <Space direction="vertical" size={16}>
                <Title level={2} style={{ margin: 0 }}>
                  🎉 Welcome {name}!
                </Title>

                <Text style={{ fontSize: 16 }} type="secondary">
                  Track your community activities and stay connected
                </Text>
              </Space>
            </Col>

            <Col xs={24} lg={8} style={{ textAlign: "center" }}>
              <Space wrap size={12} style={{ justifyContent: "center" }}>
                <Button
                  style={{ backgroundColor: "#008cba", color: "white" }}
                  size="large"
                  onClick={() => navigate("/events")}
                  icon={<CalendarOutlined />}
                >
                  View Events
                </Button>
                <Button
                  size="large"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                  onClick={() => navigate("/payments")}
                  icon={<WalletOutlined />}
                >
                  Payments
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Quick Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {quickCards.map((c) => (
            <Col key={c.title} xs={12} sm={12} md={6} lg={6}>
              <Card
                hoverable
                bordered={false}
                style={{
                  borderRadius: 16,
                  height: "100%",
                  background: c.color,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
                bodyStyle={{ padding: 20 }}
                onClick={() => navigate(c.path)}
              >
                <Space direction="vertical" style={{ width: "100%" }} size={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: 12,
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      {c.icon}
                    </div>
                    <Title
                      level={2}
                      style={{ margin: 0, fontWeight: 700, color: "#fff" }}
                    >
                      {loading ? "..." : c.count}
                    </Title>
                  </div>

                  <div>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        display: "block",
                        color: "#fff",
                      }}
                    >
                      {c.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {c.desc}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Analytics Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Statistic
                title={
                  <Text style={{ fontSize: 14, color: "#8c8c8c" }}>
                    Payment Completion
                  </Text>
                }
                value={paymentCompletionRate}
                suffix="%"
                prefix={<RiseOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a", fontSize: 28, fontWeight: 700 }}
              />
              <Progress
                percent={paymentCompletionRate}
                strokeColor={{
                  "0%": "#52c41a",
                  "100%": "#73d13d",
                }}
                showInfo={false}
                style={{ marginTop: 12 }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Statistic
                title={
                  <Text style={{ fontSize: 14, color: "#8c8c8c" }}>
                    Verified Payments
                  </Text>
                }
                value={verifiedPayments}
                prefix={<CheckCircleOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff", fontSize: 28, fontWeight: 700 }}
              />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 8 }}>
                Out of {counts.payments} total
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Statistic
                title={
                  <Text style={{ fontSize: 14, color: "#8c8c8c" }}>
                    Pending Actions
                  </Text>
                }
                value={pendingPayments}
                prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14", fontSize: 28, fontWeight: 700 }}
              />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 8 }}>
                Requires attention
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={[16, 16]}>
          {/* Upcoming Events */}
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                height: "100%",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Space>
                  <CalendarOutlined
                    style={{ fontSize: 20, color: "#667eea" }}
                  />
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>
                    Upcoming Events
                  </Text>
                </Space>
                <Button
                  type="link"
                  onClick={() => navigate("/events")}
                  style={{ padding: 0, fontWeight: 600, color: "#008cba" }}
                  icon={<ArrowRightOutlined />}
                >
                  View all
                </Button>
              </div>

              <Divider style={{ margin: "12px 0 16px" }} />

              {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : upcomingEvents.length === 0 ? (
                <Empty
                  description="No upcoming events"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={upcomingEvents}
                  renderItem={(item) => (
                    <List.Item style={{ padding: "12px 0", border: "none" }}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            icon={<CalendarOutlined />}
                            style={{ background: "#1890ff" }}
                            size={44}
                          />
                        }
                        title={
                          <Text strong style={{ fontSize: 15 }}>
                            {item?.title || "Event"}
                          </Text>
                        }
                        description={
                          <Space direction="vertical" size={4}>
                            <Text type="secondary" style={{ fontSize: 13 }}>
                              📅{" "}
                              {formatDateRange(item?.startDate, item?.endDate)}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 13 }}>
                              📍 {item?.venue || "—"}
                            </Text>
                          </Space>
                        }
                      />
                      <Tag
                        color={item?.isPublic ? "success" : "default"}
                        style={{ borderRadius: 8 }}
                      >
                        {item?.isPublic ? "Public" : "Private"}
                      </Tag>
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          {/* Latest Blogs */}
          <Col xs={24} lg={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                height: "100%",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Space>
                  <ReadOutlined style={{ fontSize: 20, color: "#43e97b" }} />
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>
                    Latest Blogs
                  </Text>
                </Space>
                <Button
                  type="link"
                  onClick={() => navigate("/blogs")}
                  style={{ padding: 0, fontWeight: 600 }}
                  icon={<ArrowRightOutlined />}
                >
                  View all
                </Button>
              </div>

              <Divider style={{ margin: "12px 0 16px" }} />

              {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : latestBlogs.length === 0 ? (
                <Empty
                  description="No blogs available"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={latestBlogs}
                  renderItem={(b) => (
                    <List.Item style={{ padding: "12px 0", border: "none" }}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            icon={<ReadOutlined />}
                            style={{ background: "#722ed1" }}
                            size={44}
                          />
                        }
                        title={
                          <Text strong style={{ fontSize: 15 }}>
                            {b?.title || "Blog"}
                          </Text>
                        }
                        description={
                          <Text type="secondary" style={{ fontSize: 13 }}>
                            📝 {b?.createdAt || b?.date || "—"}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </UserLayout>
  );
}
