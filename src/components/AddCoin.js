import React, { useState } from "react";
import { BuyCoins } from "../data";

function AddCoin({ coins, coinList }) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coinInfo, setCoinInfo] = useState({ image: "", name: "", symbol: "" });
  const [walletAddress, setWalletAddress] = useState(""); // State to store wallet address

  const handleCoinChange = (event) => {
    const selectedCoinName = event.target.value;
    setSelectedCoin(selectedCoinName);

    const selectedCoinData = coins.find(
      (coin) => coin.name === selectedCoinName
    );

    if (selectedCoinData) {
      setCoinInfo({
        image: selectedCoinData.image,
        name: selectedCoinData.name,
        symbol: selectedCoinData.symbol,
      });
    } else {
      setCoinInfo({ image: "", name: "", symbol: "" });
    }
  };

  const handleAddCoin = (e) => {
    e.preventDefault();
    // Validate if a coin is selected and wallet address is provided
    if (selectedCoin && walletAddress) {
      const newCoin = { ...coinInfo, walletAddress };
      BuyCoins.push(newCoin);
      //   BuyCoins.push([coinInfo, walletAddress]);

      // Clear the selected coin, coinInfo, and wallet address
      setSelectedCoin("");
      setCoinInfo({ image: "", name: "", symbol: "" });
      setWalletAddress("");

      // You can also perform any other necessary actions here
      console.log("Coin added successfully", BuyCoins);
    } else {
      console.log("Please select a coin and provide a wallet address");
    }
  };

  return (
    <form className="add-coin-form">
      <select onChange={handleCoinChange} value={selectedCoin}>
        <option value="">Select Coin</option>
        {coinList.map((coinName) => (
          <option key={coinName} value={coinName}>
            {coinName}
          </option>
        ))}
      </select>
      <input
        placeholder="Wallet Address"
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button className="addCoin" type="button" onClick={handleAddCoin}>
        Add Coin
      </button>
    </form>
  );
}

export default AddCoin;
