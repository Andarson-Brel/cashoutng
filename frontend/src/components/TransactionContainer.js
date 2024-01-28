import DashboardContainer from "./dashboardContainer";
import CardHeading from "./CardHeading";
import { Link } from "react-router-dom";

function TransactionContainer({
  dashboardWidth,
  transactionHistory,
  isAdmin,
  currenUser,
}) {
  const currenUserId = currenUser?.id;
  const currentUserTransactions = transactionHistory.filter(
    (transaction) => transaction?.user?.id === currenUserId
  );
  // console.log(transactionHistory);
  return (
    <DashboardContainer width={dashboardWidth}>
      <CardHeading cardTitle={`Transaction History`} headtype={"card"} />

      {isAdmin
        ? transactionHistory?.map((transaction, i) => (
            <Link key={i} to={`/transaction/${transaction.id}`}>
              <div className="notification-list-cont display-flex-top">
                <div className="coin-details-cont display-flex-top">
                  <div className="notif-icon-cont ">
                    <img
                      className="notif-icon"
                      src={transaction?.coin.logo}
                      alt="coin icon"
                    />
                  </div>
                  <div className="coin-details">
                    <h5 className="transfered-coin">
                      {transaction?.coin.name}
                    </h5>
                    <p className="transaction-desc">
                      Just Recieved a Sell Order Of ${transaction?.valueUsd}{" "}
                      {transaction?.coin.name} From {transaction.user.username}
                    </p>
                  </div>
                </div>
                <div className="date-time">
                  <span className="transaction-date">11 Mar 24</span>
                  {/* <span className="transaction-time">11:25pm</span> */}
                </div>
              </div>
            </Link>
          ))
        : currentUserTransactions?.map((transaction, i) => (
            <Link key={i} to={`/transaction/${transaction.id}`}>
              <div className="notification-list-cont display-flex-top">
                <div className="coin-details-cont display-flex-top">
                  <div className="notif-icon-cont ">
                    <img
                      className="notif-icon"
                      src={transaction?.coin.logo}
                      alt="coin icon"
                    />
                  </div>
                  <div className="coin-details">
                    <h5 className="transfered-coin">
                      {transaction?.coin.name}
                    </h5>
                    <p className="transaction-desc">
                      Your Sell Order of ${transaction?.valueUsd}{" "}
                      {transaction?.coin.name} has been recieved and is
                      currently under review
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
