function DashboardContainer({ children, width }) {
  return (
    <div className="dashboard-card" style={{ width: width }}>
      {children}
    </div>
  );
}

export default DashboardContainer;
