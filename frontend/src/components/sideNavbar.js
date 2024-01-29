import { Link, useNavigate } from "react-router-dom";
import Button from "./button";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
  menuClasses,
  menuItemStyles,
} from "react-pro-sidebar";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

//
export default function SideNavbar(setUser, isAdmin) {
  console.log("is admin", isAdmin);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
<<<<<<< HEAD
      // Make a POST request to the logout API endpoint
      await axios.get("http://localhost:5000/auth/logout");
      console.log("===================loggin out user =================");
      navigate("/");
      // Redirect to the home page
=======
      const response = await fetch("http://localhost:5000/auth/logout", {
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      // setUser(data);
      console.log("i was clicked");

      console.log("test");
      navigate("/");
>>>>>>> 97e019c03d03e9075afa72924d1fd8af2bcc2e7f
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            height: "100vh",
            color: "#000000",
            paddingTop: "1rem",
            position: "fixed",
            top: 0,
            width: "250px",
            // zIndex: -1,
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#02291b",
              },
            },
          }}
        >
          <MenuItem component={<Link to="/dashboard" />}>
            <span>
              <img
                src="/images/logo-main.svg"
                alt="dashboard-Icon"
                className="logo-icon"
              />
            </span>
          </MenuItem>
          <MenuItem component={<Link to="/dashboard" />}>
            <span className="menuItemSpan">
              <img src="/images/dashboard.svg" alt="dashboard-Icon" />
            </span>
            DashBoard
          </MenuItem>

          <MenuItem component={<Link to="/trade" />}>
            <span className="menuItemSpan">
              <img src="/images/trade.svg" alt="Trade-Icon" />
            </span>
            Trade
          </MenuItem>
          <MenuItem component={<Link to="/history" />}>
            <span className="menuItemSpan">
              <img src="/images/history.svg" alt="history-Icon" />
            </span>{" "}
            History{" "}
          </MenuItem>
          {isAdmin && (
            <MenuItem component={<Link to="/customers" />}>
              <span className="menuItemSpan">
                <img src="/images/customers.svg" alt="customers-Icon" />
              </span>{" "}
              Customers
            </MenuItem>
          )}
          <MenuItem component={<Link to="/profile" />}>
            <span className="menuItemSpan">
              <img src="/images/profile.svg" alt="profile-Icon" />
            </span>
            Profile{" "}
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <span className="menuItemSpan">
              <img src="/images/profile.svg" alt="profile-Icon" />
            </span>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
