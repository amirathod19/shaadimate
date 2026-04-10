import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  loading,
  updateTask,
  deleteTask,
  updateTaskStatus,
}) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading tasks...</p>;
  }

  if (!tasks?.length) {
    return <p className="text-sm text-gray-400">No tasks found</p>;
  }

  const groups = {
    pending: tasks.filter((task) => task.status === "pending"),
    inprogress: tasks.filter((task) => task.status === "inprogress"),
    complete: tasks.filter((task) => task.status === "complete"),
  };

  const sections = [
    { key: "pending", label: "Pending" },
    { key: "inprogress", label: "In Progress" },
    { key: "complete", label: "Complete" },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.key}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-gray-800">
              {section.label}
            </h3>
            <span className="shrink-0 text-sm text-gray-500">
              {groups[section.key].length}
            </span>
          </div>

          <div className="space-y-3">
            {groups[section.key].length === 0 ? (
              <p className="text-sm text-gray-400">
                No {section.label.toLowerCase()} tasks
              </p>
            ) : (
              groups[section.key].map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  updateTaskStatus={updateTaskStatus}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// import TaskItem from "./TaskItem";

// export default function TaskList({
//   tasks,
//   loading,
//   updateTask,
//   deleteTask,
//   updateTaskStatus,
// }) {
//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading tasks...</p>;
//   }

//   if (!tasks?.length) {
//     return <p className="text-sm text-gray-400">No tasks found</p>;
//   }

//   const groups = {
//     pending: tasks.filter((task) => task.status === "pending"),
//     inprogress: tasks.filter((task) => task.status === "inprogress"),
//     complete: tasks.filter((task) => task.status === "complete"),
//   };

//   const sections = [
//     { key: "pending", label: "Pending" },
//     { key: "inprogress", label: "In Progress" },
//     { key: "complete", label: "Complete" },
//   ];

//   return (
//     <div className="space-y-6">
//       {sections.map((section) => (
//         <div key={section.key}>
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-base font-semibold text-gray-800">
//               {section.label}
//             </h3>
//             <span className="text-sm text-gray-500">
//               {groups[section.key].length}
//             </span>
//           </div>

//           <div className="space-y-3">
//             {groups[section.key].length === 0 ? (
//               <p className="text-sm text-gray-400">
//                 No {section.label.toLowerCase()} tasks
//               </p>
//             ) : (
//               groups[section.key].map((task) => (
//                 <TaskItem
//                   key={task.id}
//                   task={task}
//                   updateTask={updateTask}
//                   deleteTask={deleteTask}
//                   updateTaskStatus={updateTaskStatus}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// import TaskItem from "./TaskItem";

// export default function TaskList({
//   tasks,
//   loading,
//   updateTask,
//   deleteTask,
//   updateTaskStatus,
// }) {
//   if (loading) {
//     return <p className="text-sm text-gray-500">Loading tasks...</p>;
//   }

//   if (!tasks?.length) {
//     return <p className="text-sm text-gray-400">No tasks found</p>;
//   }

//   const groups = {
//     pending: tasks.filter((task) => task.status === "pending"),
//     inprogress: tasks.filter((task) => task.status === "inprogress"),
//     completed: tasks.filter((task) => task.status === "completed"),
//   };

//   const sections = [
//     { key: "pending", label: "Pending" },
//     { key: "inprogress", label: "In Progress" },
//     { key: "completed", label: "Completed" },
//   ];

//   return (
//     <div className="space-y-6">
//       {sections.map((section) => (
//         <div key={section.key}>
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-base font-semibold text-gray-800">
//               {section.label}
//             </h3>
//             <span className="text-sm text-gray-500">
//               {groups[section.key].length}
//             </span>
//           </div>

//           <div className="space-y-3">
//             {groups[section.key].length === 0 ? (
//               <p className="text-sm text-gray-400">No {section.label.toLowerCase()} tasks</p>
//             ) : (
//               groups[section.key].map((task) => (
//                 <TaskItem
//                   key={task.id}
//                   task={task}
//                   updateTask={updateTask}
//                   deleteTask={deleteTask}
//                   updateTaskStatus={updateTaskStatus}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }