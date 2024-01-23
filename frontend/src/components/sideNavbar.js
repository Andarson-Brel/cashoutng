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
// import { useNavigate } from "react-router-dom";

//
export default function SideNavbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout API endpoint
      await axios.post("http://localhost:5000/auth/logout", {});

      // navigate("/");
      // Redirect to the home page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error as needed
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
          <MenuItem component={<Link to="/customers" />}>
            <span className="menuItemSpan">
              <img src="/images/customers.svg" alt="customers-Icon" />
            </span>{" "}
            Customers
          </MenuItem>
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
