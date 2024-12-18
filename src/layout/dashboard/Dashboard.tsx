import React from "react";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import { Bell, Lock, LogOut, User, User2Icon } from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Images/LogoAndTitle.svg";
import logoChoozy from "../../assets/Images/dashboard/pie-chart.svg";
import productListing from "../../assets/Images/dashboard/tag.png";
import productListing1 from "../../assets/Images/dashboard/productlisting1.svg";
import categoryManagement from "../../assets/Images/dashboard/categoryManagement.png";
import categoryManagement1 from "../../assets/Images/dashboard/categoryManagement1.svg";
import transaction1 from "../../assets/Images/dashboard/transactiopns1.svg";
import transaction from "../../assets/Images/dashboard/transaction.svg";
import { FaRegUserCircle, FaRegHeart, FaChartPie, FaUserCircle, FaLock, FaHeart } from "react-icons/fa";
import { BsCartXFill,  BsCartX } from "react-icons/bs";

import { CiCreditCard1 } from "react-icons/ci";
import settings from "../../assets/Images/dashboard/settings.png";
import SubMenu from "antd/es/menu/SubMenu";
import "./Styled_components.css";
import { BiPieChartAlt2 } from "react-icons/bi";
import { IoIosCard } from "react-icons/io";
import { useGetProfileQuery } from "../../redux/features/getProfleApi";
import { useGetNotificationsQuery } from "../../redux/features/getNotificationApi";
import { usePostLogoutMutation } from "../../redux/features/postLoguout";
import Swal from "sweetalert2";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";

const { Header, Sider, Content } = Layout;

interface MenuItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: <BiPieChartAlt2 size={18} color="#4964C6" />,
    activeIcon: <FaChartPie size={18} color="#4964C6" />,
  },
  {
    path: "/productListing",
    title: "Product Listing",
    icon: <img src={productListing} alt="Logo" width={18} height={18} />,
    activeIcon: <img src={productListing1} alt="Logo" width={18} height={18}  />,
  },
  {
    path: "/category_management",
    title: "Category Management",
    icon: <img src={categoryManagement} alt="Logo" width={18} height={18} />,
    activeIcon: <img src={categoryManagement1} alt="Logo" width={18} height={18} />,
  },
  {
    path: "/manage-users",
    title: "Manage Users",
    icon: <FaRegUserCircle size={18} color="#4964C6" />,
    activeIcon: <FaUserCircle size={18} color="#4964C6" />,

  },
  // {
  //   path: "/love",
  //   title: "Love",
  //   icon: <FaRegHeart color="#4964C6" size={18} />,
  //   activeIcon: <FaHeart size={18} color="#4964C6" />,
  // },
  {
    path: "/transactions",
    title: "Transactions",
    icon: <img src={transaction} alt="Logo" width={18} height={18} />,
    activeIcon: <img src={transaction1} alt="Logo" width={18} height={18} />,
  },
  {
    path: "/rejectionOrder",
    title: "Rejection Order",
    icon: <BsCartX size={18} color="#4964C6"/>,
    activeIcon: <BsCartXFill size={18} color="#4964C6" />
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <img src={settings} alt="Logo" width={18} height={18} />,
    activeIcon: <img src={settings} alt="Logo" width={18} height={18} style={{ filter: "invert(1)" }} />,
    children: [
      {
        path: "/settings/aboutus",
        title: "About us",
        icon: <HiOutlineUserGroup size={18} color="#4964C6" />,
        activeIcon: <HiUserGroup size={18} color="#4964C6" />,
      },
      {
        path: "/settings/personalInformation",
        title: "Personal information",
        icon: <FaRegUserCircle size={18} color="#4964C6" />,
        activeIcon: <FaUserCircle size={18} color="#4964C6" />,
      },
      {
        path: "/settings/faq",
        title: "FAQ",
        icon: <Lock size={18} color="#4964C6" />,
        activeIcon: <FaLock size={18} color="#4964C6" />,
      },
      {
        path: "/settings/termsAndCondition",
        title: "Terms & Conditions",
        icon: <CiCreditCard1 color="#4964C6" size={18} />,
        activeIcon: <IoIosCard color="#4964C6" size={18} />,
      },
    ],
  },
];

