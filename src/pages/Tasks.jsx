import { useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import AddTaskForm from "../components/tasks/AddTaskForm";
import TaskList from "../components/tasks/TaskList";
import { useWedding } from "../context/WeddingContext";
import useTasks from "../hooks/useTasks";

export default function Tasks() {
  const { weddingId } = useWedding();

  const {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  } = useTasks(weddingId);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    let result = tasks || [];
    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((task) => {
        const taskName = task.name?.toLowerCase() || "";
        const memberName = task.members?.name?.toLowerCase() || "";
        const eventName = task.events?.name?.toLowerCase() || "";
        const notes = task.notes?.toLowerCase() || "";

        return (
          taskName.includes(query) ||
          memberName.includes(query) ||
          eventName.includes(query) ||
          notes.includes(query)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    return result;
  }, [tasks, search, statusFilter]);

  const totalTasks = filteredTasks.length;
  const pendingCount = filteredTasks.filter(
    (task) => task.status === "pending"
  ).length;
  const inProgressCount = filteredTasks.filter(
    (task) => task.status === "inprogress"
  ).length;
  const completeCount = filteredTasks.filter(
    (task) => task.status === "complete"
  ).length;

  return (
    <PageWrapper title="Tasks">
      <div className="space-y-6">
        {!weddingId ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-4">
            Please join or create a wedding first.
          </div>
        ) : (
          <>
            <AddTaskForm onAddTask={addTask} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Search by task, member, event, or notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  Total: {totalTasks}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Pending: {pendingCount}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  In Progress: {inProgressCount}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Complete: {completeCount}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <TaskList
                tasks={filteredTasks}
                loading={loading}
                updateTask={updateTask}
                deleteTask={deleteTask}
                updateTaskStatus={updateTaskStatus}
              />
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

// import { useMemo, useState } from "react";
// import PageWrapper from "../components/layout/PageWrapper";
// import AddTaskForm from "../components/tasks/AddTaskForm";
// import TaskList from "../components/tasks/TaskList";
// import { useWedding } from "../context/WeddingContext";
// import useTasks from "../hooks/useTasks";

// export default function Tasks() {
//   const { weddingId } = useWedding();

//   const {
//     tasks,
//     loading,
//     addTask,
//     updateTask,
//     deleteTask,
//     updateTaskStatus,
//   } = useTasks(weddingId);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const filteredTasks = useMemo(() => {
//     let result = tasks || [];

//     const query = search.trim().toLowerCase();

//     if (query) {
//       result = result.filter((task) => {
//         const name = task.name?.toLowerCase() || "";
//         const assignedTo = task.assigned_to_name?.toLowerCase() || task.assigned_to?.toLowerCase() || "";
//         return name.includes(query) || assignedTo.includes(query);
//       });
//     }

//     if (statusFilter !== "all") {
//       result = result.filter((task) => task.status === statusFilter);
//     }

//     return result;
//   }, [tasks, search, statusFilter]);

//   const totalTasks = filteredTasks.length;
//   const pendingCount = filteredTasks.filter((task) => task.status === "pending").length;
//   const inProgressCount = filteredTasks.filter((task) => task.status === "inprogress").length;
//   const completedCount = filteredTasks.filter((task) => task.status === "completed").length;

//   return (
//     <PageWrapper title="Tasks">
//       <div className="space-y-6">
//         {!weddingId ? (
//           <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-4">
//             Please join or create a wedding first.
//           </div>
//         ) : (
//           <>
//             <AddTaskForm onAddTask={addTask} />

//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
//               <div className="grid gap-3 md:grid-cols-2">
//                 <input
//                   type="text"
//                   placeholder="Search by task name or member..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//                 />

//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="inprogress">In Progress</option>
//                   <option value="completed">Completed</option>
//                 </select>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                   Total: {totalTasks}
//                 </span>
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
//                   Pending: {pendingCount}
//                 </span>
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
//                   In Progress: {inProgressCount}
//                 </span>
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
//                   Completed: {completedCount}
//                 </span>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
//               <TaskList
//                 tasks={filteredTasks}
//                 loading={loading}
//                 updateTask={updateTask}
//                 deleteTask={deleteTask}
//                 updateTaskStatus={updateTaskStatus}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </PageWrapper>
//   );
// }