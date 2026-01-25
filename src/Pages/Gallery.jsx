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
  Tooltip,
  Divider,
  message,
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

// ✅ button colors
const BTN_BLUE = "#008cba";
const BTN_GREEN = "#1ab394";

// ✅ JWT token helper
const getToken = () =>
  localStorage.getItem("token") || localStorage.getItem("accessToken") || "";

export default function Gallery() {
  const [year, setYear] = useState(dayjs().year());
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Image preview modal
  const [openImage, setOpenImage] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  // Video modal
  const [openVideo, setOpenVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");

  // ✅ Debounce search for performance
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

      // ✅ API returns array of objects including isActive
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

    // ✅ USER SIDE: only show active items
    list = list.filter((x) => x.isActive === true);

    // ✅ search
    if (debouncedQ) {
      list = list.filter((x) => {
        const t = (x.title || "").toLowerCase();
        const d = (x.description || "").toLowerCase();
        return t.includes(debouncedQ) || d.includes(debouncedQ);
      });
    }

    // ✅ sort by createdAt
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

  const openImageModal = (url) => {
    if (!url) return;
    setActiveImage(url);
    setOpenImage(true);
  };

  const openVideoModal = (url) => {
    if (!url) return;
    setActiveVideo(url);
    setOpenVideo(true);
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      message.success("Link copied");
    } catch {
      message.error("Unable to copy link");
    }
  };

  // Year dropdown
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
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 12px" }}>
        {/* Header */}
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
              <Space direction="vertical" size={2}>
                <Title level={3} style={{ margin: 0 }}>
                  Gallery
                </Title>
                <Text type="secondary">
                  Photos and videos of Sirivaram Village activities.
                </Text>
              </Space>
            </Col>

            <Col
              xs={24}
              md={10}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Space wrap>
                <Select
                  value={year}
                  onChange={setYear}
                  style={{ width: 120 }}
                  options={yearOptions}
                />
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadGallery}
                  loading={loading}
                  style={{
                    borderRadius: 10,
                    background: BTN_GREEN,
                    borderColor: BTN_GREEN,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  Refresh
                </Button>
              </Space>
            </Col>
          </Row>

          <Divider style={{ margin: "14px 0" }} />

          {/* Filters */}
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} md={12} lg={10}>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by title or description..."
                style={{ borderRadius: 12, height: 40 }}
              />
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%" }}
                options={[
                  { value: "newest", label: "Newest first" },
                  { value: "oldest", label: "Oldest first" },
                ]}
              />
            </Col>

            <Col xs={12} md={6} lg={9} style={{ textAlign: "right" }}>
              <Tag
                icon={<PictureOutlined />}
                color="blue"
                style={{ borderRadius: 999 }}
              >
                Total: {filtered.length}
              </Tag>
            </Col>
          </Row>
        </Card>

        {/* States */}
        {error && !loading && (
          <Alert
            style={{ marginTop: 12, borderRadius: 12 }}
            type="error"
            showIcon
            message="Unable to load gallery"
            description={error}
          />
        )}

        {!error && !loading && filtered.length === 0 && (
          <Card style={{ marginTop: 12, borderRadius: 16 }}>
            <Empty description="No gallery items found" />
          </Card>
        )}

        {/* Grid */}
        <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <Col key={i} xs={12} sm={12} md={8} lg={6}>
                  <Card style={{ borderRadius: 16 }}>
                    <Skeleton.Image
                      active
                      style={{ width: "100%", height: 160 }}
                    />
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                </Col>
              ))
            : filtered.map((g) => (
                <Col key={g.id} xs={12} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 16,
                      height: "100%",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                    }}
                    bodyStyle={{ padding: 12 }}
                    cover={
                      <div
                        style={{
                          height: 160,
                          background: "#F3F4F6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          cursor: g.imageUrl ? "pointer" : "default",
                        }}
                        onClick={() => openImageModal(g.imageUrl)}
                      >
                        {g.imageUrl ? (
                          <img
                            src={g.imageUrl}
                            alt={g.title || "gallery"}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <Space direction="vertical" align="center">
                            <PictureOutlined
                              style={{ fontSize: 28, color: "#9CA3AF" }}
                            />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              No image
                            </Text>
                          </Space>
                        )}
                      </div>
                    }
                  >
                    <Space
                      direction="vertical"
                      size={6}
                      style={{ width: "100%" }}
                    >
                      <Text strong ellipsis>
                        {g.title || "Untitled"}
                      </Text>

                      <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
                        {g.description || "—"}
                      </Text>

                      <Space
                        style={{
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Tooltip
                          title={
                            g.createdAt
                              ? dayjs(g.createdAt).format(
                                  "DD MMM YYYY, hh:mm A",
                                )
                              : ""
                          }
                        >
                          <Tag
                            icon={<ClockCircleOutlined />}
                            style={{ margin: 0, borderRadius: 999 }}
                          >
                            {g.createdAt
                              ? dayjs(g.createdAt).format("DD MMM YYYY")
                              : "—"}
                          </Tag>
                        </Tooltip>

                        <Space size={6}>
                          <Tooltip title="Copy link">
                            <Button
                              size="small"
                              icon={<EyeOutlined />}
                              onClick={() =>
                                copyLink(g.imageUrl || g.videoUrl || "")
                              }
                              disabled={!g.imageUrl && !g.videoUrl}
                              style={{
                                borderRadius: 8,
                                borderColor: BTN_BLUE,
                                color: BTN_BLUE,
                                fontWeight: 600,
                              }}
                            >
                              Link
                            </Button>
                          </Tooltip>

                          <Button
                            size="small"
                            icon={<PlayCircleOutlined />}
                            disabled={!g.videoUrl}
                            onClick={() => openVideoModal(g.videoUrl)}
                            style={{
                              borderRadius: 8,
                              background: g.videoUrl ? BTN_GREEN : "#e5e7eb",
                              borderColor: g.videoUrl ? BTN_GREEN : "#e5e7eb",
                              color: g.videoUrl ? "#fff" : "#6b7280",
                              fontWeight: 700,
                            }}
                          >
                            Video
                          </Button>
                        </Space>
                      </Space>
                    </Space>
                  </Card>
                </Col>
              ))}
        </Row>

        {/* Image modal */}
        <Modal
          open={openImage}
          onCancel={() => setOpenImage(false)}
          footer={null}
          centered
          width={720}
          title="Image Preview"
        >
          {activeImage ? (
            <Image
              src={activeImage}
              alt="gallery"
              style={{ borderRadius: 12 }}
              width="100%"
            />
          ) : (
            <Empty description="No image" />
          )}
        </Modal>

        {/* Video modal */}
        <Modal
          open={openVideo}
          onCancel={() => setOpenVideo(false)}
          footer={null}
          centered
          width={860}
          title="Video"
        >
          {activeVideo ? (
            <div style={{ width: "100%" }}>
              <video
                src={activeVideo}
                controls
                style={{
                  width: "100%",
                  borderRadius: 12,
                  background: "#000",
                }}
              />
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <a href={activeVideo} target="_blank" rel="noopener noreferrer">
                  Open in new tab
                </a>
              </div>
            </div>
          ) : (
            <Empty description="No video" />
          )}
        </Modal>
      </div>
    </UserLayout>
  );
}
