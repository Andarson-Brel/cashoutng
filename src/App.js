import Homepage from "./pages/homePage";
import TopNavbar from "./components/topNavbar";
import { Route, Routes } from "react-router-dom";
import SignUpPgae from "./pages/signUp";
import DashBoard from "./pages/dashboard";
// import SideNavbar from "./components/sideNavbar";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Trade from "./pages/trade";
import Customers from "./pages/Customers";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionDetail from "./pages/transaction-detail";
function App() {
  const [coins, setCoins] = useState([]);
  const [bankList, setBankList] = useState([]);
  useEffect(() => {
    axios
      .get("https://nubapi.com/bank-json")
      .then((response) => {
        setBankList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const bankNames = bankList.map((bank) => {
    return bank.name;
  });
  const coinNames = coins.map((coin) => {
    return coin.name;
  });
  bankNames.push("Opay");
  // console.log(coinNames);
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage TopNavbar={TopNavbar} />} />
        <Route path="Sign-up" element={<SignUpPgae bankNames={bankNames} />} />
        <Route
          path="Dashboard"
          element={<DashBoard coins={coins} coinNames={coinNames} />}
        />
        <Route path="profile" element={<Profile />} />
        <Route path="history" element={<History />} />
        <Route
          path="Trade"
          element={<Trade coins={coins} coinNames={coinNames} />}
        />
        <Route path="customers" element={<Customers />} />
        <Route path="transaction-detail" element={<TransactionDetail />} />
      </Routes>
    </>
  );
}

export default App;
