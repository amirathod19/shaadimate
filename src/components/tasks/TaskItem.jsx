import { useMemo, useState } from "react";

export default function TaskItem({
  task,
  updateTask,
  deleteTask,
  updateTaskStatus,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name || "");

  const today = new Date().toISOString().split("T")[0];
  const isOverdue =
    task.deadline &&
    task.deadline < today &&
    task.status !== "complete";

  const assignedMemberName = useMemo(() => {
    if (task.members?.name) return task.members.name;
    return "";
  }, [task.members]);

  const eventName = useMemo(() => {
    if (task.events?.name) return task.events.name;
    return "";
  }, [task.events]);

  async function handleSave() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      await updateTask(task.id, { name: trimmedName });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleStatusChange(e) {
    try {
      await updateTaskStatus(task.id, e.target.value);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-700",
    inprogress: "bg-blue-100 text-blue-700",
    complete: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm ${
        isOverdue ? "border-red-200" : "border-gray-100"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[#e7bfa7]"
              />
              <button
                onClick={handleSave}
                className="rounded-xl bg-[#e7bfa7] px-4 py-2 text-sm font-medium"
              >
                Save
              </button>
            </div>
          ) : (
            <h3 className="break-words font-semibold text-gray-900">
              {task.name}
            </h3>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {eventName ? (
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                {eventName}
              </span>
            ) : null}

            {assignedMemberName ? (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {assignedMemberName}
              </span>
            ) : null}

            {task.deadline ? (
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isOverdue
                    ? "bg-red-100 text-red-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                Due: {task.deadline}
              </span>
            ) : null}

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusClasses[task.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>
          </div>

          {task.notes ? (
            <p className="mt-3 break-words text-sm text-gray-600">
              {task.notes}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm sm:w-auto"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="complete">Complete</option>
          </select>

          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 sm:w-auto"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <button
            onClick={handleDelete}
            className="w-full rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600 sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// import { useMemo, useState } from "react";

// export default function TaskItem({
//   task,
//   updateTask,
//   deleteTask,
//   updateTaskStatus,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(task.name || "");

//   const today = new Date().toISOString().split("T")[0];
//   const isOverdue =
//     task.deadline &&
//     task.deadline < today &&
//     task.status !== "complete";

//   const assignedMemberName = useMemo(() => {
//     if (task.members?.name) return task.members.name;
//     return "";
//   }, [task.members]);

//   const eventName = useMemo(() => {
//     if (task.events?.name) return task.events.name;
//     return "";
//   }, [task.events]);

//   async function handleSave() {
//     const trimmedName = name.trim();
//     if (!trimmedName) return;

//     try {
//       await updateTask(task.id, { name: trimmedName });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   }

//   async function handleStatusChange(e) {
//     try {
//       await updateTaskStatus(task.id, e.target.value);
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   }

//   async function handleDelete() {
//     try {
//       await deleteTask(task.id);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   }

//   const statusClasses = {
//     pending: "bg-yellow-100 text-yellow-700",
//     inprogress: "bg-blue-100 text-blue-700",
//     complete: "bg-green-100 text-green-700",
//   };

//   return (
//     <div
//       className={`border rounded-2xl p-4 bg-white shadow-sm ${
//         isOverdue ? "border-red-200" : "border-gray-100"
//       }`}
//     >
//       <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//         <div className="flex-1 min-w-0">
//           {isEditing ? (
//             <div className="flex gap-2">
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="flex-1 rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[#e7bfa7]"
//               />
//               <button
//                 onClick={handleSave}
//                 className="px-3 py-2 rounded-xl bg-[#e7bfa7] text-sm font-medium"
//               >
//                 Save
//               </button>
//             </div>
//           ) : (
//             <h3 className="font-semibold text-gray-900 break-words">
//               {task.name}
//             </h3>
//           )}

//           <div className="flex flex-wrap gap-2 mt-2">
//             {eventName ? (
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
//                 {eventName}
//               </span>
//             ) : null}

//             {assignedMemberName ? (
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                 {assignedMemberName}
//               </span>
//             ) : null}

//             {task.deadline ? (
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   isOverdue
//                     ? "bg-red-100 text-red-700"
//                     : "bg-red-50 text-red-600"
//                 }`}
//               >
//                 Due: {task.deadline}
//               </span>
//             ) : null}

//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 statusClasses[task.status] || "bg-gray-100 text-gray-700"
//               }`}
//             >
//               {task.status}
//             </span>
//           </div>

//           {task.notes ? (
//             <p className="mt-3 text-sm text-gray-600 break-words">
//               {task.notes}
//             </p>
//           ) : null}
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <select
//             value={task.status}
//             onChange={handleStatusChange}
//             className="rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
//           >
//             <option value="pending">Pending</option>
//             <option value="inprogress">In Progress</option>
//             <option value="complete">Complete</option>
//           </select>

//           <button
//             onClick={() => setIsEditing((prev) => !prev)}
//             className="px-3 py-2 rounded-xl bg-gray-100 text-sm font-medium text-gray-700"
//           >
//             {isEditing ? "Cancel" : "Edit"}
//           </button>

//           <button
//             onClick={handleDelete}
//             className="px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";

// export default function TaskItem({
//   task,
//   updateTask,
//   deleteTask,
//   updateTaskStatus,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(task.name || "");

//   async function handleSave() {
//     try {
//       await updateTask(task.id, { name: name.trim() });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   }

//   async function handleStatusChange(e) {
//     try {
//       await updateTaskStatus(task.id, e.target.value);
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   }

//   async function handleDelete() {
//     try {
//       await deleteTask(task.id);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   }

//   const statusClasses = {
//     pending: "bg-yellow-100 text-yellow-700",
//     inprogress: "bg-blue-100 text-blue-700",
//     completed: "bg-green-100 text-green-700",
//   };

//   return (
//     <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm">
//       <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//         <div className="flex-1">
//           {isEditing ? (
//             <div className="flex gap-2">
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="flex-1 rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[#e7bfa7]"
//               />
//               <button
//                 onClick={handleSave}
//                 className="px-3 py-2 rounded-xl bg-[#e7bfa7] text-sm font-medium"
//               >
//                 Save
//               </button>
//             </div>
//           ) : (
//             <h3 className="font-semibold text-gray-900">{task.name}</h3>
//           )}

//           <div className="flex flex-wrap gap-2 mt-2">
//             {task.assigned_to_name ? (
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                 {task.assigned_to_name}
//               </span>
//             ) : null}

//             {task.deadline ? (
//               <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
//                 Due: {task.deadline}
//               </span>
//             ) : null}

//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 statusClasses[task.status] || "bg-gray-100 text-gray-700"
//               }`}
//             >
//               {task.status}
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <select
//             value={task.status}
//             onChange={handleStatusChange}
//             className="rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
//           >
//             <option value="pending">Pending</option>
//             <option value="inprogress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>

//           <button
//             onClick={() => setIsEditing((prev) => !prev)}
//             className="px-3 py-2 rounded-xl bg-gray-100 text-sm font-medium text-gray-700"
//           >
//             {isEditing ? "Cancel" : "Edit"}
//           </button>

//           <button
//             onClick={handleDelete}
//             className="px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }