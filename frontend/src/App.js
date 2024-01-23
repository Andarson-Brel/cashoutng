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
  const [user, setUser] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [response, setResponse] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  const [testCoin, setTestCoin] = useState([]);
  // get bank details
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

  // get current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/auth/current_user",
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          toast.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchCurrentUser();
  }, []);

  // get transactionHistory
  useEffect(() => {
    console.log("helo");
    axios
      .get("http://localhost:5000/api/transactions")
      .then((response) => {
        console.log("omo");
        console.log("response:", response);
        setDataTransaction(response.data);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  // CoinList from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/coins")
      .then((response) => {
        setAllCoins(response.data);
        // console.log("all coins", allCoins);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  // all users
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setUserData(response.data[0]);
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

  // get coins from coingecko api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en&api_key=CG-8RfyawE6WFgyRVRzeTss94Rn"
        );
        const result = await response.json();
        setCoins(result);
        // console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bankNames = bankList.map((bank) => {
    return bank.bank_name;
  });
  const coinNames = allCoins?.map((coin) => {
    return coin.name;
  });

  // // bankNames.push("Opay");
  // console.log("all coind:", allCoins);
  // console.log("all users", allUsers);
  console.log("all transactions", dataTransaction);
  console.log("all data", userData);
  console.log("current user", user);

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
              transactionHistory={dataTransaction}
              user={user}
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
            <Trade
              coins={coins}
              coinNames={coinNames}
              dbCoins={allCoins}
              user={user}
            />
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
