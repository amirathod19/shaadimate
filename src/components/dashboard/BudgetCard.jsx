import { useEffect, useState } from "react";
import { getTotalExpense } from "../../services/expenseService";
import { useWedding } from "../../context/WeddingContext";
import { getWedding } from "../../services/weddingService";

export default function BudgetCard() {
  const { weddingId } = useWedding();

  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBudgetData() {
      try {
        setLoading(true);

        if (!weddingId) {
          setBudget(0);
          setSpent(0);
          return;
        }

        const wedding = await getWedding(weddingId);
        const totalExpense = await getTotalExpense(weddingId);

        setBudget(Number(wedding?.budget) || 0);
        setSpent(Number(totalExpense) || 0);
      } catch (error) {
        console.error("Error loading budget data:", error);
        setBudget(0);
        setSpent(0);
      } finally {
        setLoading(false);
      }
    }

    loadBudgetData();
  }, [weddingId]);

  const percent = budget > 0 ? (spent / budget) * 100 : 0;
  const progressWidth = Math.min(percent, 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Budget</h2>
        {percent > 100 && (
          <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
            Over Budget
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading budget...</p>
      ) : (
        <>
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500">Spent</p>
              <p className="text-xl font-bold text-gray-900">₹ {spent}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-lg font-semibold text-gray-700">₹ {budget}</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                percent > 100 ? "bg-red-400" : "bg-[#e7bfa7]"
              }`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>{percent.toFixed(0)}% used</span>
            <span>Remaining: ₹ {Math.max(budget - spent, 0)}</span>
          </div>
        </>
      )}
    </div>
  );
}