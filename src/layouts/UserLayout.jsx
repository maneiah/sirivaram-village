import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Menu,
  Row,
  Grid,
  Breadcrumb,
  Modal,
  Form,
  Input,
  Col,
  Button,
  Space,
  message,
  Dropdown,
  Avatar,
  Divider,
  Upload,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  GiftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {MdLogout} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SirivaramLogo from "../components/SirivaramLogo";
import axios from "axios";

import { FaImages, FaHome, FaNewspaper } from "react-icons/fa";
import { FaCalendarAlt, FaClock, FaCreditCard } from "react-icons/fa";

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const API_BASE = "https://sirivaram-backed.onrender.com";

const safeStr = (v) => (v === null || v === undefined ? "" : String(v));

const getLrCode = (id) => {
  const clean = safeStr(id).replace(/-/g, "");
  if (!clean) return "SV----";
  return `SV${clean.slice(-4).toUpperCase()}`; // ✅ last 4 digits
};

export default function UserPanelLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ user profile from /api/users/me
  const [meLoading, setMeLoading] = useState(true);
  const [me, setMe] = useState(null);

  // ✅ edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  // ✅ xs: collapse, md+: expand
  useEffect(() => {
    if (screens.xs) setCollapsed(true);
    else if (screens.md) setCollapsed(false);
  }, [screens]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  // ✅ GET /api/users/me
  const fetchMe = async () => {
    setMeLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { ...getAuthHeaders() },
      });
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setMe(data || null);

      if (data?.name) localStorage.setItem("name", data.name);
    } catch (err) {
      console.error("Error fetching profile:", err);
      const fallbackName = localStorage.getItem("name");
      setMe(fallbackName ? { name: fallbackName } : null);
    } finally {
      setMeLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ open edit modal
  const openEdit = () => {
    const current = me || {};
    form.setFieldsValue({
      name: safeStr(current.name),
      address: safeStr(current.address),
      village: safeStr(current.village),
      imageUrl: safeStr(current.imageUrl),
    });
    setEditOpen(true);
  };

  // ✅ Image upload handler
  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=f5435f6feb6a01f1128a892cd748a25c",
        formData
      );
      const url = res?.data?.data?.url || res?.data?.data?.display_url;
      if (url) {
        form.setFieldsValue({ imageUrl: url });
        message.success("Image uploaded successfully!");
      } else {
        message.error("Upload failed - no URL returned");
      }
    } catch (err) {
      message.error(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
    return false;
  };

  // ✅ PUT /api/users/me
  const saveProfile = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();

      const payload = {
        name: safeStr(values.name).trim(),
        address: safeStr(values.address).trim(),
        village: safeStr(values.village).trim(),
        imageUrl: safeStr(values.imageUrl).trim(),
      };

      const res = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errTxt = await res.text().catch(() => "");
        throw new Error(errTxt || "Profile update failed");
      }

      message.success("Profile updated successfully");
      setEditOpen(false);
      await fetchMe();
    } catch (e) {
      message.error(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const fullYear = new Date().getFullYear();

  const sidebarItems = useMemo(
    () => [
      {
        key: "/dashboard",
        label: "My Dashboard",
        icon: <FaHome size={18} />,
        link: "/dashboard",
      },
      {
        key: "/events",
        label: "All Events",
        icon: <FaCalendarAlt size={18} />,
        link: "/events",
      },
      {
        key: "/upcoming-events",
        label: "Upcoming Events",
        icon: <FaClock size={18} />,
        link: "/upcoming-events",
      },
      {
        key: "/gallery-view",
        label: "Village Gallery",
        icon: <FaImages size={18} />,
        link: "/gallery-view",
      },
      {
        key: "/payments",
        label: "My Payments",
        icon: <FaCreditCard size={18} />,
        link: "/payments",
      },
      {
        key: "/blogs",
        label: "Village Blogs",
        icon: <FaNewspaper size={18} />,
        link: "/blogs",
      },
    ],
    [],
  );

  const selectedKey = useMemo(() => {
    const path = location.pathname;
    const match = sidebarItems
      .map((i) => i.key)
      .sort((a, b) => b.length - a.length)
      .find((k) => path === k || path.startsWith(k + "/"));
    return match || "/";
  }, [location.pathname, sidebarItems]);

  const breadcrumbMap = useMemo(
    () => ({
      "/": "Dashboard",
      "/dashboard": "Dashboard",
      "/events": "Events",
      "/payments": "My Payments",
      "/gallery-view": "Gallery",
      "/blogs": "Blogs",
      "/upcoming-events": "Upcoming Events",
    }),
    [],
  );

  const breadcrumbItems = useMemo(() => {
    const path = location.pathname;
    const base =
      Object.keys(breadcrumbMap)
        .sort((a, b) => b.length - a.length)
        .find((k) => path === k || path.startsWith(k + "/")) || "/";

    return [
      {
        title: (
          <Link to="/" style={{ fontWeight: 700 }}>
            <HomeOutlined /> Home
          </Link>
        ),
      },
      {
        title: (
          <span style={{ fontWeight: 700 }}>
            {breadcrumbMap[base] || "Page"}
          </span>
        ),
      },
    ];
  }, [location.pathname, breadcrumbMap]);

  const siderExpanded = 240;
  const siderCollapsed = 80;
  const leftWidth = screens.xs ? 0 : collapsed ? siderCollapsed : siderExpanded;

  const displayName = safeStr(me?.name) || "User";
  const lrCode = getLrCode(me?.id);

  // ✅ dropdown items
  const menuItems = [
    { key: "profile", icon: <ProfileOutlined />, label: "My Profile" },
    { key: "deals", icon: <GiftOutlined />, label: "My Events" },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", danger: true },
  ];

  const onMenuClick = ({ key }) => {
    if (key === "profile") openEdit();
    if (key === "deals") navigate("/events"); // ✅ change if your route is different
    if (key === "logout") handleSignOut();
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* ✅ SIDER */}
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"
        width={screens.xs ? 220 : siderExpanded}
        collapsedWidth={screens.xs ? 0 : siderCollapsed}
        style={{
          background: "#ffffff",
          zIndex: 1000,
          left: 0,
          top: 0,
          position: "fixed",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* ✅ TOP : Logo */}
        <div style={{ padding: "14px 0" }}>
          <Row justify="center" align="middle">
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: collapsed ? 0 : 10,
                textDecoration: "none",
              }}
            >
              <SirivaramLogo size={collapsed ? 42 : 46} />
              {!collapsed && (
                <div style={{ lineHeight: 1.1 }}>
                  <div
                    style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}
                  >
                    SIRIVARAM
                  </div>
                </div>
              )}
            </Link>
          </Row>
        </div>

        {/* ✅ MENU */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 10 }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onOpenChange={(keys) =>
              setOpenKeys(keys.length ? [keys.pop()] : [])
            }
            style={{ borderRight: "none", background: "transparent" }}
          >
            {sidebarItems.map((item) => (
              <Menu.Item
                key={item.key}
                style={{ height: 46, display: "flex", alignItems: "center" }}
              >
                <Link
                  to={item.link}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                    fontWeight: 700,
                    width: "100%",
                    color: "inherit",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {item.icon}
                  </span>
                  <span className={`${collapsed ? "hidden" : "inline"}`}>
                    {item.label}
                  </span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>

      {/* ✅ MAIN */}
      <Layout style={{ background: "#ffffff" }}>
        {/* ✅ HEADER */}
        <Header
          style={{
            padding: screens.xs ? "0 12px" : "0 18px",
            background: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            width: screens.xs ? "100%" : `calc(100% - ${leftWidth}px)`,
            marginLeft: screens.xs ? 0 : leftWidth,
            position: "fixed",
            top: 0,
            zIndex: 9,
            height: 72,
          }}
        >
          {/* LEFT: Collapse */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={toggleCollapse}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#1AB394",
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </div>

          {/* RIGHT: Logout + Profile (Responsive) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: screens.xs ? 8 : 12,
              flexWrap: "nowrap",
            }}
          >
            {/* ✅ Logout Button (FIRST) */}
            <div
              onClick={handleSignOut}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                padding: screens.xs ? "6px 8px" : "6px 10px",
             
               
              }}
            >
              <MdLogout style={{ color: "#6B7280", fontSize: 16 }} />
              {!screens.xs && (
                <span
                  style={{ color: "#6B7280", fontSize: 14, fontWeight: 700 }}
                >
                  Logout
                </span>
              )}
            </div>

            {/* ✅ Divider (hide on mobile) */}
            {!screens.xs && (
              <div style={{ width: 1, height: 22, background: "#E5E7EB" }} />
            )}

            {/* ✅ Profile Dropdown (SECOND) */}
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{ items: menuItems, onClick: onMenuClick }}
              dropdownRender={(menu) => (
                <div
                  style={{
                    width: 260,
                    background: "#fff",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* Top profile card */}
                  <div style={{ padding: 14, background: "#f9fafb" }}>
                    <Space align="start">
                      <Avatar size={44} icon={<UserOutlined />} />
                      <div style={{ lineHeight: 1.2 }}>
                        <div style={{ fontWeight: 900, color: "#111827" }}>
                          {meLoading ? "Loading..." : displayName}
                        </div>
                        <div
                          style={{
                            color: "#6b7280",
                            fontWeight: 800,
                            fontSize: 13,
                          }}
                        >
                          {lrCode}
                        </div>
                        <div
                          style={{
                            color: "#6b7280",
                            fontWeight: 600,
                            fontSize: 13,
                          }}
                        >
                          {safeStr(me?.role) || "User"}
                        </div>
                      </div>
                    </Space>
                  </div>

                  <Divider style={{ margin: 0 }} />
                  {menu}
                </div>
              )}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: screens.xs ? "6px 8px" : "6px 10px",
              
                  maxWidth: screens.xs ? 160 : "unset",
                }}
              >
                <Avatar size={34} icon={<UserOutlined />} />

                {/* Hide text on small screens */}
                {!screens.xs && (
                  <div style={{ lineHeight: 1.1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#111827",
                      }}
                    >
                      {meLoading ? "Loading..." : displayName}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#6b7280",
                      }}
                    >
                      {lrCode}
                    </div>
                  </div>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* ✅ CONTENT */}
        <Content
          style={{
            marginTop: 84,
            marginLeft: screens.xs ? 0 : leftWidth,
            padding: screens.xs ? 12 : 22,
            background: "#ffffff",
            minHeight: "calc(100vh - 84px)",
          }}
        >
          <div
            style={{
              marginBottom: 14,
              background: "#ffffff",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #E5E7EB",
            }}
          >
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {children}
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "#ffffff",
            boxShadow: "0 -2px 6px rgba(0,0,0,0.08)",
            marginLeft: screens.xs ? 0 : leftWidth,
          }}
        >
          Sirivaram Village ©{new Date().getFullYear()}
        </Footer>
      </Layout>

      {/* ✅ EDIT PROFILE MODAL (Responsive) */}
      <Modal
        open={editOpen}
        onCancel={() => (!saving ? setEditOpen(false) : null)}
        onOk={saveProfile}
        okText="Save"
        confirmLoading={saving}
        width={screens.xs ? "100%" : 720}
        style={screens.xs ? { top: 0, paddingBottom: 0 } : undefined}
        bodyStyle={{ padding: screens.xs ? 14 : 18 }}
        destroyOnClose
        okButtonProps={{
          style: {
            backgroundColor: "#008cba",
            borderColor: "#008cba",
            color: "#ffffff",
            fontWeight: 700,
            borderRadius: 8,
          },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: 8,
            fontWeight: 600,
          },
        }}
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <Row gutter={[12, 12]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Name is required" },
                  { max: 80, message: "Max 80 characters" },
                ]}
              >
                <Input placeholder="Enter name" allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Village"
                name="village"
                rules={[
                  { required: true, message: "Village is required" },
                  { max: 80, message: "Max 80 characters" },
                ]}
              >
                <Input placeholder="Enter village" allowClear />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Address is required" },
                  { max: 500, message: "Max 500 characters" },
                ]}
              >
                <Input.TextArea
                  rows={screens.xs ? 3 : 2}
                  placeholder="Enter address"
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Profile Image" name="imageUrl">
                <Input placeholder="Image URL" allowClear disabled />
              </Form.Item>
              <Upload
                beforeUpload={handleImageUpload}
                showUploadList={false}
                accept="image/*"
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  style={{ marginTop: -10 }}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
              </Upload>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* ✅ CSS */}
      <style>{`
        .ant-layout-sider-zero-width-trigger { display:none !important; }

        .ant-layout-sider::-webkit-scrollbar,
        .ant-menu::-webkit-scrollbar { width: 5px; }
        .ant-layout-sider::-webkit-scrollbar-track,
        .ant-menu::-webkit-scrollbar-track { background: #ffffff; }
        .ant-layout-sider::-webkit-scrollbar-thumb,
        .ant-menu::-webkit-scrollbar-thumb {
          background-color: #d1d5db; border-radius: 10px;
        }

        .ant-layout-sider,
        .ant-layout-sider .ant-menu { background: #ffffff !important; }

        .ant-menu-item, .ant-menu-submenu-title {
          color: #111827 !important; font-weight: 600;
        }

        .ant-menu-item:hover, .ant-menu-submenu-title:hover {
          background-color: #f3f4f6 !important; color: #111827 !important;
        }

        .ant-menu-item-selected {
          background-color: #e5e7eb !important;
          color: #111827 !important;
          font-weight: 700;
        }

        .ant-menu-item a { color:#111827 !important; }
        .ant-menu-item:hover a,
        .ant-menu-item-selected a { color:#111827 !important; }

        /* ✅ modal full screen on mobile */
        @media (max-width: 576px) {
          .ant-modal { max-width: 100vw !important; margin: 0 !important; }
          .ant-modal-content { border-radius: 0 !important; min-height: 100vh; }
        }
      `}</style>
    </Layout>
  );
}
