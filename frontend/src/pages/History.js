import React from "react";
import SideNavbar from "../components/sideNavbar";
import TransactionContainer from "../components/TransactionContainer";
import DashboardHeader from "../components/DashboardHeader";
function History({transactionHistory}) {
  return (
    <div className="dashboard-cont">
      <SideNavbar />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"Transactions History"} />
        <div className="flex-center">
          <TransactionContainer dashboardWidth={"80%"} transactionHistory={transactionHistory}/>
        </div>
      </div>
    </div>
  );
}

export default History;
