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
} from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";


const { Title, Text } = Typography;

const API_BASE = "https://sirivaram-backed.onrender.com";

export default function Gallery() {
  const [year, setYear] = useState(dayjs().year()); // default current year
  const [q, setQ] = useState("");
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

  const token =
    localStorage.getItem("token") || localStorage.getItem("accessToken") || "";

  const loadGallery = async () => {
    try {
      setError("");
      setLoading(true);

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
    const query = q.trim().toLowerCase();
    let list = [...items];

    // search
    if (query) {
      list = list.filter((x) => {
        const t = (x.title || "").toLowerCase();
        const d = (x.description || "").toLowerCase();
        return t.includes(query) || d.includes(query);
      });
    }

    // sort by createdAt
    list.sort((a, b) => {
      const da = dayjs(a.createdAt).valueOf();
      const db = dayjs(b.createdAt).valueOf();
      return sortBy === "newest" ? db - da : da - db;
    });

    return list;
  }, [items, q, sortBy]);

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

  // Build year dropdown (2024..2030) you can change range
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
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <Row gutter={[12, 12]} align="middle" justify="space-between">
          <Col xs={24} md={12}>
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
            md={12}
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
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Filters */}
        <Card
          style={{ marginTop: 12, borderRadius: 16 }}
          bodyStyle={{ padding: 14 }}
        >
          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} md={12} lg={10}>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by title or description..."
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
              <Tag icon={<PictureOutlined />} color="blue">
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
                    style={{ borderRadius: 16, height: "100%" }}
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
                            color="default"
                            style={{ margin: 0 }}
                          >
                            {g.createdAt
                              ? dayjs(g.createdAt).format("DD MMM YYYY")
                              : "—"}
                          </Tag>
                        </Tooltip>

                        <Button
                          size="small"
                          icon={<PlayCircleOutlined />}
                          disabled={!g.videoUrl}
                          onClick={() => openVideoModal(g.videoUrl)}
                        >
                          Video
                        </Button>
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
              {/* Works for direct mp4 links. If your videoUrl is YouTube, tell me I’ll change iframe logic */}
              <video
                src={activeVideo}
                controls
                style={{ width: "100%", borderRadius: 12, background: "#000" }}
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
