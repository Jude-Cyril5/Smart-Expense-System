export default function FundingChoicePage({ onSelect }) {
  return (
    <div className="choice-page">
      <h2 className="choice-title">Choose Expense Type</h2>

      <div className="choice-cards">
        <div
          className="choice-card own-money"
          onClick={() => onSelect("EMPLOYEE")}
        >
          <h3>Own Money</h3>
          <p>I have already paid and need reimbursement</p>
        </div>

        <div
          className="choice-card need-fund"
          onClick={() => onSelect("FUND_FORM")}
        >
          <h3>Need Funds</h3>
          <p>I need advance funds for this expense</p>
        </div>
      </div>
    </div>
  );
}
