import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./button";

function CoinList({
  coinThmb,
  coinName,
  coinSymbol,
  coinPrice,
  coinSn,
  listType,
  walletAddress,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(walletAddress);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleUpdateClick = () => {
    //  update logic here, for example, call an update function
    // with the editedAddress value.

    toast.success("Coin Updated");

    // After updating, switch back to view mode
    setIsEditing(false);
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
          <input
            type="text"
            value={editedAddress}
            onChange={handleInputChange}
          />
        ) : (
          <p className="coin-wallet">{walletAddress}</p>
        )}
        {listType !== "price" &&
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
