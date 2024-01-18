import { useState } from "react";
import SideNavbar from "../components/sideNavbar";
import { useParams } from "react-router-dom";

function TransactionDetail({ transactionHistory }) {
  const { id } = useParams();
  const transaction = transactionHistory.find(
    (transaction) => transaction.transactionId === id
  );
  const [adminTransactionStatus, setAdminTransactionStatus] = useState({
    Declined: false,
    Approved: false,
  });
  console.log(id);
  const [userTransactionStatus, setUserTransactionStatus] = useState(
    transaction?.transactionStatus
  );

  const handleAdminTransactionStatusChange = (status) => {
    if (!adminTransactionStatus[status]) {
      setAdminTransactionStatus((prevStatus) => ({
        ...prevStatus,
        [status]: true,

        [status === "Approved" ? "Declined" : "Approved"]: true,
      }));
      setUserTransactionStatus(status);
    }
  };

  console.log(transaction);
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
                    <span>Coin</span>{" "}
                    <span className="transactio-value">{transaction.coin}</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Quantity</span>{" "}
                    <span className="transactio-value">
                      {transaction.coinQuantity}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Amount (USD)</span>{" "}
                    <span className="transactio-value">
                      ${transaction.valueUsd}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Amount (NGR)</span>{" "}
                    <span className="transactio-value">
                      ₦{transaction.valueInNaira}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Transaction Id</span>{" "}
                    <span className="transactio-value">
                      {transaction.transactionId}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Sender</span>{" "}
                    <span className="transactio-value">{transaction.user}</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="bank-details-container">
                  <h5 className="bank-details-cont-head">Bank Detail</h5>
                  <div className="">
                    <li className="details-list">
                      <span>Bank Name</span>{" "}
                      <span className="transactio-value">
                        {transaction.bankName}
                      </span>
                    </li>
                    <hr className="transaction-hr" />
                  </div>
                  <div className="">
                    <li className="details-list">
                      <span>Account Number</span>{" "}
                      <span className="transactio-value">
                        {transaction.accountNumber}
                      </span>
                    </li>
                    <hr className="transaction-hr" />
                  </div>
                  <div className="">
                    <li className="details-list">
                      <span>Name on Account</span>{" "}
                      <span className="transactio-value">
                        {transaction.accountName}
                      </span>
                    </li>
                    <hr className="transaction-hr" />
                  </div>
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
                      : "pending-style"
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
