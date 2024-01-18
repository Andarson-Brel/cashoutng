function CardHeading({ cardTitle, headtype }) {
  return (
    <div className="card-head-cont">
      <h5 className="card-title">{cardTitle}</h5>
      {headtype === "card" && <p className="see-all-bbtn">See All</p>}
      {headtype === "form" && <p className="sell-coin-btn">Sell Coin</p>}
    </div>
  );
}

export default CardHeading;
