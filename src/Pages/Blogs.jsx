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
  Tooltip,
} from "antd";

import {
  ReloadOutlined,
  SearchOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const API_URL = "https://sirivaram-backed.onrender.com/api/blogs";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI controls
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("new"); // new | old

  // image modal
  const [imgOpen, setImgOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

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

      setBlogs(list);
    } catch (err) {
      setBlogs([]);
      setError(err?.response?.data?.message || err?.message || "Unable to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = Array.isArray(blogs) ? [...blogs] : [];

    // search
    if (query) {
      list = list.filter((b) => {
        const t = (b.title || "").toLowerCase();
        const d = (b.description || "").toLowerCase();
        return t.includes(query) || d.includes(query);
      });
    }

    // sort
    list.sort((a, b) => {
      const da = dayjs(a.createdAt).valueOf();
      const db = dayjs(b.createdAt).valueOf();
      return sortBy === "new" ? db - da : da - db;
    });

    return list;
  }, [blogs, q, sortBy]);

  const openImage = (url) => {
    if (!url) return;
    setImgUrl(url);
    setImgOpen(true);
  };

  const openVideo = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <UserLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <Row gutter={[12, 12]} align="middle" justify="space-between">
          <Col xs={24} md={12}>
            <Space direction="vertical" size={2}>
              <Title level={3} style={{ margin: 0 }}>
                Blogs
              </Title>
              <Text type="secondary">
                Explore the latest updates. Search, preview images, and open videos.
              </Text>
            </Space>
          </Col>

          <Col xs={24} md={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button icon={<ReloadOutlined />} onClick={loadBlogs} loading={loading}>
              Refresh
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Card style={{ marginTop: 12, borderRadius: 16 }} bodyStyle={{ padding: 14 }}>
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} md={14}>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search blogs by title or description..."
              />
            </Col>

            <Col xs={24} md={6}>
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

            <Col xs={24} md={4} style={{ textAlign: "right" }}>
              <Text type="secondary">
                Showing <b>{filteredBlogs.length}</b>
              </Text>
            </Col>
          </Row>
        </Card>

        {/* States */}
        {error && !loading && (
          <Alert
            style={{ marginTop: 12, borderRadius: 12 }}
            type="error"
            message="Unable to load blogs"
            description={
              <Space direction="vertical" size={8}>
                <Text>{error}</Text>
                <Button onClick={loadBlogs} icon={<ReloadOutlined />}>
                  Try again
                </Button>
              </Space>
            }
            showIcon
          />
        )}

        {!error && !loading && filteredBlogs.length === 0 && (
          <Card style={{ marginTop: 12, borderRadius: 16 }}>
            <Empty description="No blogs found" />
          </Card>
        )}

        {/* Grid */}
        <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} lg={8}>
                  <Card style={{ borderRadius: 16 }}>
                    <Skeleton.Image active style={{ width: "100%", height: 160 }} />
                    <div style={{ marginTop: 12 }}>
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </div>
                  </Card>
                </Col>
              ))
            : filteredBlogs.map((b) => {
                const hasImage = !!b.imageUrl;
                const hasVideo = !!b.videoUrl;
                const created = dayjs(b.createdAt);

                return (
                  <Col key={b.id} xs={24} sm={12} lg={8}>
                    <Card
                      hoverable
                      style={{ borderRadius: 16, height: "100%" }}
                      bodyStyle={{ padding: 14, display: "flex", flexDirection: "column" }}
                      cover={
                        hasImage ? (
                          <div style={{ position: "relative" }}>
                            <Image
                              preview={false}
                              src={b.imageUrl}
                              alt="blog"
                              style={{ width: "100%", height: 180, objectFit: "cover" }}
                              fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='24'%3ENo Image%3C/text%3E%3C/svg%3E"
                            />
                            {hasVideo && (
                              <Tag
                                color="purple"
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  left: 10,
                                  borderRadius: 999,
                                  fontWeight: 700,
                                }}
                              >
                                VIDEO
                              </Tag>
                            )}
                          </div>
                        ) : (
                          <div
                            style={{
                              height: 180,
                              background: "#f3f4f6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#9ca3af",
                              fontWeight: 700,
                            }}
                          >
                            <Space>
                              <PictureOutlined />
                              No Image
                            </Space>
                          </div>
                        )
                      }
                    >
                      <Space direction="vertical" size={8} style={{ width: "100%" }}>
                        <Text style={{ fontSize: 16, fontWeight: 800 }} ellipsis>
                          {b.title || "Blog"}
                        </Text>

                        <Space size={8} style={{ color: "#6B7280" }}>
                          <CalendarOutlined />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {created.isValid() ? created.format("DD MMM YYYY, hh:mm A") : "—"}
                          </Text>
                        </Space>

                        <Paragraph
                          type="secondary"
                          style={{ marginBottom: 0, fontSize: 13 }}
                          ellipsis={{ rows: 3 }}
                        >
                          {b.description || "—"}
                        </Paragraph>

                        {/* Actions */}
                        <div style={{ marginTop: "auto" }}>
                          <Row gutter={[8, 8]}>
                            <Col xs={12}>
                              <Tooltip title={hasImage ? "Preview Image" : "No image available"}>
                                <Button
                                  block
                                  icon={<EyeOutlined />}
                                  onClick={() => openImage(b.imageUrl)}
                                  disabled={!hasImage}
                                >
                                  Image
                                </Button>
                              </Tooltip>
                            </Col>

                            <Col xs={12}>
                              <Tooltip title={hasVideo ? "Open Video" : "No video available"}>
                                <Button
                                  block
                                  type="primary"
                                  icon={<PlayCircleOutlined />}
                                  onClick={() => openVideo(b.videoUrl)}
                                  disabled={!hasVideo}
                                >
                                  Video
                                </Button>
                              </Tooltip>
                            </Col>
                          </Row>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                );
              })}
        </Row>
      </div>

      {/* Image Modal */}
      <Modal
        open={imgOpen}
        onCancel={() => setImgOpen(false)}
        footer={null}
        title="Blog Image"
        centered
      >
        {imgUrl ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={imgUrl}
              alt="blog"
              style={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
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
