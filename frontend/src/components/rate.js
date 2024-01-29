import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Rate({ dbCoins }) {
  return (
    <div>
      <h4>Current Rate</h4>
      {dbCoins?.map((coin) => (
        <p key={coin.id}>
          {coin.name} at ₦{coin.exchangeRate}/$
        </p>
      ))}
    </div>
  );
}

export default Rate;
