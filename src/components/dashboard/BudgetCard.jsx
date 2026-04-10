import { useMemo } from "react";

export default function BudgetCard({ events = [], expenses = [] }) {
  const eventBudgetData = useMemo(() => {
    try {
      return (events || []).map((event) => {
        const eventExpenses = (expenses || []).filter(
          (expense) => String(expense?.event_id) === String(event?.id)
        );

        const spent = eventExpenses.reduce(
          (sum, expense) => sum + Number(expense?.amount || 0),
          0
        );

        const budget = Number(event?.budget || 0);
        const remaining = Math.max(budget - spent, 0);
        const percent =
          budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;

        return {
          id: event?.id || Math.random(),
          name: event?.name || "Event",
          budget,
          spent,
          remaining,
          percent,
        };
      });
    } catch (error) {
      console.error("BudgetCard error:", error);
      return [];
    }
  }, [events, expenses]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="text-center text-lg font-semibold text-gray-800">
        Budget Overview
      </h2>

      {!eventBudgetData.length ? (
        <p className="mt-3 text-sm text-gray-400">
          No events available for budget tracking.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {eventBudgetData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#fcf7f3] p-4 text-center"
            >
              <h3 className="mb-3 break-words text-sm font-semibold text-gray-700">
                {item.name}
              </h3>

              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white sm:h-24 sm:w-24">
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-full sm:h-20 sm:w-20"
                  style={{
                    background: `conic-gradient(#c89b6d ${item.percent * 3.6}deg, #f2e6d8 0deg)`,
                  }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-800 sm:h-14 sm:w-14 sm:text-sm">
                    {item.percent}%
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Budget:</span> ₹
                  {item.budget.toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="font-semibold">Spent:</span> ₹
                  {item.spent.toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="font-semibold">Remaining:</span> ₹
                  {item.remaining.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { getTotalExpense } from "../../services/expenseService";
// import { useWedding } from "../../context/WeddingContext";
// import { getWedding } from "../../services/weddingService";

// export default function BudgetCard() {
//   const { weddingId } = useWedding();

//   const [budget, setBudget] = useState(0);
//   const [spent, setSpent] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadBudgetData() {
//       try {
//         setLoading(true);

//         if (!weddingId) {
//           setBudget(0);
//           setSpent(0);
//           return;
//         }

//         const wedding = await getWedding(weddingId);
//         const totalExpense = await getTotalExpense(weddingId);

//         setBudget(Number(wedding?.budget) || 0);
//         setSpent(Number(totalExpense) || 0);
//       } catch (error) {
//         console.error("Error loading budget data:", error);
//         setBudget(0);
//         setSpent(0);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadBudgetData();
//   }, [weddingId]);

//   const percent = budget > 0 ? (spent / budget) * 100 : 0;
//   const progressWidth = Math.min(percent, 100);

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold text-gray-800">Budget</h2>
//         {percent > 100 && (
//           <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
//             Over Budget
//           </span>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-sm text-gray-500">Loading budget...</p>
//       ) : (
//         <>
//           <div className="flex items-end justify-between mb-2">
//             <div>
//               <p className="text-sm text-gray-500">Spent</p>
//               <p className="text-xl font-bold text-gray-900">₹ {spent}</p>
//             </div>

//             <div className="text-right">
//               <p className="text-sm text-gray-500">Total Budget</p>
//               <p className="text-lg font-semibold text-gray-700">₹ {budget}</p>
//             </div>
//           </div>

//           <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
//             <div
//               className={`h-3 rounded-full transition-all duration-300 ${
//                 percent > 100 ? "bg-red-400" : "bg-[#e7bfa7]"
//               }`}
//               style={{ width: `${progressWidth}%` }}
//             />
//           </div>

//           <div className="mt-2 flex justify-between text-sm text-gray-500">
//             <span>{percent.toFixed(0)}% used</span>
//             <span>Remaining: ₹ {Math.max(budget - spent, 0)}</span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }