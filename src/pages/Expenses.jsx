import { useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import AddExpenseForm from "../components/expenses/AddExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import BalanceSummary from "../components/expenses/BalanceSummary";
import { useWedding } from "../context/WeddingContext";
import useExpenses from "../hooks/useExpenses";

export default function Expenses() {
  const { weddingId } = useWedding();

  const {
    expenses,
    loading,
    addExpense,
    deleteExpense,
  } = useExpenses(weddingId);

  const [search, setSearch] = useState("");

  const filteredExpenses = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return expenses || [];

    return (expenses || []).filter((expense) => {
      const name = expense.name?.toLowerCase() || "";
      const paidBy = expense.paid_by_name?.toLowerCase() || expense.paid_by?.toLowerCase() || "";
      return name.includes(query) || paidBy.includes(query);
    });
  }, [expenses, search]);

  const totalAmount = useMemo(() => {
    return (filteredExpenses || []).reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );
  }, [filteredExpenses]);

  return (
    <PageWrapper title="Expenses">
      <div className="space-y-6">
        {!weddingId ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-4">
            Please join or create a wedding first.
          </div>
        ) : (
          <>
            {/* Add Expense */}
            <AddExpenseForm onAddExpense={addExpense} />

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <input
                type="text"
                placeholder="Search by expense name or member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
              />
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  Expense Summary
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredExpenses.length} items
                </span>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                ₹ {totalAmount}
              </p>

              <div className="mt-4">
                <BalanceSummary expenses={filteredExpenses} />
              </div>
            </div>

            {/* Expense List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <ExpenseList
                expenses={filteredExpenses}
                loading={loading}
                onDeleteExpense={deleteExpense}
                emptyText="No expenses found"
              />
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}