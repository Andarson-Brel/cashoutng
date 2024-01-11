import { useState } from "react";
import SideNavbar from "../components/sideNavbar";

function TransactionDetail() {
  const [adminTransactionStatus, setAdminTransactionStatus] = useState({
    Declined: false,
    Approved: false,
  });

  const [userTransactionStatus, setUserTransactionStatus] = useState("pending");

  const handleAdminTransactionStatusChange = (status) => {
    if (!adminTransactionStatus[status]) {
      setAdminTransactionStatus((prevStatus) => ({
        ...prevStatus,
        [status]: true,

        // Disable the other checkbox
        [status === "Approved" ? "Declined" : "Approved"]: true,
      }));
      setUserTransactionStatus(status);
    }
  };
  return (
    <div>
      <div className="dashboard-cont">
        <SideNavbar />
        <div className="dashboard-main">
          <div className="transaction-cont">
            <div className="transaction-card">
              <h4 className="transaction-head">Transaction Status</h4>
              <div className="details-cont">
                <div className="">
                  <li className="details-list">
                    <span>Coin</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Quantity</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Amount (USD)</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Amount (NGR)</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Transaction Id</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Sender</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Screenshot</span> <span>btc</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
              </div>
              <div className="transction-status-cont">
                <div className="admin-transaction-status">
                  <label>
                    <input
                      type="checkbox"
                      checked={adminTransactionStatus.Declined}
                      onChange={() =>
                        handleAdminTransactionStatusChange("Declined")
                      }
                      disabled={adminTransactionStatus.Declined}
                    />
                    Declined
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={adminTransactionStatus.Approved}
                      onChange={() =>
                        handleAdminTransactionStatusChange("Approved")
                      }
                      disabled={adminTransactionStatus.Approved}
                    />
                    Approved
                  </label>
                </div>
                <div
                  className={`user-transaction-status ${
                    userTransactionStatus === "Approved"
                      ? "approve-style"
                      : userTransactionStatus === "Declined"
                      ? "decline-style"
                      : ""
                  }`}
                >
                  {userTransactionStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;
