import { useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function TransactionDetail({ transactionHistory, isAdmin }) {
  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [adminTransactionStatus, setAdminTransactionStatus] = useState({
    Declined: false,
    Approved: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/transaction/${id}`)
      .then((response) => {
        console.log("omo transaction");
        console.log("response:", response.data);
        setTransaction(response.data);
        setAdminTransactionStatus({
          Declined: response.data.status === "failure",
          Approved: response.data.status === "success",
        });
      })
      .catch((error) => {
        toast(error);
      });
  }, [id]);

  const handleCheckboxChange = (status) => {
    const updateData = {
      status: status === "Approved" ? "success" : "failure",
    };

    axios
      .put(`http://localhost:5000/api/transaction/${id}`, updateData)
      .then((response) => {
        setTransaction(response.data);
        setAdminTransactionStatus({
          Declined: response.data.status === "failure",
          Approved: response.data.status === "success",
        });
        toast(`Transaction ${status === "Approved" ? "approved" : "declined"}`);
      })
      .catch((error) => {
        toast(error);
      });
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
                    <span>Coin</span>{" "}
                    <span className="transactio-value">
                      {transaction?.coin?.name}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Quantity</span>{" "}
                    <span className="transactio-value">
                      {transaction?.quantity}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Amount (USD)</span>{" "}
                    <span className="transactio-value">
                      ${transaction?.valueUsd}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Amount (NGR)</span>{" "}
                    <span className="transactio-value">
                      ₦{transaction?.valueInNaira}
                    </span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                <div className="">
                  <li className="details-list">
                    <span>Transaction Id</span>{" "}
                    <span className="transactio-value">{transaction?.id}</span>
                  </li>
                  <hr className="transaction-hr" />
                </div>
                {isAdmin && (
                  <div className="">
                    <li className="details-list">
                      <span>Sender</span>{" "}
                      <span className="transactio-value">
                        {transaction?.user?.username}
                      </span>
                    </li>
                    <hr className="transaction-hr" />
                  </div>
                )}
                {isAdmin && (
                  <div className="bank-details-container">
                    <h5 className="bank-details-cont-head">Bank Detail</h5>
                    <div className="">
                      <li className="details-list">
                        <span>Bank Name</span>{" "}
                        <span className="transactio-value">
                          {transaction?.user?.bank}
                        </span>
                      </li>
                      <hr className="transaction-hr" />
                    </div>
                    <div className="">
                      <li className="details-list">
                        <span>Account Number</span>{" "}
                        <span className="transactio-value">
                          {transaction?.user?.accountNumber}
                        </span>
                      </li>
                      <hr className="transaction-hr" />
                    </div>
                    <div className="">
                      <li className="details-list">
                        <span>Name on Account</span>{" "}
                        <span className="transactio-value">
                          {transaction?.user?.accountName}
                        </span>
                      </li>
                      <hr className="transaction-hr" />
                    </div>
                  </div>
                )}
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
                      disabled={adminTransactionStatus.Declined}
                      onChange={() => handleCheckboxChange("Declined")}
                    />
                    Declined
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={adminTransactionStatus.Approved}
                      disabled={adminTransactionStatus.Approved}
                      onChange={() => handleCheckboxChange("Approved")}
                    />
                    Approved
                  </label>
                </div>

                <div
                  className={`user-transaction-status ${
                    transaction.status === "success"
                      ? "approve-style"
                      : transaction.status === "failure"
                      ? "decline-style"
                      : "pending-style"
                  }`}
                >
                  {transaction.status === "success"
                    ? "Approved"
                    : transaction.status === "failure"
                    ? "Declined"
                    : "Pending"}
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
