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
  Image,
} from "antd";
import {
  CalendarOutlined,
  WalletOutlined,
  PictureOutlined,
  ReadOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  MobileOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const API_BASE = "https://sirivaram-backed.onrender.com";

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
  const [galleryItems, setGalleryItems] = useState([]);

  // You can replace this with actual user data from your auth context
  const userName = "Maneiah"; // Personalised from your display name

  const quickCards = useMemo(
    () => [
      {
        title: "Events",
        desc: "Check upcoming events",
        icon: <CalendarOutlined style={{ fontSize: 20 }} />,
        path: "/events",
        color: "#008cba",
        count: counts.upcomingEvents,
      },
      {
        title: "My Payments",
        desc: "Track payment status",
        icon: <WalletOutlined style={{ fontSize: 20 }} />,
        path: "/payments",
        color: "#1ab394",
        count: counts.payments,
      },
      {
        title: "Gallery",
        desc: "View photos & memories",
        icon: <PictureOutlined style={{ fontSize: 20 }} />,
        path: "/gallery",
        color: "#f59e0b",
        count: counts.gallery,
      },
      {
        title: "Blogs",
        desc: "Read latest blogs",
        icon: <ReadOutlined style={{ fontSize: 20 }} />,
        path: "/blogs",
        color: "#a855f7",
        count: counts.blogs,
      },
    ],
    [counts],
  );

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return "—";
    const s = dayjs(startDate);
    const e = endDate ? dayjs(endDate) : null;
    if (!e || e.isSame(s, "day")) return s.format("DD MMM YYYY");
    return `${s.format("DD MMM YYYY")} - ${e.format("DD MMM YYYY")}`;
  };

  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoading(true);
      try {
        const [eventsRes, paymentsRes, blogsRes, galleryRes] =
          await Promise.all([
            fetch(`${API_BASE}/api/events/upcoming`).catch(() => null),
            fetch(`${API_BASE}/api/payments`).catch(() => null),
            fetch(`${API_BASE}/api/blogs`).catch(() => null),
            fetch(`${API_BASE}/api/gallery`).catch(() => null),
          ]);

        const eventsData = eventsRes ? await safeJson(eventsRes) : null;
        const paymentsData = paymentsRes ? await safeJson(paymentsRes) : null;
        const blogsData = blogsRes ? await safeJson(blogsRes) : null;
        const galleryData = galleryRes ? await safeJson(galleryRes) : null;

        if (!alive) return;

        const eventsList = Array.isArray(eventsData) ? eventsData : [];
        const paymentsList = Array.isArray(paymentsData) ? paymentsData : [];
        const blogsList = Array.isArray(blogsData) ? blogsData : [];
        const galleryList = Array.isArray(galleryData) ? galleryData : [];

        setUpcomingEvents(eventsList.slice(0, 4));
        setRecentPayments(paymentsList.slice(0, 4));
        setLatestBlogs(blogsList.slice(0, 4));
        setGalleryItems(galleryList.slice(0, 6));

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

  return (
    <UserLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Hero / Welcome Card */}
        <Card
          bordered
          style={{ borderRadius: 16, marginBottom: 16 }}
          bodyStyle={{ padding: 24 }}
        >
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Space direction="vertical" size={12}>
                <Title level={3} style={{ margin: 0 }}>
                  Welcome back, {userName}!
                </Title>
                <Text type="secondary">
                  Here's a quick overview of your community activities
                </Text>
               
              </Space>
            </Col>

            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Space wrap size={12}>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: "#008cba",
                    borderColor: "#008cba",
                  }}
                  onClick={() => navigate("/events")}
                  icon={<CalendarOutlined />}
                >
                  View Events
                </Button>
                <Button
                  size="large"
                  style={{
                    backgroundColor: "#1ab394",
                    borderColor: "#1ab394",
                    color: "white",
                  }}
                  onClick={() => navigate("/payments")}
                  icon={<WalletOutlined />}
                >
                  Payments
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Quick action cards */}
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          {quickCards.map((c) => (
            <Col key={c.title} xs={24} sm={12} md={12} lg={6}>
              <Card
                hoverable
                bordered
                style={{
                  borderRadius: 16,
                  height: "100%",
                }}
                bodyStyle={{ padding: 16 }}
                onClick={() => navigate(c.path)}
              >
                <Space direction="vertical" style={{ width: "100%" }} size={10}>
                  <Space
                    align="center"
                    style={{ justifyContent: "space-between", width: "100%" }}
                  >
                    <Avatar
                      shape="square"
                      style={{
                        background: c.color,
                        borderRadius: 12,
                      }}
                      icon={c.icon}
                      size={44}
                    />

                    <Badge
                      count={loading ? "…" : c.count}
                      showZero
                      overflowCount={999}
                      style={{ backgroundColor: "#111827" }}
                    />
                  </Space>

                  <div>
                    <Text style={{ fontSize: 16, fontWeight: 800 }}>
                      {c.title}
                    </Text>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        {c.desc}
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="link"
                      icon={<ArrowRightOutlined />}
                      style={{ padding: 0, color: "#008cba" }}
                    >
                      Open
                    </Button>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main content - Two columns */}
        <Row gutter={[12, 12]}>
          {/* Upcoming Events */}
          <Col xs={24} lg={12}>
            <Card
              bordered
              style={{ borderRadius: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: 800 }}>
                  Upcoming Events
                </Text>
                <Button
                  type="link"
                  onClick={() => navigate("/events")}
                  style={{ padding: 0, color: "#008cba" }}
                >
                  View all
                </Button>
              </Space>

              <Divider style={{ margin: "12px 0" }} />

              {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : upcomingEvents.length === 0 ? (
                <Empty description="No upcoming events" />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={upcomingEvents}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<CalendarOutlined />} />}
                        title={<Text strong>{item?.title || "Event"}</Text>}
                        description={
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {formatDateRange(item?.startDate, item?.endDate)} •{" "}
                            {item?.venue || "—"}
                          </Text>
                        }
                      />
                      <Tag color={item?.isPublic ? "green" : "red"}>
                        {item?.isPublic ? "Public" : "Private"}
                      </Tag>
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          {/* Recent Payments */}
          <Col xs={24} lg={12}>
            <Card
              bordered
              style={{ borderRadius: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: 800 }}>
                  Recent Payments
                </Text>
                <Button
                  type="link"
                  onClick={() => navigate("/payments")}
                  style={{ padding: 0, color: "#008cba" }}
                >
                  View all
                </Button>
              </Space>

              <Divider style={{ margin: "12px 0" }} />

              {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : recentPayments.length === 0 ? (
                <Empty description="No payments found" />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={recentPayments}
                  renderItem={(p) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<WalletOutlined />} />}
                        title={
                          <Space wrap>
                            <Text strong>{p?.payerName || "Payment"}</Text>
                            <Tag
                              color={
                                p?.status === "VERIFIED" ? "green" : "gold"
                              }
                            >
                              {p?.status || "PENDING"}
                            </Tag>
                          </Space>
                        }
                        description={
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Amount: ₹{p?.amount ?? "—"} • {p?.paidOnDate || "—"}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          {/* Latest Blogs */}
          <Col xs={24} lg={12}>
            <Card
              bordered
              style={{ borderRadius: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: 800 }}>
                  Latest Blogs
                </Text>
                <Button
                  type="link"
                  onClick={() => navigate("/blogs")}
                  style={{ padding: 0, color: "#008cba" }}
                >
                  View all
                </Button>
              </Space>

              <Divider style={{ margin: "12px 0" }} />

              {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : latestBlogs.length === 0 ? (
                <Empty description="No blogs available" />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={latestBlogs}
                  renderItem={(b) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<ReadOutlined />} />}
                        title={<Text strong>{b?.title || "Blog"}</Text>}
                        description={
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {b?.createdAt || b?.date || "—"}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          {/* Recent Gallery */}
          <Col xs={24} lg={12}>
            <Card
              bordered
              style={{ borderRadius: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: 800 }}>
                  Recent Gallery
                </Text>
                <Button
                  type="link"
                  onClick={() => navigate("/gallery")}
                  style={{ padding: 0, color: "#008cba" }}
                >
                  View all
                </Button>
              </Space>

              <Divider style={{ margin: "12px 0" }} />

              {loading ? (
                <Skeleton active paragraph={{ rows: 3 }} />
              ) : galleryItems.length === 0 ? (
                <Empty description="No gallery items" />
              ) : (
                <Row gutter={[8, 8]}>
                  {galleryItems.map((g, idx) => (
                    <Col xs={8} sm={6} md={6} key={g?.id || idx}>
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          borderRadius: 12,
                          overflow: "hidden",
                          border: "1px solid #E5E7EB",
                          background: "#F3F4F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        title={g?.title || "Image"}
                      >
                        <Image
                          src={g?.imageUrl || g?.url || g?.photoUrl}
                          alt={`Gallery: ${g?.title || "Untitled image"}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          preview={false}
                          fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzkwOTdBMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob3RvPC90ZXh0Pjwvc3ZnPg=="
                          placeholder={
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                background: "#f5f5f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <PictureOutlined
                                style={{ fontSize: 32, color: "#ccc" }}
                              />
                            </div>
                          }
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </UserLayout>
  );
}
