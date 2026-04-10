import { FaTrash } from "react-icons/fa";

export default function MemberList({
  members,
  loading,
  onDeleteMember,
  emptyText = "No members found",
}) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading members...</p>;
  }

  if (!members?.length) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold text-gray-900">
              {member.name}
            </h3>

            {member.email ? (
              <p className="mt-1 break-words text-sm text-gray-500">
                {member.email}
              </p>
            ) : null}

            <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {member.role || "family"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onDeleteMember(member.id)}
            className="self-end rounded-xl bg-red-50 p-3 text-red-500 transition hover:text-red-600 sm:self-auto"
            aria-label={`Delete ${member.name}`}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
}

// export default function MemberList({
//   members,
//   loading,
//   onDeleteMember,
//   emptyText = "No members found",
// }) {
//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading members...</p>;
//   }

//   if (!members?.length) {
//     return <p className="text-sm text-gray-400">{emptyText}</p>;
//   }

//   return (
//     <div className="space-y-3">
//       {members.map((member) => (
//         <div
//           key={member.id}
//           className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-start justify-between gap-4"
//         >
//           <div className="min-w-0">
//             <h3 className="font-semibold text-gray-900 break-words">
//               {member.name}
//             </h3>

//             {member.email ? (
//               <p className="text-sm text-gray-500 mt-1 break-words">
//                 {member.email}
//               </p>
//             ) : null}

//             <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//               {member.role || "family"}
//             </span>
//           </div>

//           <button
//             onClick={() => onDeleteMember(member.id)}
//             className="shrink-0 px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function MemberList({
//   members,
//   loading,
//   onDeleteMember,
//   emptyText = "No members found",
// }) {
//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading members...</p>;
//   }

//   if (!members?.length) {
//     return <p className="text-sm text-gray-400">{emptyText}</p>;
//   }

//   return (
//     <div className="space-y-3">
//       {members.map((member) => (
//         <div
//           key={member.id}
//           className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-start justify-between gap-4"
//         >
//           <div>
//             <h3 className="font-semibold text-gray-900">{member.name}</h3>
//             {member.email ? (
//               <p className="text-sm text-gray-500 mt-1">{member.email}</p>
//             ) : null}
//             <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//               {member.role || "family"}
//             </span>
//           </div>

//           <button
//             onClick={() => onDeleteMember(member.id)}
//             className="px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }