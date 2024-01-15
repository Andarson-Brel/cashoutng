import React, { useState } from "react";
import { BuyCoins } from "../data";
import { toast } from "react-toastify";
import Button from "./button";

function AddCoin({ coins, coinList }) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coinInfo, setCoinInfo] = useState({ image: "", name: "", symbol: "" });
  const [walletAddress, setWalletAddress] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

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
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
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
      toast.success("Coin added successfully");
    } else {
      toast.error("Please select a coin and provide a wallet address");
    }
  };

  return (
    <>
      <Button
        buttonstyle={
          !isFormVisible
            ? {
                padding: ".5rem 1rem",
                border: "none",
                color: "black",
                borderRadius: "50px",
                background: "#77ED91",
                cursor: "pointer",
                marginBottom: "1rem",
              }
            : {
                padding: ".5rem 1rem",
                border: "none",
                color: "white",
                borderRadius: "50px",
                background: "#EA2D2D",
                cursor: "pointer",
                marginBottom: "1rem",
              }
        }
        onClick={toggleFormVisibility}
      >
        {!isFormVisible ? "+ Add New Coin" : "Close"}
      </Button>

      {isFormVisible && (
        <form className="add-coin-form">
          <h5>Add New Coin</h5>
          <select onChange={handleCoinChange} value={selectedCoin}>
            <option value="">Select Coin</option>
            {coinList.map((coinName) => (
              <option key={coinName} value={coinName}>
                {coinName}
              </option>
            ))}
          </select>
          <input
            className="walletAddressInput"
            placeholder="Wallet Address"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <button className="addCoin" type="button" onClick={handleAddCoin}>
            Add Coin
          </button>
        </form>
      )}
    </>
  );
}

export default AddCoin;
