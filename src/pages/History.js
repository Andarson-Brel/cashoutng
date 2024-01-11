import React from "react";
import SideNavbar from "../components/sideNavbar";
import TransactionContainer from "../components/TransactionContainer";
import DashboardHeader from "../components/DashboardHeader";
function History() {
  return (
    <div className="dashboard-cont">
      <SideNavbar />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"Transactions History"} />
        <div className="flex-center">
          <TransactionContainer dashboardWidth={"80%"} />
        </div>
      </div>
    </div>
  );
}

export default History;
