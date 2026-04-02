export default function BalanceSummary({ expenses }) {
  if (!expenses?.length) {
    return <p className="text-sm text-gray-400">No balances yet</p>;
  }

  const totals = expenses.reduce((acc, expense) => {
    const name = expense.paid_by_name || "Unknown";
    const amount = Number(expense.amount || 0);

    if (!acc[name]) {
      acc[name] = 0;
    }

    acc[name] += amount;
    return acc;
  }, {});

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-2">
      {entries.map(([name, amount]) => (
        <div
          key={name}
          className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
        >
          <span className="text-sm font-medium text-gray-700">{name}</span>
          <span className="text-sm font-semibold text-gray-900">₹ {amount}</span>
        </div>
      ))}
    </div>
  );
}