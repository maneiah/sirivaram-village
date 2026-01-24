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
} from "antd";

import {
  CalendarOutlined,
  EnvironmentOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  SearchOutlined,
  LockOutlined,
  GlobalOutlined,
  WalletOutlined, // ✅ FIX: was missing
} from "@ant-design/icons";

const { Title, Text } = Typography;

const API_URL = "https://sirivaram-backed.onrender.com/api/events/upcoming";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [visibility, setVisibility] = useState("all"); // all | public | private
  const [sortBy, setSortBy] = useState("startAsc"); // startAsc | startDesc

  // QR modal
  const [qrOpen, setQrOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  // ✅ Helper: safely extract array from API response
  const extractEventsArray = (payload) => {
    if (Array.isArray(payload)) return payload;

    // common wrappers
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.events)) return payload.events;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.results)) return payload.results;

    // sometimes nested
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.data?.events)) return payload.data.events;

    return [];
  };

  const loadEvents = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.get(API_URL);

      // ✅ Debug once: see what API returns
      console.log("Upcoming events API response:", res.data);

      const list = extractEventsArray(res.data);
      setEvents(list);
    } catch (err) {
      console.error("Events load error:", err);
      setError(
        err?.response?.data?.message || err?.message || "Unable to load events",
      );
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = Array.isArray(events) ? [...events] : [];

    // filter visibility
    if (visibility !== "all") {
      const wantPublic = visibility === "public";
      list = list.filter((e) => !!e.isPublic === wantPublic);
    }

    // search
    if (query) {
      list = list.filter((e) => {
        const t = (e.title || "").toLowerCase();
        const d = (e.description || "").toLowerCase();
        const v = (e.venue || "").toLowerCase();
        return t.includes(query) || d.includes(query) || v.includes(query);
      });
    }

    // sort
    list.sort((a, b) => {
      const da = dayjs(a.startDate).valueOf();
      const db = dayjs(b.startDate).valueOf();
      return sortBy === "startAsc" ? da - db : db - da;
    });

    return list;
  }, [events, q, visibility, sortBy]);

  const openQr = (url) => {
    if (!url) return;
    setQrUrl(url);
    setQrOpen(true);
  };

  const formatPrice = (n) => {
    const val = Number(n);
    if (Number.isNaN(val)) return "—";
    return val % 1 === 0 ? val.toFixed(0) : val.toFixed(2);
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return "—";
    const s = dayjs(startDate);
    const e = endDate ? dayjs(endDate) : null;

    if (!e || e.isSame(s, "day")) return s.format("DD MMM YYYY");
    return `${s.format("DD MMM YYYY")} - ${e.format("DD MMM YYYY")}`;
  };

  return (
    <UserLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[12, 12]} align="middle" justify="space-between">
          <Col xs={24} md={12}>
            <Space direction="vertical" size={0}>
              <Title level={3} style={{ margin: 0 }}>
                Upcoming Events
              </Title>
              <Text type="secondary">
                Browse events, view venue & dates, and open QR when available.
              </Text>
            </Space>
          </Col>

          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={loadEvents}
              loading={loading}
            >
              Refresh
            </Button>
          </Col>
        </Row>

        {/* ✅ Filters */}
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
                placeholder="Search by title, venue, description..."
              />
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Select
                value={visibility}
                onChange={setVisibility}
                style={{ width: "100%" }}
                options={[
                  { value: "all", label: "All" },
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                ]}
              />
            </Col>

            <Col xs={12} md={6} lg={5}>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%" }}
                options={[
                  { value: "startAsc", label: "Start Date ↑" },
                  { value: "startDesc", label: "Start Date ↓" },
                ]}
              />
            </Col>

            <Col xs={24} lg={4} style={{ textAlign: "right" }}>
              <Text type="secondary">
                Showing <b>{filteredEvents.length}</b>
              </Text>
            </Col>
          </Row>
        </Card>

        {/* ✅ Error */}
        {error && !loading && (
          <Alert
            style={{ marginTop: 12, borderRadius: 12 }}
            type="error"
            message="Unable to load events"
            description={
              <Space direction="vertical" size={8}>
                <Text>{error}</Text>
                <Button onClick={loadEvents} icon={<ReloadOutlined />}>
                  Try again
                </Button>
              </Space>
            }
            showIcon
          />
        )}

        {/* ✅ Empty */}
        {!error && !loading && filteredEvents.length === 0 && (
          <Card style={{ marginTop: 12, borderRadius: 16 }}>
            <Empty description="No events found" />
          </Card>
        )}

        {/* ✅ Events Grid */}
        <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Col key={i} xs={24} sm={12} lg={8}>
                  <Card style={{ borderRadius: 16 }}>
                    <Skeleton active paragraph={{ rows: 4 }} />
                  </Card>
                </Col>
              ))
            : filteredEvents.map((e) => (
                <Col key={e.id} xs={24} sm={12} lg={8}>
                  <Card
                    hoverable
                    style={{ borderRadius: 16, height: "100%" }}
                    bodyStyle={{ padding: 16 }}
                  >
                    <Space
                      direction="vertical"
                      size={10}
                      style={{ width: "100%" }}
                    >
                      <Space
                        align="start"
                        style={{
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <Text
                            style={{ fontSize: 16, fontWeight: 800 }}
                            ellipsis
                          >
                            {e.title || "Event"}
                          </Text>
                          <div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatDateRange(e.startDate, e.endDate)}
                            </Text>
                          </div>
                        </div>

                        <Tag
                          icon={
                            e.isPublic ? <GlobalOutlined /> : <LockOutlined />
                          }
                          color={e.isPublic ? "green" : "red"}
                          style={{ margin: 0 }}
                        >
                          {e.isPublic ? "Public" : "Private"}
                        </Tag>
                      </Space>

                      <Text type="secondary" style={{ fontSize: 13 }}>
                        {(e.description || "—").length > 120
                          ? (e.description || "—").slice(0, 120) + "..."
                          : e.description || "—"}
                      </Text>

                      <Space size={6}>
                        <EnvironmentOutlined style={{ color: "#6B7280" }} />
                        <Text style={{ fontSize: 13 }}>
                          <b>Venue:</b> {e.venue || "—"}
                        </Text>
                      </Space>

                      <Space size={6}>
                        <WalletOutlined style={{ color: "#6B7280" }} />
                        <Text style={{ fontSize: 13 }}>
                          <b>Ticket:</b> ₹{formatPrice(e.ticketPrice)}
                        </Text>
                      </Space>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 4,
                        }}
                      >
                        <Tag icon={<CalendarOutlined />} color="blue">
                          {dayjs(e.startDate).isValid()
                            ? dayjs(e.startDate).format("ddd, DD MMM")
                            : "—"}
                        </Tag>

                        <Space>
                          <Tooltip
                            title={e.qrImageUrl ? "View QR" : "No QR available"}
                          >
                            <Button
                              type="primary"
                              ghost
                              icon={<QrcodeOutlined />}
                              disabled={!e.qrImageUrl}
                              onClick={() => openQr(e.qrImageUrl)}
                            >
                              QR
                            </Button>
                          </Tooltip>
                        </Space>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>

      {/* ✅ QR Modal */}
      <Modal
        open={qrOpen}
        onCancel={() => setQrOpen(false)}
        footer={null}
        title="Event QR"
        centered
      >
        {qrUrl ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={qrUrl}
              alt="qr"
              style={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
              width={280}
            />
          </div>
        ) : (
          <Empty description="No QR available" />
        )}
      </Modal>
    </UserLayout>
  );
}
