import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "./button";

function CoinList({
  coinThmb,
  coinName,
  coinSymbol,
  coinPrice,
  coinSn,
  listType,
  walletAddress,
  coinId,
  exchangeRate,
  isAdmin,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(walletAddress);
  const [editedExchangeRate, setEditedExchangeRate] = useState(exchangeRate);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    try {
      const apiUrl = `http://localhost:5000/api/coin/${coinId}`;

      // Make a PUT request using Axios
      const response = await axios.put(apiUrl, {
        walletAddress: editedAddress,
        exchangeRate: editedExchangeRate,
        // Include other fields that need to be updated
      });

      if (response.status === 200) {
        toast.success("Coin Updated");
        // After updating, switch back to view mode
        setIsEditing(false);
        // Refresh the page after a successful update
        window.location.reload();
      } else {
        toast.error("Failed to update coin");
      }
    } catch (error) {
      console.error("Error updating coin:", error);
      toast.error("An error occurred while updating the coin");
    }
  };

  const handleInputChange = (e) => {
    setEditedAddress(e.target.value);
  };

  return (
    <li className="coin-list">
      <span className="coin-data">
        <span className="sn">{coinSn}</span>
        <img src={coinThmb} alt="coin thumbnail" className="coin-list-thmb" />
        <p className="coin-name">
          {coinName}
          <span className="coin-symbol">{coinSymbol}</span>
        </p>
      </span>
      <div className="display-flex-top">
        {listType === "price" ? (
          <p className="coin-price">{coinPrice}</p>
        ) : isEditing ? (
          <>
            <input
              className="update-input"
              type="text"
              value={editedAddress}
              onChange={handleInputChange}
            />
            <input
              className="update-input"
              type="text"
              value={editedExchangeRate}
              onChange={(e) => setEditedExchangeRate(e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="coin-wallet">{walletAddress}</p>
            <span> ₦{exchangeRate}/$</span>
          </>
        )}
        {isAdmin &&
          listType !== "price" &&
          (isEditing ? (
            <Button
              buttonstyle={{
                padding: ".5rem 1rem",
                border: "none",
                color: "black",
                borderRadius: "50px",
                background: "#77ED91",
                cursor: "pointer",
              }}
              onClick={handleUpdateClick}
            >
              Update
            </Button>
          ) : (
            <Button
              buttonstyle={{
                padding: ".5rem 1rem",
                border: "none",
                color: "black",
                borderRadius: "50px",
                background: "#FFA50D",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          ))}
      </div>
    </li>
  );
}

export default CoinList;
