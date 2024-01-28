import React, { useState } from "react";
import axios from "axios";
import { BuyCoins } from "../data";
import { toast } from "react-toastify";
import Button from "./button";

function AddCoin({ coins, coinList }) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coinInfo, setCoinInfo] = useState({
    logo: "",
    name: "",
    abv: "",
    exchangeRate: "",
  });
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
        logo: selectedCoinData.image,
        name: selectedCoinData.name,
        abv: selectedCoinData.symbol,
        exchangeRate: "", // Clear the exchange rate if the coin changes
      });
    } else {
      setCoinInfo({ logo: "", name: "", abv: "", exchangeRate: "" });
    }
  };
  // console.log(selectedCoin);
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddCoin = async (e) => {
    e.preventDefault();

    // Validate if a coin is selected, wallet address is provided, and exchange rate is entered
    if (selectedCoin && walletAddress && coinInfo.exchangeRate) {
      const newCoin = { ...coinInfo, walletAddress };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/coin",
          newCoin
        );

        if (response.status === 201) {
          // Clear the selected coin, coinInfo, and wallet address
          setSelectedCoin("");
          setCoinInfo({ logo: "", name: "", abv: "", exchangeRate: "" });
          setWalletAddress("");

          toast.success("Coin added successfully");
          // Refresh the page
          window.location.reload();
        } else {
          toast.error("Failed to add coin. Please try again.");
        }
      } catch (error) {
        console.error("Error adding coin:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error(
        "Please select a coin, provide a wallet address, and enter the exchange rate"
      );
    }
  };

  // console.log(coinList);
  // console.log(coinInfo);
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
            {coinList.map((coinName, i) => (
              <option key={i} value={coinName}>
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
          <input
            className="walletAddressInput"
            placeholder="Rate"
            type="number"
            value={coinInfo.exchangeRate}
            onChange={(e) =>
              setCoinInfo({ ...coinInfo, exchangeRate: e.target.value })
            }
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
