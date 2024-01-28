import React from "react";
import SideNavbar from "../components/sideNavbar";
import TransactionContainer from "../components/TransactionContainer";
import DashboardHeader from "../components/DashboardHeader";
function History({ transactionHistory, setUser, isAdmin, currenUser }) {
  return (
    <div className="dashboard-cont">
      <SideNavbar setUser={setUser} />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"Transactions History"} />
        <div className="flex-center">
          <TransactionContainer
            dashboardWidth={"80%"}
            transactionHistory={transactionHistory}
            isAdmin={isAdmin}
            currenUser={currenUser}
          />
        </div>
      </div>
    </div>
  );
}

export default History;
