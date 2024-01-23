import DashboardContainer from "./dashboardContainer";
import CardHeading from "./CardHeading";
import SellCoinForm from "./SellCoinForm";
function TradeContainer({
  dashboardWidth,
  cardTitle,
  headtype,
  formType,
  coins,
  coinNames,
  updateSelectedCoinWallet,
  dbCoins,
  user,
}) {
  return (
    <DashboardContainer width={dashboardWidth}>
      <CardHeading cardTitle={cardTitle} headtype={headtype} />
      <SellCoinForm
        formType={formType}
        coins={coins}
        coinNames={coinNames}
        updateSelectedCoinWallet={updateSelectedCoinWallet}
        dbCoins={dbCoins}
        user={user}
      />
    </DashboardContainer>
  );
}

export default TradeContainer;
