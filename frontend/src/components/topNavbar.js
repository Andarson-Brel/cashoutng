import { Link } from "react-router-dom";

function TopNavbar() {
  return (
    <nav className="navbar ninety-percent">
      <img className="logo" src="images/logo-main.svg" alt="main logo" />

      <ul className="mav-menu">
        <li className="nav-list nav-active">Home</li>
        <li className="nav-list">Trade</li>
        <li className="nav-list">List</li>
        <li className="nav-list">About</li>
        <li className="nav-list">Contact</li>
      </ul>

      <div className="cta-btn">
        <Link to={"sign-up"}>
          <button className="sign-up">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default TopNavbar;
