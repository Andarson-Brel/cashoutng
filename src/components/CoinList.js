function CoinList({
  coinThmb,
  coinName,
  coinSymbol,
  coinPrice,
  coinSn,
  listType,
  walletAddress,
}) {
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

      {listType === "price" ? (
        <p className="coin-price">{coinPrice}</p>
      ) : (
        <p className="coin-wallet">{walletAddress}</p>
      )}
    </li>
  );
}

export default CoinList;