const content = (
  <div className="w-40">
    <p className="mb-2">
      <Link to="/settings/personalInformation" className="flex items-center gap-2">
        <User2Icon size={18} /> <span className="text-md">Profile</span>
      </Link>
    </p>
    <p className="mb-3">
      <Link to="/auth/set-new-password" className="flex items-center gap-2">
        <Lock size={18} /> <span className="text-md">Change password</span>
      </Link>
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  const { data, isLoading, isError } = useGetProfileQuery();
  const {data: notification} = useGetNotificationsQuery();
  const [postLogout] = usePostLogoutMutation();
  console.log(data?.data?.full_name);
  const navigate = useNavigate();
  const location = useLocation();
const allNotify = notification?.data?.map(item => item?.read_at) || [];
const nullCount = allNotify.filter(nullCont => nullCont === null).length
console.log("184", nullCount);

  const handleLogout =async () => {
    const gettoken = localStorage.getItem('token')
    console.log("136",gettoken)
    const response= await postLogout();
    localStorage.removeItem('token')
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'LOGGED OUT',
        text: 'Logout Success',
        timer: 3000,
        toast: true,
        position: 'center',
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the image.',
      });
    }
    console.log("138",response)
    navigate("/auth/login");
  };

  const handleNotifications = () => {
    navigate("/notifications");
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">
            <span className="text-[#B0B0B0]">Hello,</span> Globetrotter 👋
          </h1>
        );
      case "/productListing":
        return <h1 className="text-[#333333] font-bold text-[24px]">Manage Listings</h1>;
      case "/category_management":
        return <h1 className="text-[#333333] font-bold text-[24px]">Manage Category</h1>;
      case "/manage-users":
        return <h1 className="text-[#333333] font-bold text-[24px]">Manage Users</h1>;
      case "/love":
        return <h1 className="text-[#333333] font-bold text-[24px]">Love</h1>;
      case "/transactions":
        return <h1 className="text-[#333333] font-bold text-[24px]">Transactions</h1>;
      case "/settings":
        return <h1 className="text-[#333333] font-bold text-[24px]">Settings</h1>;
      default:
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">
            <span className="text-[#B0B0B0]">Hello,</span> Globetrotter 👋
          </h1>
        );
    }
  };
  const getMenuIcon = (icon: React.ReactNode, activeIcon: React.ReactNode, isActive: boolean) => {
    return isActive ? activeIcon : icon;
  };

  return (
    <Layout>
      <Sider
        width={300}
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
        <Menu mode="inline" 
        style={{ background: "#1E1E1E", color: "white" }} 
        // defaultSelectedKeys={["1"]}
        selectedKeys={[location.pathname]}
        >
         <div className="flex h-[85vh] flex-col justify-between px-4">
         <div>
         {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            if (item.children) {
              return (
                <SubMenu
                  key={`submenu-${index}`}
                  title={item.title}
                  icon={getMenuIcon(item.icon, item.activeIcon, isActive)}
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
                      icon={getMenuIcon(child.icon, child.activeIcon, location.pathname === child.path)}
                      style={{
                        color: location.pathname === child.path ? "red" : "#fff",
                        fontWeight: location.pathname === child.path ? "bold" : "normal",
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
                        icon={getMenuIcon(item.icon, item.activeIcon, isActive)}
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
         </div>
          <div className="flex gap-8 px-4 w-full">
            <div className="flex gap-2 w-3/4 items-center">
              <Popover className="cursor-pointer" placement="top" content={content}>
                <Avatar style={{ width: "40px", height: "40px", backgroundColor: "gray" }} icon={<User size={25} />} />
              </Popover>
              <div className="space-y-4">
                <h1 className="text-black">John Doe</h1>
                <h1 className="text-black">ex@ample.com</h1>
              </div>
            </div>
            <Menu.Item key="500" icon={<LogOut size={20} />} style={{ color: "red", fontSize: "16px" }} onClick={handleLogout} />
          </div>
         </div>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 300 }}>
        <Header
          style={{
            position: "fixed",
            width: "calc(100% - 300px)",
            top: 0,
            left: 300,
            background: "#F6F6F6",
            height: "80px",
            paddingTop: "20px",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="w-full flex justify-between">
            <div>{getTitle()}</div>
            <div onClick={handleNotifications} className="cursor-pointer" style={{ zIndex: 11 }}>
              <Badge count={nullCount}>
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
