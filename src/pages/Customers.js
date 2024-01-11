import DashboardHeader from "../components/DashboardHeader";
import SideNavbar from "../components/sideNavbar";

function Customers() {
  return (
    <div className="dashboard-cont">
      <SideNavbar />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"Customers"} />
      </div>
    </div>
  );
}

export default Customers;
