import { useState } from "react";
import Button from "./button";
import Modal from "./modal";
// import { BuyCoins, TransactionHistory } from "../data";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import Rate from "./rate";

function SellCoinForm({
  formType,
  onBtnClick,
  coins,
  coinNames,
  updateSelectedCoinWallet,
  dbCoins,
}) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [valueUsd, setValueUsd] = useState(0);
  const [activeButton, setActiveButton] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isModalCopied, setIsModalCopied] = useState(false);
  const [file, setFile] = useState(null);
  // const todayRate = 1210;
  const openModal = (e) => {
    e.preventDefault();

    if (quantity > 0 && selectedCoin) {
      setModalOpen(true);
    } else {
      toast.error("Quantity Field is Empty");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append("file", uploadedFile);

    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const fileData = e.target.result;
    // };
    // reader.result(uploadedFile);
  };
  const handleQuickTradeButtonClick = (buttonText, e) => {
    e.preventDefault();
    setActiveButton(buttonText);
    const selectedCoinWallet = dbCoins.find((coin) => coin.abv === buttonText);

    setSelectedCoin(selectedCoinWallet.name);
    if (selectedCoinWallet) {
    }

    setValueUsd(0);
    setQuantity(0);
  };
  const generateUniqueTransactionId = () => {
    return uuidv4();
  };
  const handleCoinChange = (event) => {
    const selectedCoinName = event.target.value;
    setSelectedCoin(selectedCoinName);
    const selectedCoinWallet = dbCoins.find(
      (coin) => coin.name === selectedCoinName
    );
    if (selectedCoinWallet) {
      updateSelectedCoinWallet(selectedCoinWallet.walletAddress);
    }

    setValueUsd(0);
    setQuantity(0);
  };
  const handleUsdValueChange = (event) => {
    const newValueUsd = parseFloat(event.target.value);
    setValueUsd(newValueUsd);

    if (selectedCoin && !isNaN(newValueUsd)) {
      const selectedCoinData = coins.find((coin) => coin.name === selectedCoin);

      if (selectedCoinData) {
        setQuantity(newValueUsd / selectedCoinData.current_price);
      } else {
        console.log("error");
      }
    } else {
      setQuantity(0);
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseFloat(event.target.value);
    setQuantity(newQuantity);

    if (selectedCoin && !isNaN(newQuantity)) {
      const selectedCoinData = coins.find((coin) => coin.name === selectedCoin);

      if (selectedCoinData) {
        setValueUsd(newQuantity * selectedCoinData.current_price);
      } else {
        console.log("error");
      }
    } else {
      setValueUsd(0);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const transactionId = generateUniqueTransactionId();

    const transaction = {
      // coinIcon: selectedCoinInfo.image,
      // transactionId: transactionId,
      // coinName: selectedCoin,
      quantity: quantity,
      valueUsd: valueUsd,
      valueInNaira: valueInNaira,
      // imgUrl: file,
      // userName: "Andara Daniel",
      userId: transactionId,
      coinId: transactionId,
      // dateTimeCreated: new Date(),
      // bankName: "Opay",
      // accountName: "Test Account",
      // accountNumber: "12345678",
      status: "Awaiting Confirmation",
    };

    fetch("http://localhost:5000/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the successful response data
        // console.log(data);
        toast.success("Order Successful!");
        closeModal();
      })
      .catch((error) => {
        // Handle errors during the fetch
        console.log(error.message);
        console.error("Error submitting transaction:", error);
        toast.error("Error submitting transaction. Please try again.");
      });
  }

  const handleCopyClick = () => {
    const walletAddress = selectedCoinInfo?.walletAddress;
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };
  const handleModalCopyClick = () => {
    const walletAddress = selectedCoinInfo?.walletAddress;
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setIsModalCopied(true);

      setTimeout(() => {
        setIsModalCopied(false);
      }, 2000);
    }
  };
  const selectedCoinInfo = dbCoins.find((coin) => coin.name === selectedCoin);
  const valueInNaira = Math.round(valueUsd * selectedCoinInfo?.exchangeRate);

  return (
    <form className="trade-form" id="trade-form">
      <Rate dbCoins={dbCoins} />
      <p className="walletAddress-cont">
        {" "}
        Copy This Wallet Addres:{" "}
        {selectedCoinInfo?.walletAddress ? (
          <span className="wallet-cont">
            {" "}
            <span className="walletAddres">
              {selectedCoinInfo?.walletAddress}
            </span>{" "}
            <img
              src="/images/bold.svg"
              className="copy-icon"
              alt="copy icon"
              onClick={handleCopyClick}
            />
            {isCopied && <span className="copied-message">Copied!</span>}
          </span>
        ) : (
          "select a coin"
        )}
      </p>
      {formType === "transaction" && (
        <select onChange={handleCoinChange} value={selectedCoin}>
          <option value="">Select Coin</option>
          {coinNames.map((coinName) => (
            <option key={coinName} value={coinName}>
              {coinName}
            </option>
          ))}
        </select>
      )}
      {formType === "quickTrade" && (
        <div className="quick-coin-cont">
          <Button
            buttonstyle={{
              cursor: "pointer",
              padding: ".5rem 1rem",
              border: activeButton === "btc" ? "none" : "1px solid #E1E1E1",
              borderRadius: "50px",
              background: activeButton === "btc" ? "#77ED91" : "transparent",
              color: activeButton === "btc" ? "black" : "",
            }}
            onClick={(e) => handleQuickTradeButtonClick("btc", e)}
          >
            BTC
          </Button>
          <Button
            buttonstyle={{
              cursor: "pointer",
              padding: ".5rem 1rem",
              border: activeButton === "usdt" ? "none" : "1px solid #E1E1E1",
              borderRadius: "50px",
              background: activeButton === "usdt" ? "#77ED91" : "transparent",
              color: activeButton === "usdt" ? "black" : "",
            }}
            onClick={(e) => handleQuickTradeButtonClick("usdt", e)}
          >
            USDT
          </Button>
          <Button
            buttonstyle={{
              cursor: "pointer",
              padding: ".5rem 1rem",
              border: activeButton === "bnb" ? "none" : "1px solid #E1E1E1",
              borderRadius: "50px",
              background: activeButton === "bnb" ? "#77ED91" : "transparent",
              color: activeButton === "bnb" ? "black" : "",
            }}
            onClick={(e) => handleQuickTradeButtonClick("bnb", e)}
          >
            BNB
          </Button>
        </div>
      )}
      <label>Quantity:</label>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <label>Amount in USD:</label>

      <input
        type="number"
        placeholder="Amount in USD"
        value={valueUsd}
        onChange={handleUsdValueChange}
      />
      <hr />
      <div className="total">
        <span className="total-desc">You'll Get</span>
        <p>₦{valueInNaira} </p>
      </div>
      <Button
        buttonstyle={{
          padding: ".5rem 1rem",
          border: "none",
          color: "black",
          borderRadius: "50px",
          background: "#77ED91",
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        Sell Coin
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="modal-heading">Almost Done</h2>
        <p className="modal-desc">
          Copy Wallet Address Below, Transfer{" "}
          <span className="coin-quantity">{quantity}</span>{" "}
          <span className="transfe-coin">{selectedCoin}</span> and Upload
          screenshot{" "}
          {selectedCoinInfo?.walletAddress ? (
            <div className="wallet-cont">
              {" "}
              <span className="walletAddres">
                {selectedCoinInfo?.walletAddress}
              </span>{" "}
              <img
                src="/images/bold-black.svg"
                className="copy-icon"
                alt="copy icon"
                onClick={handleModalCopyClick}
              />
              {isModalCopied && <span className="copied-message">Copied!</span>}
            </div>
          ) : (
            "select a coin"
          )}
        </p>
        <input
          type="file"
          placeholder="Upload Screenshot"
          onChange={handleFileChange}
        />
        <Button
          buttonstyle={{
            padding: ".5rem 1rem",
            border: "none",
            color: "black",
            borderRadius: "50px",
            background: "#77ED91",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </form>
  );
}

export default SellCoinForm;
