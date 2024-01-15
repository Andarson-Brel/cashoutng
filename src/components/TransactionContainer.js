import DashboardContainer from "./dashboardContainer";
import CardHeading from "./CardHeading";
import { Link } from "react-router-dom";

function TransactionContainer({ dashboardWidth, transactionHistory }) {
  return (
    <DashboardContainer width={dashboardWidth}>
      <CardHeading cardTitle={`Transaction History`} headtype={"card"} />

      {transactionHistory?.map((transaction, i) => (
        <Link key={i} to={`/transaction/${transaction.transactionId}`}>
          <div className="notification-list-cont display-flex-top">
            <div className="coin-details-cont display-flex-top">
              <div className="notif-icon-cont ">
                <img
                  className="notif-icon"
                  src={transaction?.coinIcon}
                  alt="coin icon"
                />
              </div>
              <div className="coin-details">
                <h5 className="transfered-coin">{transaction.coin}</h5>
                <p className="transaction-desc">
                  Your Sell Order of ${transaction.valueUsd} {transaction.coin}{" "}
                  has been recieved and is currently under review
                </p>
              </div>
            </div>
            <div className="date-time">
              <span className="transaction-date">11 Mar 24</span>
              {/* <span className="transaction-time">11:25pm</span> */}
            </div>
          </div>
        </Link>
      ))}
    </DashboardContainer>
  );
}

export default TransactionContainer;
