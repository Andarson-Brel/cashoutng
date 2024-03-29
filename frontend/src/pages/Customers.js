import DashboardHeader from "../components/DashboardHeader";
import SideNavbar from "../components/sideNavbar";

function Customers({ userData, setUser }) {
  console.log(userData);
  return (
    <div className="dashboard-cont">
      <SideNavbar setUser={setUser} />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"Customers"} />
        {console.log(userData)}
        {userData.map((user, i) => (
          <div className="Customer-container" key={i}>
            <li className="display-flex-top">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.phoneNumber}</p>
              <p>{user.bankName}</p>
              <p>{user.accountNumber}</p>
              <p>{user.accountName}</p>
              <p>{user.email}</p>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
