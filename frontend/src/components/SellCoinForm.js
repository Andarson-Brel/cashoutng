import { useState } from "react";
import Button from "./button";
import Modal from "./modal";
import { BuyCoins, TransactionHistory } from "../data";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";

function SellCoinForm({
  formType,
  onBtnClick,
  coins,
  coinNames,
  updateSelectedCoinWallet,
}) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [valueUsd, setValueUsd] = useState(0);
  const [activeButton, setActiveButton] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isModalCopied, setIsModalCopied] = useState(false);
  const [file, setFile] = useState(null);
  const todayRate = 1210;
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
    const selectedCoinWallet = BuyCoins.find(
      (coin) => coin.symbol === buttonText
    );

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
    const selectedCoinWallet = BuyCoins.find(
      (coin) => coin.name === selectedCoinName
    );
    if (selectedCoinWallet) {
      updateSelectedCoinWallet(selectedCoinWallet.walletAddress);
    }

    setValueUsd(0);
    setQuantity(0);
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
      coinName: selectedCoin,
      quantity: quantity,
      valueUsd: valueUsd,
      valueInNaira: valueInNaira,
      imgUrl: file,
      userName: "Andara Daniel",
      userId: transactionId,
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
        console.log(data);
        toast.success("Order Successful!");
        closeModal();
      })
      .catch((error) => {
        // Handle errors during the fetch
        console.error("Error submitting transaction:", error);
        toast.error("Error submitting transaction. Please try again.");
      });
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const transactionId = generateUniqueTransactionId();

  //   const existingTransactionIndex = TransactionHistory.findIndex(
  //     (transaction) => transaction.transactionId === transactionId
  //   );

  //   const transaction = {
  //     coinIcon: selectedCoinInfo.image,
  //     transactionId: transactionId,
  //     coin: selectedCoin,
  //     coinQuantity: quantity,
  //     valueUsd: valueUsd,
  //     valueInNaira: valueInNaira,
  //     screenShot: file,
  //     user: "Andara Daniel",
  //     userId: "",
  //     dateTimeCreated: new Date(),
  //     bankName: "Opay",
  //     accountName: "Test Account",
  //     accountNumber: "12345678",
  //     transactionStatus: "Awaiting Confirmation",
  //   };

  //   // if (existingTransactionIndex !== -1) {
  //   //   TransactionHistory[existingTransactionIndex] = transaction;
  //   // } else {
  //   //   // If the transaction ID does not exist, add the new transaction
  //   //   TransactionHistory.push(transaction);
  //   // }

  //   // // Store the updated TransactionHistory in local storage
  //   // localStorage.setItem(
  //   //   "TransactionHistory",
  //   //   JSON.stringify(TransactionHistory)
  //   // );

  //   try {
  //     // Make an HTTP POST request to your API endpoint
  //     const response = await axios.post(
  //       "http://localhost:5000/api/transactions",
  //       transaction
  //     );

  //     // Handle the response as needed
  //     console.log(response.data); // Log the response data
  //     toast.success("Order Successful!");
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error submitting transaction:", error);
  //     toast.error("Error submitting transaction. Please try again.");
  //   }
  // };

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
  const selectedCoinInfo = BuyCoins.find((coin) => coin.name === selectedCoin);
  const valueInNaira = Math.round(valueUsd * todayRate);
  // console.log(selectedCoinInfo?.image);
  return (
    <form className="trade-form" id="trade-form">
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

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
      />

      <input
        // type="number"
        placeholder="Amount in USD"
        value={`$${valueUsd.toFixed(2)}`}
        readOnly
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
