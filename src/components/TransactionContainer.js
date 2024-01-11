import DashboardContainer from "./dashboardContainer";
import CardHeading from "./CardHeading";

function TransactionContainer({ dashboardWidth }) {
  return (
    <DashboardContainer width={dashboardWidth}>
      <CardHeading cardTitle={`Transaction History`} headtype={"card"} />
      <div className="notification-list-cont display-flex-top">
        <div className="coin-details-cont display-flex-top">
          <div className="notif-icon-cont ">
            <img
              className="notif-icon"
              src="/images/SushiSwap.svg"
              alt="coin icon"
            />
          </div>
          <div className="coin-details">
            <h5 className="transfered-coin">SushiSwap</h5>
            <p className="transaction-desc">
              Your Sell Order of $250 SushiSwap has been recieved and is
              currently under review
            </p>
          </div>
        </div>
        <div className="date-time">
          <span className="transaction-date">11 Mar 24</span>
          {/* <span className="transaction-time">11:25pm</span> */}
        </div>
      </div>
    </DashboardContainer>
  );
}

export default TransactionContainer;
