import { FaTrash } from "react-icons/fa";

export default function ExpenseList({
  expenses = [],
  events = [],
  onDeleteExpense,
}) {
  function getEventFromExpense(expense) {
    return events.find(
      (event) => String(event.id) === String(expense.event_id)
    );
  }

  function groupByEvent() {
    const map = {};

    expenses.forEach((exp) => {
      const event = getEventFromExpense(exp);
      const eventName = event?.name || "Other";

      if (!map[eventName]) {
        map[eventName] = {
          event,
          items: [],
        };
      }

      map[eventName].items.push(exp);
    });

    return map;
  }

  const grouped = groupByEvent();

  if (!expenses.length) {
    return (
      <div className="py-6 text-center text-sm text-gray-400">
        No expenses found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([eventName, group]) => {
        const total = group.items.reduce(
          (sum, item) => sum + Number(item.amount || 0),
          0
        );

        return (
          <div
            key={eventName}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="break-words rounded-full bg-[#f3e5dc] px-3 py-1 text-xs font-semibold text-[#b08968]">
                {eventName.toUpperCase()}
              </span>

              <span className="text-sm font-semibold text-gray-600">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="space-y-3">
              {group.items.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-start justify-between gap-3 border-b pb-3 last:border-none"
                >
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-medium text-gray-800">
                      {exp.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ₹ {Number(exp.amount || 0).toLocaleString("en-IN")}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                        Paid by: {exp.paid_by_name || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteExpense(exp.id)}
                    className="shrink-0 rounded-xl bg-red-50 px-3 py-2 text-red-500 transition hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 text-right text-sm font-semibold text-gray-600">
              Event Total: ₹{total.toLocaleString("en-IN")}
            </div>
          </div>
        );
      })}
    </div>
  );
}


// import { FaTrash } from "react-icons/fa";

// export default function ExpenseList({
//   expenses = [],
//   events = [],
//   onDeleteExpense,
// }) {
//   function getEventFromExpense(expense) {
//     return events.find(
//       (event) => String(event.id) === String(expense.event_id)
//     );
//   }

//   function groupByEvent() {
//     const map = {};

//     expenses.forEach((exp) => {
//       const event = getEventFromExpense(exp);
//       const eventName = event?.name || "Other";

//       if (!map[eventName]) {
//         map[eventName] = {
//           event,
//           items: [],
//         };
//       }

//       map[eventName].items.push(exp);
//     });

//     return map;
//   }

//   const grouped = groupByEvent();

//   if (!expenses.length) {
//     return (
//       <div className="py-6 text-center text-sm text-gray-400">
//         No expenses found
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {Object.entries(grouped).map(([eventName, group]) => {
//         const total = group.items.reduce(
//           (sum, item) => sum + Number(item.amount || 0),
//           0
//         );

//         return (
//           <div
//             key={eventName}
//             className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
//           >
//             {/* event header */}
//             <div className="mb-3 flex items-center justify-between">
//               <span className="rounded-full bg-[#f3e5dc] px-3 py-1 text-xs font-semibold text-[#b08968]">
//                 {eventName.toUpperCase()}
//               </span>

//               <span className="text-sm font-semibold text-gray-600">
//                 ₹{total}
//               </span>
//             </div>

//             {/* expense items */}
//             <div className="space-y-3">
//               {group.items.map((exp) => (
//                 <div
//                   key={exp.id}
//                   className="flex items-center justify-between border-b pb-2 last:border-none"
//                 >
//                   <div>
//                     <p className="font-medium text-gray-800">{exp.name}</p>

//                     <p className="text-sm text-gray-500">₹ {exp.amount}</p>

//                     <div className="mt-1 flex gap-2">
//                       <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
//                         Paid by: {exp.paid_by_name}
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => onDeleteExpense(exp.id)}
//                     className="text-red-400 transition hover:text-red-600"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* event total */}
//             <div className="mt-3 text-right text-sm font-semibold text-gray-600">
//               Event Total: ₹{total}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }