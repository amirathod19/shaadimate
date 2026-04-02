export default function ExpenseList({
  expenses,
  loading,
  onDeleteExpense,
  emptyText = "No expenses found",
}) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading expenses...</p>;
  }

  if (!expenses?.length) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-start justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold text-gray-900">{expense.name}</h3>
            <p className="text-sm text-gray-500 mt-1">₹ {expense.amount}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {expense.paid_by_name ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  Paid by: {expense.paid_by_name}
                </span>
              ) : null}

              {expense.event_id ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  Event Linked
                </span>
              ) : null}
            </div>
          </div>

          <button
            onClick={() => onDeleteExpense(expense.id)}
            className="px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}