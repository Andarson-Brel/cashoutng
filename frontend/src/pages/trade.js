import React, { useState } from "react";
import SideNavbar from "../components/sideNavbar";
import DashboardHeader from "../components/DashboardHeader";
import BuyCoins from "../data";
import Modal from "../components/modal";
import TradeContainer from "../components/TradeContainer";
function Trade({ coins, coinNames, dbCoins, user, setUser }) {
  const [selectedCoinWallet, setSelectedCoinWallet] = useState("");
  console.log("------------------------------------------");
  console.log(user);
  console.log("------------------------------------------");
  const updateSelectedCoinWallet = (walletAddress) => {
    setSelectedCoinWallet(walletAddress);
  };
  return (
    <div className="dashboard-cont">
      <Modal />

      <SideNavbar setUser={setUser} />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"Trade"} />
        <div className="trade-head">
          <h3 className="head-intro">
            Trade with us today in just 3 basic Steps
          </h3>
          <div className="trade-step-container">
            <div className="step">
              <img
                className="step-img"
                src="/images/copy-icon.svg"
                alt="trade-icon"
              />
              <p className="step-desc">
                Tap to Copy Wallet Address
                <br />
                <span className="selected-wallet">
                  {selectedCoinWallet ? selectedCoinWallet : "Select A Coin"}
                </span>
              </p>
            </div>
            <div className="step">
              <img
                className="step-img"
                src="/images/transfer-icon.svg"
                alt="trade-icon"
              />
              <p className="step-desc">
                Transfer
                <br />
                <span className="selected-wallet">
                  Send the coin amount from your wallet to our Copied wallet
                  Addres.
                </span>
              </p>
            </div>

            <div className="step">
              <img
                className="step-img"
                src="/images/submit.svg"
                alt="trade-icon"
              />
              <p className="step-desc">
                Fill Out Form and Submit
                <br />
                <span className="selected-wallet">
                  Fill out the form and upload the screenshot of the
                  confirmation page provided by your bitcoin wallet
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-center">
          <TradeContainer
            dashboardWidth={"80%"}
            formType={"transaction"}
            cardTitle={`Trade`}
            headtype={"form"}
            coins={coins}
            dbCoins={dbCoins}
            coinNames={coinNames}
            updateSelectedCoinWallet={updateSelectedCoinWallet}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}

export default Trade;
