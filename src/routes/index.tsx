import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import ProductListing from "../pages/ProductListing";
import Category_Management from "../pages/Category_Management";
import Manage_Users from "../pages/Manage_Users";
import Love from "../pages/Love";
import Transactions from "../pages/Transactions";
import SettingsPage from "../pages/Settings";
import Notifications from "../pages/Notifications";



const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("16++++++++++++++Notification clicked!");
    // Add your notification handling logic here
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard handleNotifications={handleNotifications} />,
        children: [
            {
                path: "/",
                element: <DasboardHome />,
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/productListing",
                element: <ProductListing />,
            },
            {
                path: "/catgegory_anagement",
                element: <Category_Management />,
            },
            {
                path: "/manage-users",
                element: <Manage_Users />,
            },
            {
                path: "/love",
                element: <Love />,
            },
            {
                path: "/transactions",
                element: <Transactions />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },
        ]
    }
])

export default router;