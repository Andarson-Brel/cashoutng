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
  const [dataTransaction, setDataTransaction] = useState([]);
  const [response, setResponse] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  const [testCoin, setTestCoin] = useState([]);

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
      .get("https://app.nuban.com.ng/bank_codes.json")
      .then((response) => {
        setBankList(response.data);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((response) => {
        setDataTransaction(response.data[0]);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/coins")
      .then((response) => {
        setAllCoins(response.data[0]);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setAllUsers(response.data[0]);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
          {
            headers: {
              "X-CoinAPI-Key": "F85CC588-89CE-4220-AB28-EF6E4C801297", // Replace with your API key
            },
          }
        );
        setTestCoin(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  console.log("testCoin:", testCoin);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en&api_key=CG-8RfyawE6WFgyRVRzeTss94Rn"
        );
        const result = await response.json();
        setCoins(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bankNames = bankList.map((bank) => {
    return bank.bank_name;
  });
  const coinNames = allCoins.map((coin) => {
    return coin.name;
  });

  // // bankNames.push("Opay");
  // console.log("all coind:", allCoins);
  // console.log("all users", allUsers);
  console.log("all transactions", dataTransaction);

  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={<Homepage TopNavbar={TopNavbar} userData={userData} />}
        />
        <Route
          path="Sign-up"
          element={<SignUpPgae bankNames={bankNames} bankList={bankList} />}
        />
        <Route
          path="Dashboard"
          element={
            <DashBoard
              coins={coins}
              dbCoins={allCoins}
              coinNames={coinNames}
              transactionHistory={transactionHistory}
            />
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route
          path="history"
          element={<History transactionHistory={dataTransaction} />}
        />
        <Route
          path="Trade"
          element={
            <Trade coins={coins} coinNames={coinNames} dbCoins={allCoins} />
          }
        />
        <Route path="customers" element={<Customers userData={allUsers} />} />
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
