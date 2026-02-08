import React, { useEffect, useMemo, useState } from "react";
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
  Empty,
  Alert,
  Modal,
  Image,
  Tag,
  Divider,
} from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  ClockCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const API_BASE = "https://sirivaram-backed.onrender.com";

const BTN_GREEN = "#1ab394";

const getToken = () =>
  localStorage.getItem("token") || localStorage.getItem("accessToken") || "";

export default function Gallery() {
  const [year, setYear] = useState(dayjs().year());
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openImage, setOpenImage] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const [openVideo, setOpenVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const loadGallery = async () => {
    try {
      setError("");
      setLoading(true);

      const token = getToken();

      const res = await fetch(`${API_BASE}/api/gallery?year=${year}`, {
        headers: {
          Accept: "*/*",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Gallery API failed (${res.status}) ${text ? "- " + text : ""}`,
        );
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setItems([]);
      setError(e?.message || "Unable to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const filtered = useMemo(() => {
    let list = Array.isArray(items) ? [...items] : [];

    list = list.filter((x) => x.isActive === true);

    if (debouncedQ) {
      list = list.filter((x) => {
        const t = (x.title || "").toLowerCase();
        const d = (x.description || "").toLowerCase();
        return t.includes(debouncedQ) || d.includes(debouncedQ);
      });
    }

    list.sort((a, b) => {
      const da = dayjs(a.createdAt).isValid()
        ? dayjs(a.createdAt).valueOf()
        : 0;
      const db = dayjs(b.createdAt).isValid()
        ? dayjs(b.createdAt).valueOf()
        : 0;
      return sortBy === "newest" ? db - da : da - db;
    });

    return list;
  }, [items, debouncedQ, sortBy]);

  const openImageModal = (item) => {
    if (!item?.imageUrl) return;
    setActiveItem(item);
    setOpenImage(true);
  };

  const openVideoModal = (url) => {
    if (!url) return;
    setActiveVideo(url);
    setOpenVideo(true);
  };

  const yearOptions = useMemo(() => {
    const now = dayjs().year();
    const start = now - 2;
    const end = now + 4;
    const arr = [];
    for (let y = start; y <= end; y++) arr.push({ value: y, label: `${y}` });
    return arr;
  }, []);

  return (
    <UserLayout>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 16px" }}>
        {/* Header */}
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
                  📸 Village Gallery
                </Title>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Explore photos and videos from Sirivaram Village
                </Text>
              </Space>
            </Col>

            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Space wrap>
                <Select
                  value={year}
                  onChange={setYear}
                  style={{ width: 120, height: 40 }}
                  options={yearOptions}
                />
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadGallery}
                  loading={loading}
                  style={{
                    borderRadius: 8,
                    height: 40,
                    background: BTN_GREEN,
                    borderColor: BTN_GREEN,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Refresh
                </Button>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "16px 0" }} />

          {/* Filters */}
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} sm={16} md={14}>
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
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%", height: 40 }}
                options={[
                  { value: "newest", label: "Newest first" },
                  { value: "oldest", label: "Oldest first" },
                ]}
              />
            </Col>

            <Col xs={12} sm={24} md={5} style={{ textAlign: "right" }}>
              <Tag
                icon={<PictureOutlined />}
                color="processing"
                style={{ borderRadius: 8, padding: "6px 12px", fontSize: 14 }}
              >
                Total: {filtered.length}
              </Tag>
            </Col>
          </Row>
        </Card>

        {/* Error State */}
        {error && !loading && (
          <Alert
            style={{ marginTop: 16, borderRadius: 12 }}
            type="error"
            showIcon
            message="Unable to load gallery"
            description={error}
          />
        )}

        {/* Empty State */}
        {!error && !loading && filtered.length === 0 && (
          <Card
            bordered={false}
            style={{ marginTop: 16, borderRadius: 12, textAlign: "center" }}
          >
            <Empty
              description="No gallery items found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card>
        )}

        {/* Gallery Grid */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    style={{ borderRadius: 12 }}
                    bodyStyle={{ padding: 0 }}
                  >
                    <Skeleton.Image
                      active
                      style={{ width: "100%", height: 200 }}
                    />
                    <div style={{ padding: 12 }}>
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                  </Card>
                </Col>
              ))
            : filtered.map((g) => {
                const hasVideo = g.videoUrl && g.videoUrl.trim() !== "";
                
                return (
                  <Col key={g.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      hoverable
                      bordered={false}
                      style={{
                        borderRadius: 12,
                        height: "100%",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                      }}
                      bodyStyle={{ padding: 0 }}
                    >
                      {/* Image Cover */}
                      <div
                        style={{
                          height: 200,
                          background: "#f5f5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          cursor: g.imageUrl ? "pointer" : "default",
                          position: "relative",
                        }}
                        onClick={() => openImageModal(g)}
                      >
                        {g.imageUrl ? (
                          <>
                            <img
                              src={g.imageUrl}
                              alt={g.title || "gallery"}
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
                            {/* View Overlay */}
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(0,0,0,0.4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0,
                                transition: "opacity 0.3s",
                              }}
                              className="image-overlay"
                            >
                              <EyeOutlined
                                style={{ fontSize: 32, color: "#fff" }}
                              />
                            </div>
                          </>
                        ) : (
                          <Space direction="vertical" align="center">
                            <PictureOutlined
                              style={{ fontSize: 40, color: "#bfbfbf" }}
                            />
                            <Text style={{ color: "#8c8c8c", fontSize: 13 }}>
                              No image
                            </Text>
                          </Space>
                        )}

                        {/* Video Badge */}
                        {hasVideo && (
                          <div
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              background: "rgba(0,0,0,0.7)",
                              borderRadius: 8,
                              padding: "4px 8px",
                            }}
                          >
                            <PlayCircleOutlined
                              style={{ color: "#fff", fontSize: 16 }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: 14 }}>
                        <Space
                          direction="vertical"
                          size={8}
                          style={{ width: "100%" }}
                        >
                          <Title
                            level={5}
                            style={{ margin: 0, fontSize: 15, fontWeight: 700 }}
                            ellipsis={{ rows: 1 }}
                          >
                            {g.title || "Untitled"}
                          </Title>

                          <Text
                            type="secondary"
                            style={{ fontSize: 13, lineHeight: 1.5 }}
                            ellipsis={{ rows: 2 }}
                          >
                            {g.description || "No description available"}
                          </Text>

                          <Divider style={{ margin: "8px 0" }} />

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Tag
                              icon={<ClockCircleOutlined />}
                              color="default"
                              style={{ margin: 0, borderRadius: 6, fontSize: 12 }}
                            >
                              {g.createdAt
                                ? dayjs(g.createdAt).format("DD MMM YYYY")
                                : "—"}
                            </Tag>

                            {hasVideo && (
                              <Button
                                type="primary"
                                size="small"
                                icon={<PlayCircleOutlined />}
                                onClick={() => openVideoModal(g.videoUrl)}
                                style={{
                                  borderRadius: 6,
                                  background: BTN_GREEN,
                                  borderColor: BTN_GREEN,
                                  fontWeight: 600,
                                }}
                              >
                                Play
                              </Button>
                            )}
                          </div>
                        </Space>
                      </div>
                    </Card>
                  </Col>
                );
              })}
        </Row>

        {/* Image Modal */}
        <Modal
          open={openImage}
          onCancel={() => {
            setOpenImage(false);
            setActiveItem(null);
          }}
          footer={null}
          centered
          width={800}
          title={
            <Space>
              <PictureOutlined style={{ color: "#1890ff" }} />
              <span>{activeItem?.title || "Image Preview"}</span>
            </Space>
          }
        >
          {activeItem?.imageUrl ? (
            <div>
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title || "gallery"}
                style={{ borderRadius: 8 }}
                width="100%"
              />
              {activeItem.description && (
                <div style={{ marginTop: 16, padding: 12, background: "#f5f5f5", borderRadius: 8 }}>
                  <Text type="secondary">{activeItem.description}</Text>
                </div>
              )}
            </div>
          ) : (
            <Empty description="No image" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Modal>

        {/* Video Modal */}
        <Modal
          open={openVideo}
          onCancel={() => {
            setOpenVideo(false);
            setActiveVideo("");
          }}
          footer={null}
          centered
          width={900}
          title={
            <Space>
              <PlayCircleOutlined style={{ color: "#52c41a" }} />
              <span>Video Player</span>
            </Space>
          }
        >
          {activeVideo ? (
            <div style={{ width: "100%" }}>
              <video
                src={activeVideo}
                controls
                autoPlay
                style={{
                  width: "100%",
                  borderRadius: 8,
                  background: "#000",
                  maxHeight: "70vh",
                }}
              />
            </div>
          ) : (
            <Empty description="No video" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Modal>

        {/* CSS for hover effect */}
        <style>{`
          .ant-card:hover .image-overlay {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </UserLayout>
  );
}
