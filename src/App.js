import Homepage from "./pages/homePage";
import TopNavbar from "./components/topNavbar";
import { Route, Routes } from "react-router-dom";
import SignUpPgae from "./pages/signUp";
import DashBoard from "./pages/dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [userData, setUserData] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  useEffect(() => {
    const storedTransaction = localStorage.getItem("TransactionHistory");

    if (storedTransaction) {
      const parsedTransactions = JSON.parse(storedTransaction);
      setTransactionHistory(parsedTransactions);
    }
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userDatas");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);
  useEffect(() => {
    axios
      .get("https://nubapi.com/bank-json")
      .then((response) => {
        setBankList(response.data);
      })
      .catch((error) => {
        toast(error);
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
        toast.error("Error fetching coin data:", error);
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
  // console.log(userData);
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={<Homepage TopNavbar={TopNavbar} userData={userData} />}
        />
        <Route path="Sign-up" element={<SignUpPgae bankNames={bankNames} />} />
        <Route
          path="Dashboard"
          element={
            <DashBoard
              coins={coins}
              coinNames={coinNames}
              transactionHistory={transactionHistory}
            />
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route
          path="history"
          element={<History transactionHistory={transactionHistory} />}
        />
        <Route
          path="Trade"
          element={<Trade coins={coins} coinNames={coinNames} />}
        />
        <Route path="customers" element={<Customers />} />
        <Route
          path="transaction/:id"
          element={
            <TransactionDetail transactionHistory={transactionHistory} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
