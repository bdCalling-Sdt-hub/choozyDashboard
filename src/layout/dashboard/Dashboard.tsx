import React from "react";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import { Bell, Lock, LogOut, User, User2Icon } from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Images/LogoAndTitle.svg";
import logoChoozy from "../../assets/Images/dashboard/pie-chart.svg";
import productListing from "../../assets/Images/dashboard/tag.png";
import categoryManagement from "../../assets/Images/dashboard/categoryManagement.png";
import manageUser from "../../assets/Images/dashboard/ManageUser.png";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import settings from "../../assets/Images/dashboard/settings.png";
import SubMenu from "antd/es/menu/SubMenu";
import Settings_personalInformation from './../../pages/Settings_personalInformation';

const { Header, Sider, Content } = Layout;

interface MenuItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  children?: MenuItem[];
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
    children: [
      {
        path: "/settings/personalInformation",
        title: "Personal information",
        icon: <FaRegUserCircle size={18} color="#4964C6" />,
      },
      {
        path: "/settings/faq",
        title: "FAQ",
        icon: <Lock size={18} color="#4964C6" />,
      },
      {
        path: "/settings/termsAndCondition",
        title: "Terms & Conditions",
        icon: <CiCreditCard1 color="#4964C6" size={18} />,
      },
    ],
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

const Dashboard: React.FC<NotificationBadgeProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  const handleNotifications = () => {
    console.log("clicked");
    navigate("/notifications");
  };

  // Map the pathnames to header titles
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              <span className="text-[#B0B0B0]">Hello,</span> Globetrotter 👋
            </h1>
          </div>
        );
      case "/productListing":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Manage Listings
            </h1>
          </div>
        );
      case "/category_management":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Manage Category
            </h1>
          </div>
        );
      case "/manage-users":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Manage Users 
            </h1>
          </div>
        );
      case "/love":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Love
            </h1>
          </div>
        );
      case "/transactions":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Transactions
            </h1>
          </div>
        );
      case "/settings":
        return "Settings";
      default:
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              <span className="text-[#B0B0B0]">Hello,</span> Globetrotter 👋
            </h1>
          </div>
        );
      case "/settings/personalInformation":
        // return "Settings";
      // default:
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
             Personal Information
            </h1>
          </div>
        );
      case "/settings/faq":
        // return "Settings";
      // default:
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
            FAQ
            </h1>
          </div>
        );
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={312}
        className="sidebar-menu"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
          zIndex: 2,
        }}
        trigger={null}
      >
        <img src={logo} alt="Logo" className="mx-auto py-6 w-[264px]" />
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "white" }}
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            if (item.children) {
              return (
                <SubMenu
                  key={`submenu-${index}`}
                  title={item.title}
                  icon={item.icon}
                  style={{
                    color: isActive ? "red" : "#fff",
                    fontWeight: isActive ? "bold" : "normal",
                    fontSize: "16px",
                    marginBottom: "10px",
                    backgroundColor: isActive ? "#F2F5FC" : "transparent",
                  }}
                >
                  {item.children.map((child, childIndex) => (
                    <Menu.Item
                      key={`child-${childIndex}`}
                      icon={child.icon}
                      style={{
                        color: location.pathname === child.path ? "red" : "#fff",
                        fontWeight:
                          location.pathname === child.path ? "bold" : "normal",
                        fontSize: "16px",
                      }}
                    >
                      <Link to={child.path}>{child.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
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
            }
          })}

          <div className="flex py-36 gap-8 mt-16 px-4 w-full">
            <div className="flex gap-2 w-3/4 items-center">
              <Popover
                className="cursor-pointer"
                placement="top"
                content={content}
              >
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

      <Layout style={{ marginLeft: 312 }}>
  <Header
    style={{
      position: "fixed",
      width: "83vw",
      top: 0,
      left: 312,
      background: "#F6F6F6",
      height: "80px",
      paddingTop: "20px",
      zIndex: 10, // Increased z-index
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    }}
  >
    <div className="w-full justify-between flex items-center">
      <div>{getTitle()}</div>
      <div
        onClick={handleNotifications}
        className="cursor-pointer"
        style={{ zIndex: 11 }} // Ensure the badge has a higher z-index than other elements
      >
        <Badge count={5}>
          <Bell size={30} color="gray" />
        </Badge>
      </div>
    </div>
  </Header>

  <Content
    style={{
      marginTop: 80,
      padding: "20px",
      overflowY: "auto",
      height: `calc(100vh - 80px)`,
      background: "#1e1e1ef7",
    }}
  >
    <div className="h-full m-2 rounded p-3">
      <Outlet />
    </div>
  </Content>
</Layout>
    </Layout>
  );
};

export default Dashboard;
