import { FaTrash } from "react-icons/fa";
import formatDate from "../../utils/formatDate";

export default function EventList({
  events,
  loading,
  onDeleteEvent,
  emptyText = "No events found",
}) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading events...</p>;
  }

  if (!events?.length) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold text-gray-900">
              {event.name}
            </h3>

            {event.event_date ? (
              <p className="mt-1 text-sm text-gray-500">
                {formatDate(event.event_date)}
              </p>
            ) : null}

            {event.location ? (
              <p className="break-words text-sm text-gray-500">
                {event.location}
              </p>
            ) : null}

            {event.budget ? (
              <p className="break-words text-sm text-gray-500">
                Budget: ₹{Number(event.budget).toLocaleString("en-IN")}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onDeleteEvent(event.id)}
            className="self-end rounded-xl bg-red-50 p-3 text-red-500 transition hover:text-red-600 sm:self-auto"
            aria-label={`Delete ${event.name}`}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}


// import formatDate from "../../utils/formatDate";

// export default function EventList({
//   events,
//   loading,
//   onDeleteEvent,
//   emptyText = "No events found",
// }) {
//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading events...</p>;
//   }

//   if (!events?.length) {
//     return <p className="text-sm text-gray-400">{emptyText}</p>;
//   }

//   return (
//     <div className="space-y-3">
//       {events.map((event) => (
//         <div
//           key={event.id}
//           className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
//         >
//           <div className="min-w-0 flex-1">
//             <h3 className="break-words font-semibold text-gray-900">
//               {event.name}
//             </h3>

//             {event.event_date ? (
//               <p className="mt-1 text-sm text-gray-500">
//                 {formatDate(event.event_date)}
//               </p>
//             ) : null}

//             {event.location ? (
//               <p className="break-words text-sm text-gray-500">
//                 {event.location}
//               </p>
//             ) : null}

//             {event.budget ? (
//               <p className="break-words text-sm text-gray-500">
//                 Budget: ₹{Number(event.budget).toLocaleString("en-IN")}
//               </p>
//             ) : null}
//           </div>

//           <button
//             onClick={() => onDeleteEvent(event.id)}
//             className="w-full shrink-0 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600 sm:w-auto"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


// import formatDate from "../../utils/formatDate";

// export default function EventList({
//   events,
//   loading,
//   onDeleteEvent,
//   emptyText = "No events found",
// }) {
//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading events...</p>;
//   }

//   if (!events?.length) {
//     return <p className="text-sm text-gray-400">{emptyText}</p>;
//   }

//   return (
//     <div className="space-y-3">
//       {events.map((event) => (
//         <div
//           key={event.id}
//           className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-start justify-between gap-4"
//         >
//           <div className="min-w-0">
//             <h3 className="font-semibold text-gray-900 break-words">
//               {event.name}
//             </h3>

//             {event.event_date ? (
//               <p className="text-sm text-gray-500 mt-1">
//                 {formatDate(event.event_date)}
//               </p>
//             ) : null}

//             {event.location ? (
//               <p className="text-sm text-gray-500 break-words">
//                 {event.location}
//               </p>
//             ) : null}

//             {event.budget ? (
//               <p className="text-sm text-gray-500">Budget: ₹{event.budget}</p>
//             ) : null}
//           </div>

//           <button
//             onClick={() => onDeleteEvent(event.id)}
//             className="shrink-0 px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }