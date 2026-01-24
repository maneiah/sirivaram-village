import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Row, Grid, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SirivaramLogo from "../components/SirivaramLogo";

import { MdLogout } from "react-icons/md";
import { WalletOutlined } from "@ant-design/icons";
import {
 
  FaImages,
  
} from "react-icons/fa";
import { FaHome, FaCalendarCheck, FaNewspaper } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

export default function UserPanelLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();

  const displayName = localStorage.getItem("name") || "User";
//   const displayMobile = localStorage.getItem("mobile") || "";

  // ✅ xs: collapse, md+: expand
  useEffect(() => {
    if (screens.xs) setCollapsed(true);
    else if (screens.md) setCollapsed(false);
  }, [screens]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const date = new Date();
  const fullYear = date.getFullYear();
const sidebarItems = useMemo(
  () => [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <FaHome size={18} />, // 🏠 simple & user-friendly
      link: "/dashboard",
    },
    {
      key: "/events",
      label: "Events",
      icon: <FaCalendarCheck size={18} />, // 📅 event-focused
      link: "/events",
    },
   
    {
      key: "/gallery",
      label: "Gallery",
      icon: <FaImages size={18} />, // 🖼️ perfect fit
      link: "/gallery-view",
    },
    {
      key: "/blogs",
      label: "Blogs",
      icon: <FaNewspaper size={18} />, // 📰 readable content
      link: "/blogs",
    },
  ],
  [],
);

  // ✅ Active key highlight (supports nested routes)
  const selectedKey = useMemo(() => {
    const path = location.pathname;
    const match = sidebarItems
      .map((i) => i.key)
      .sort((a, b) => b.length - a.length)
      .find((k) => path === k || path.startsWith(k + "/"));
    return match || "/";
  }, [location.pathname, sidebarItems]);

  // ✅ Breadcrumb map
  const breadcrumbMap = useMemo(
    () => ({
      "/": "Dashboard",
      "/events": "Events",
      "/payments": "My Payments",
      "/gallery": "Gallery",
      "/blogs": "Blogs",
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

  // widths used in layout calculations
  const siderExpanded = 240;
  const siderCollapsed = 80;
const adminName = localStorage.getItem("name") || "Admin";

  const leftWidth = screens.xs ? 0 : collapsed ? siderCollapsed : siderExpanded;

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
        {/* ✅ TOP (Fixed) : Logo */}
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

        {/* ✅ MIDDLE (Scrollable) : Menu */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 10 }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKeys}
            onOpenChange={(keys) =>
              setOpenKeys(keys.length ? [keys.pop()] : [])
            }
            style={{
              borderRight: "none",
              background: "transparent",
            }}
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
            background: "#ffffff", // ✅ Full white
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

          <div
            onClick={handleSignOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12, // ✅ proper spacing
              cursor: "pointer",
            }}
          >
            {/* ✅ Admin Name */}
            <div style={{ lineHeight: 1.1, textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111827" }}>
                {adminName}
              </div>
            </div>

            {/* ✅ Divider (optional but looks premium) */}
            <div style={{ width: 1, height: 22, background: "#E5E7EB" }} />

            {/* ✅ Logout */}
            <MdLogout style={{ color: "#6B7280", fontSize: 16 }} />
            <span style={{ color: "#6B7280", fontSize: 14, fontWeight: 700 }}>
              Logout
            </span>
          </div>
        </Header>

        {/* ✅ CONTENT */}
        <Content
          style={{
            marginTop: 84,
            marginLeft: screens.xs ? 0 : leftWidth,
            padding: screens.xs ? 12 : 22,
            background: "#ffffff", // ✅ White
            minHeight: "calc(100vh - 84px)",
          }}
        >
          {/* ✅ Breadcrumb */}
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

          {/* ✅ Move Welcome text HERE (main content top) */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>
              Welcome to Sirivaram Village
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
              Hello, {displayName} 👋
            </div>
          </div>

          {children}
        </Content>

        {/* ✅ FOOTER */}
        <Footer
          style={{
            textAlign: "center",
            background: "#ffffff",
            boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
            marginLeft: screens.xs ? 0 : leftWidth,
          }}
        >
          Sirivaram Village ©{fullYear} | User Portal
        </Footer>
      </Layout>

      {/* ✅ Same scrollbar + hover CSS (kept dark sider) */}
      {/* <style>{`
        .ant-layout-sider::-webkit-scrollbar,
        .ant-menu::-webkit-scrollbar { width: 5px; }
        .ant-layout-sider::-webkit-scrollbar-track,
        .ant-menu::-webkit-scrollbar-track { background: #1a202c; }
        .ant-layout-sider::-webkit-scrollbar-thumb,
        .ant-menu::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 10px;
        }

        .ant-menu-item-selected {
          background-color: #2d3748 !important;
        }
        .ant-menu-item:hover {
          background-color: #2d3748 !important;
        }
      `}</style> */}
      <style>{`
  /* Scrollbar */
  .ant-layout-sider::-webkit-scrollbar,
  .ant-menu::-webkit-scrollbar {
    width: 5px;
  }
    /* ============================= */
/* FIX: Mobile sidebar hamburger */
/* ============================= */

/* ✅ Permanently remove the mobile zero-width trigger (hamburger) */
.ant-layout-sider-zero-width-trigger {
  display: none !important;
}




  .ant-layout-sider::-webkit-scrollbar-track,
  .ant-menu::-webkit-scrollbar-track {
    background: #ffffff; /* ✅ white */
  }

  .ant-layout-sider::-webkit-scrollbar-thumb,
  .ant-menu::-webkit-scrollbar-thumb {
    background-color: #d1d5db; /* light gray */
    border-radius: 10px;
  }

  /* Sidebar & menu background */
  .ant-layout-sider,
  .ant-layout-sider .ant-menu {
    background: #ffffff !important;
  }

  /* Menu item text */
  .ant-menu-item,
  .ant-menu-submenu-title {
    color: #111827 !important; /* dark text */
    font-weight: 600;
  }

  /* Hover state */
  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    background-color: #f3f4f6 !important; /* light gray hover */
    color: #111827 !important;
  }

  /* Selected item */
  .ant-menu-item-selected {
    background-color: #e5e7eb !important; /* selected gray */
    color: #111827 !important;
    font-weight: 700;
  }

  /* Links inside menu */
  .ant-menu-item a {
    color: #111827 !important;
  }

  .ant-menu-item:hover a,
  .ant-menu-item-selected a {
    color: #111827 !important;
  }
`}</style>
    </Layout>
  );
}
