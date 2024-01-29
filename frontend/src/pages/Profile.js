import React from "react";
import SideNavbar from "../components/sideNavbar";

function Profile({ setUser }) {
  return (
    <div className="dashboard-cont">
      <SideNavbar setUser={setUser} />
      <div className="dashboard-main">
        <h1>Profile</h1>
      </div>
    </div>
  );
}

export default Profile;
