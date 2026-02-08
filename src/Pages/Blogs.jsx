import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UserLayout from "../layouts/UserLayout";

import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Input,
  Select,
  Skeleton,
  Alert,
  Empty,
  Modal,
  Image,
  Tag,
  Divider,
} from "antd";

import {
  ReloadOutlined,
  SearchOutlined,
  CalendarOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// Brand colors (consistent with Events & Dashboard)
const BTN_GREEN = "#1ab394";
const BTN_BLUE = "#008cba";

const API_URL = "https://sirivaram-backed.onrender.com/api/blogs";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI controls
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortBy, setSortBy] = useState("new"); // new | old

  // Image preview modal
  const [imgOpen, setImgOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [imgTitle, setImgTitle] = useState("");

  // Debounce search for better performance
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const extractArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.blogs)) return payload.blogs;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const loadBlogs = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios.get(API_URL);
      const list = extractArray(res.data);
      setBlogs(Array.isArray(list) ? list : []);
    } catch (err) {
      setBlogs([]);
      setError(
        err?.response?.data?.message || err?.message || "Unable to load blogs",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    let list = Array.isArray(blogs) ? [...blogs] : [];

    // Filter only active blogs
    list = list.filter((b) => b.isActive !== false);

    // Year filter
    if (yearFilter !== "all") {
      list = list.filter((b) => b.year === Number(yearFilter));
    }

    const query = debouncedQ;

    // Search by title or description
    if (query) {
      list = list.filter((b) => {
        const t = (b.title || "").toLowerCase();
        const d = (b.description || "").toLowerCase();
        return t.includes(query) || d.includes(query);
      });
    }

    // Sort by createdAt
    list.sort((a, b) => {
      const da = dayjs(a.createdAt).valueOf();
      const db = dayjs(b.createdAt).valueOf();
      return sortBy === "new" ? db - da : da - db;
    });

    return list;
  }, [blogs, debouncedQ, yearFilter, sortBy]);

  const availableYears = useMemo(() => {
    const years = [...new Set(blogs.map((b) => b.year).filter(Boolean))];
    return years.sort((a, b) => b - a);
  }, [blogs]);

  const openImage = (url, title) => {
    if (!url) return;
    setImgUrl(url);
    setImgTitle(title || "Blog Image");
    setImgOpen(true);
  };

  return (
    <UserLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 12px" }}>
        {/* Header Card */}
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            marginTop: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          bodyStyle={{ padding: 20 }}
        >
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Space direction="vertical" size={4}>
                <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                  📰 Latest Blogs & Updates
                </Title>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Explore community updates with previews and full-size images
                </Text>
              </Space>
            </Col>

            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Space wrap>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadBlogs}
                  loading={loading}
                  style={{
                    borderRadius: 8,
                    height: 40,
                    borderColor: BTN_GREEN,
                    color: BTN_GREEN,
                    fontWeight: 600,
                  }}
                >
                  Refresh
                </Button>
                <Tag
                  color="processing"
                  style={{
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  Total: <b>{filteredBlogs.length}</b>
                </Tag>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "16px 0" }} />

          {/* Filters */}
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} sm={24} md={12}>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by title or description..."
                style={{ borderRadius: 8, height: 40 }}
              />
            </Col>

            <Col xs={12} sm={8} md={5}>
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

            <Col xs={12} sm={8} md={5}>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%", height: 40 }}
                options={[
                  { value: "new", label: "Newest first" },
                  { value: "old", label: "Oldest first" },
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
            message="Unable to load blogs"
            description={
              <Space direction="vertical" size={8}>
                <Text>{error}</Text>
                <Button
                  onClick={loadBlogs}
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
        {!error && !loading && filteredBlogs.length === 0 && (
          <Card style={{ marginTop: 12, borderRadius: 16 }}>
            <Empty description="No blogs found" />
          </Card>
        )}

        {/* Blogs Grid */}
        <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} lg={8}>
                  <Card style={{ borderRadius: 16 }}>
                    <Skeleton.Image
                      active
                      style={{ width: "100%", height: 200 }}
                    />
                    <div style={{ marginTop: 12 }}>
                      <Skeleton active paragraph={{ rows: 4 }} />
                    </div>
                  </Card>
                </Col>
              ))
            : filteredBlogs.map((b) => {
                const hasImage = !!b.imageUrl;
                const created = dayjs(b.createdAt);

                return (
                  <Col key={b.id} xs={24} sm={12} lg={8}>
                    <Card
                      hoverable
                      bordered={false}
                      style={{
                        borderRadius: 12,
                        height: "100%",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      bodyStyle={{ padding: 0, flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      {/* Image Cover */}
                      {hasImage ? (
                        <div
                          style={{
                            cursor: "pointer",
                            height: 200,
                            background: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                          onClick={() => openImage(b.imageUrl, b.title)}
                        >
                          <img
                            src={b.imageUrl}
                            alt={b.title || "Blog cover"}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              width: "auto",
                              height: "auto",
                              display: "block",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            height: 200,
                            background: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#9ca3af",
                          }}
                        >
                          <Space>
                            <PictureOutlined style={{ fontSize: 32 }} />
                            <Text>No Image</Text>
                          </Space>
                        </div>
                      )}

                      {/* Content */}
                      <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                        <Space
                          direction="vertical"
                          size={10}
                          style={{ width: "100%", flex: 1 }}
                        >
                          <Title
                            level={5}
                            style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}
                          >
                            {b.title || "Untitled Blog"}
                          </Title>

                          <Space size={6} style={{ color: "#6B7280" }}>
                            <CalendarOutlined />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {created.isValid()
                                ? created.format("DD MMM YYYY")
                                : "—"}
                            </Text>
                          </Space>

                          <Paragraph
                            type="secondary"
                            style={{ marginBottom: 0, fontSize: 13, lineHeight: 1.6 }}
                          >
                            {b.description || "No description available."}
                          </Paragraph>
                        </Space>
                      </div>
                    </Card>
                  </Col>
                );
              })}
        </Row>
      </div>

      {/* Image Preview Modal */}
      <Modal
        open={imgOpen}
        onCancel={() => setImgOpen(false)}
        footer={null}
        title={imgTitle}
        centered
        width={800}
      >
        {imgUrl ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={imgUrl}
              alt={imgTitle}
              style={{ borderRadius: 12, maxWidth: "100%" }}
              width="100%"
            />
          </div>
        ) : (
          <Empty description="No image available" />
        )}
      </Modal>
    </UserLayout>
  );
}
