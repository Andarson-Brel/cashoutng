import React, { useEffect, useState } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
import SideNavbar from "../components/sideNavbar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContainer from "../components/dashboardContainer";
import CardHeading from "../components/CardHeading";
import CoinList from "../components/CoinList";
// import BuyCoins from "../data";
import { BuyCoins } from "../data";
import TransactionContainer from "../components/TransactionContainer";
import TradeContainer from "../components/TradeContainer";
import AddCoin from "../components/AddCoin";
export default function DashBoard({ coins, coinNames }) {
  const coinsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [coins, searchQuery]);

  const startIndex = (currentPage - 1) * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;

  const displayedCoins = searchQuery
    ? filteredCoins
    : coins.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="dashboard-cont">
      <SideNavbar />
      <div className="dashboard-main">
        <DashboardHeader pageTitle={"DashBoard"} />
        <div className="dashboard-column">
          <DashboardContainer width={"50%"}>
            <CardHeading cardTitle={`Todays Market Rate`} headtype={"card"} />
            <input
              type="search"
              placeholder="Search Coins"
              value={searchQuery}
              onChange={handleSearch}
              className="input-search"
            />
            {displayedCoins.map((coin, index) => {
              return (
                <CoinList
                  key={coin.id}
                  listType={"price"}
                  coinSn={startIndex + index + 1}
                  coinName={coin.name}
                  coinPrice={`$${coin.current_price}`}
                  coinThmb={coin.image}
                  coinSymbol={coin.symbol}
                />
              );
            })}
            <div className="pagination-buttons">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                &lt;
              </button>
              <button
                onClick={handleNextPage}
                disabled={endIndex >= coins.length}
              >
                &gt;
              </button>
            </div>
          </DashboardContainer>
          <DashboardContainer width={"50%"}>
            <CardHeading cardTitle={`We Are Buying`} headtype={"card"} />
            <AddCoin coinList={coinNames} coins={coins} />
            {BuyCoins.map((coin, i) => (
              <CoinList
                coinSn={i + 1}
                coinName={coin.name}
                walletAddress={coin.walletAddress}
                coinThmb={coin.image}
                coinSymbol={coin.symbol}
                key={i}
              />
            ))}
          </DashboardContainer>
        </div>
        <div className="dashboard-column">
          <TradeContainer
            dashboardWidth={"50%"}
            formType={"quickTrade"}
            cardTitle={`Quick Trade`}
            headtype={"form"}
            coins={coins}
            coinNames={coinNames}
          />
          <TransactionContainer dashboardWidth={"50%"} />
        </div>
      </div>
    </div>
  );
}
