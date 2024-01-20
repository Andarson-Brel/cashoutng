import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Rate({ dbCoins }) {
  console.log(dbCoins);
  // const [rate, setRate] = useState[""];
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/exchange_rate")
  //     .then((response) => {
  //       setRate(response.data[0]);
  //     })
  //     .catch((error) => {
  //       toast(error);
  //     });
  // }, []);
  // console.log("rate:", rate);
  return (
    <div>
      <h4>Current Rate</h4>
      {dbCoins.map((coin) => (
        <p key={coin.id}>
          {coin.name} at ₦{coin.exchangeRate}/$
        </p>
      ))}
    </div>
  );
}

export default Rate;
