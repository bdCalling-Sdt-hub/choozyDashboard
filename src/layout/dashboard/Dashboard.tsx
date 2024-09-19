import React from "react";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import {
  Bell,
  Lock,
  LogOut,
  User,
  User2Icon,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/LogoAndTitle.svg";
import logoChoozy from "../../assets/Images/dashboard/pie-chart.svg";
import productListing from "../../assets/Images/dashboard/tag.png";
import categoryManagement from "../../assets/Images/dashboard/categoryManagement.png";
import manageUser from "../../assets/Images/dashboard/ManageUser.png";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import settings from "../../assets/Images/dashboard/settings.png";

const { Header, Sider, Content } = Layout;

interface MenuItem {
  path: string;
  title: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: <img src={logoChoozy} alt="Logo" width={18} height={18} />,
  },
  {
    path: "/productListing",
    title: "Product Listing",
    icon: <img src={productListing} alt="Logo" width={18} height={18} />,
  },
  {
    path: "/category_management",
    title: "Category Management",
    icon: <img src={categoryManagement} alt="Logo" width={18} height={18} />,
  },
  {
    path: "/manage-users",
    title: "Manage Users",
    icon: <FaRegUserCircle size={18} color="#4964C6" />,
  },
  {
    path: "/love",
    title: "Love",
    icon: <FaRegHeart color="#4964C6" size={18} />,
  },
  {
    path: "/transactions",
    title: "Transactions",
    icon: <CiCreditCard1 color="#4964C6" size={18} />,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <img src={settings} alt="Logo" width={18} height={18} />,
  },
];

const content = (
  <div className="w-40">
    <p className="mb-2">
      <Link to="/profile" className="flex items-center gap-2">
        <User2Icon size={18} /> <span className="text-md">Profile</span>
      </Link>
    </p>
    <p className="mb-3">
      <Link to="/change-password" className="flex items-center gap-2">
        <Lock size={18} /> <span className="text-md">Change password</span>
      </Link>
    </p>
  </div>
);

interface NotificationBadgeProps {
  handleNotifications: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Dashboard: React.FC<NotificationBadgeProps> = ({ }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  const handleNotifications = () => {
    console.log("clicked");
    navigate('/notifications')
  }

  return (
    <Layout>
      <Sider
        width={312}
        className="sidebar-menu"
        style={{
          overflow: "auto",
          height: "100vh",
          zIndex: 2,
        }}
        trigger={null}
      >
        <img src={logo} alt="Logo" className="mx-auto py-12 w-[264px]" />
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "white" }}
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Menu.Item
                key={`item-${index}`}
                icon={item.icon}
                style={{
                  color: isActive ? "red" : "#fff",
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: "16px",
                  marginBottom: "10px",
                  backgroundColor: isActive ? "#F2F5FC" : "transparent",
                }}
              >
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            );
          })}

          <div className="flex py-36 gap-8 px-4 w-full">
            <div className="flex gap-2 w-3/4 items-center">
              <Popover className="cursor-pointer" placement="top" content={content}>
                <div>
                  <Avatar
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "gray",
                    }}
                    icon={<User size={25} />}
                  />
                </div>
              </Popover>
              <div className="space-y-4">
                <h1 className="text-black">John Doe</h1>
                <h1 className="text-black">ex@ample.com</h1>
              </div>
            </div>

            <div>
              <Menu.Item
                key="500"
                icon={<LogOut size={20} />}
                style={{ color: "red", fontSize: "16px" }}
                onClick={handleLogout}
              />
            </div>
          </div>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#F6F6F6",
            height: "80px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="w-full flex justify-between items-center gap-5">
            <div>
              <h1 className="text-[#333333] font-bold text-[24px]">
                <span className="text-[#B0B0B0]">Hello,</span> Globetrotter 👋
              </h1>
            </div>
            <div onClick={handleNotifications} className="cursor-pointer">
              <Badge count={5}>
                <Bell size={30} color="#5D5D5D" />
              </Badge>
            </div>
          </div>
        </Header>

        <Content
          style={{
            background: "#1e1e1ef7",
            height: `calc(100vh - 80px)`,
          }}
        >
          <div className="h-[calc(100vh-100px)] m-2 rounded p-3 overflow-hidden">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
