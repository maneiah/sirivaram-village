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
  }, [blogs, debouncedQ, sortBy]);

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
                  Latest Blogs & Updates
                </Title>
                <Text type="secondary">
                  Explore community updates with previews and full-size images.
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
                  onClick={loadBlogs}
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
                    marginInlineEnd: 0,
                    background: "#f6ffed",
                    borderColor: "#b7eb8f",
                    color: "#389e0d",
                  }}
                >
                  Showing: <b>{filteredBlogs.length}</b>
                </Tag>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "14px 0" }} />

          {/* Filters */}
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} md={14}>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by title or description..."
                style={{ borderRadius: 12, height: 40 }}
              />
            </Col>

            <Col xs={24} md={10}>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%" }}
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
                      style={{
                        borderRadius: 16,
                        height: "100%",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                      }}
                      bodyStyle={{
                        padding: 14,
                        display: "flex",
                        flexDirection: "column",
                      }}
                      cover={
                        hasImage ? (
                          <div
                            style={{
                              cursor: "pointer",
                              borderRadius: "16px 16px 0 0",
                              overflow: "hidden",
                            }}
                            onClick={() => openImage(b.imageUrl, b.title)}
                          >
                            <Image
                              preview={false}
                              src={b.imageUrl}
                              alt={b.title || "Blog cover"}
                              style={{
                                width: "100%",
                                height: 200,
                                objectFit: "cover",
                              }}
                              fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='24'%3ENo Image%3C/text%3E%3C/svg%3E"
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
                              fontSize: 18,
                              fontWeight: 700,
                              borderRadius: "16px 16px 0 0",
                            }}
                          >
                            <Space>
                              <PictureOutlined style={{ fontSize: 32 }} />
                              No Image
                            </Space>
                          </div>
                        )
                      }
                    >
                      <Space
                        direction="vertical"
                        size={12}
                        style={{ width: "100%", flex: 1 }}
                      >
                        <Text
                          style={{ fontSize: 16, fontWeight: 800 }}
                          ellipsis={{ tooltip: b.title }}
                        >
                          {b.title || "Untitled Blog"}
                        </Text>

                        <Space size={6} style={{ color: "#6B7280" }}>
                          <CalendarOutlined />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {created.isValid()
                              ? created.format("DD MMM YYYY, hh:mm A")
                              : "—"}
                          </Text>
                        </Space>

                        <Paragraph
                          type="secondary"
                          ellipsis={{ rows: 4 }}
                          style={{ marginBottom: 0, fontSize: 13 }}
                        >
                          {b.description || "No description available."}
                        </Paragraph>
                      </Space>
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
