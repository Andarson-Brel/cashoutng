function DashboardHeader({ pageTitle }) {
  return (
    <div className="dashboard-head">
      <h3 className="dashboard-page-title">{pageTitle}</h3>
      <div className="notif-profile">
        {/* <span className="icon-cont">
          <img src="/images/notification-bing.svg" alt="icon" />
        </span> */}
        <span className="icon-cont">
          <img src="/images/user.svg" alt="icon" />
        </span>
      </div>
    </div>
  );
}

export default DashboardHeader;
