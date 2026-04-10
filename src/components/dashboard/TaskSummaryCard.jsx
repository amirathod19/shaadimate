import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskService";
import { supabase } from "../../services/supabaseClient";
import { useWedding } from "../../context/WeddingContext";

export default function TaskSummaryCard() {
  const { weddingId } = useWedding();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    complete: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!weddingId) {
      setStats({
        total: 0,
        pending: 0,
        inprogress: 0,
        complete: 0,
      });
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadTasks() {
      try {
        setLoading(true);

        const tasks = await getTasks(weddingId);
        if (!isMounted) return;

        const total = tasks?.length || 0;
        const pending =
          tasks?.filter((task) => task.status === "pending").length || 0;
        const inprogress =
          tasks?.filter((task) => task.status === "inprogress").length || 0;
        const complete =
          tasks?.filter((task) => task.status === "complete").length || 0;

        setStats({
          total,
          pending,
          inprogress,
          complete,
        });
      } catch (error) {
        console.error("Error loading task summary:", error);

        if (isMounted) {
          setStats({
            total: 0,
            pending: 0,
            inprogress: 0,
            complete: 0,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    const channel = supabase
      .channel(`task-summary-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `wedding_id=eq.${weddingId}`,
        },
        async () => {
          await loadTasks();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [weddingId]);

  const completePercent =
    stats.total > 0 ? (stats.complete / stats.total) * 100 : 0;

  const pendingPercent =
    stats.total > 0 ? (stats.pending / stats.total) * 100 : 0;

  const inprogressPercent =
    stats.total > 0 ? (stats.inprogress / stats.total) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks Progress</h2>
        {!loading && (
          <span className="text-sm font-medium text-gray-600">
            {stats.complete}/{stats.total} done
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading tasks...</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              Pending: {stats.pending}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              In Progress: {stats.inprogress}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Complete: {stats.complete}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-xs text-gray-500">
                  {stats.pending} ({pendingPercent.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${pendingPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-xs text-gray-500">
                  {stats.inprogress} ({inprogressPercent.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${inprogressPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Complete</span>
                <span className="text-xs text-gray-500">
                  {stats.complete} ({completePercent.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-green-400 rounded-full transition-all duration-300"
                  style={{ width: `${completePercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Total Tasks:{" "}
              <span className="font-medium text-gray-700">{stats.total}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { getTasks } from "../../services/taskService";
// import { supabase } from "../../services/supabaseClient";
// import { useWedding } from "../../context/WeddingContext";

// export default function TaskSummaryCard() {
//   const { weddingId } = useWedding();

//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     inprogress: 0,
//     completed: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!weddingId) {
//       setStats({
//         total: 0,
//         pending: 0,
//         inprogress: 0,
//         completed: 0,
//       });
//       setLoading(false);
//       return;
//     }

//     let isMounted = true;

//     async function loadTasks() {
//       try {
//         setLoading(true);

//         const tasks = await getTasks(weddingId);
//         if (!isMounted) return;

//         const total = tasks?.length || 0;
//         const pending =
//           tasks?.filter((task) => task.status === "pending").length || 0;
//         const inprogress =
//           tasks?.filter((task) => task.status === "inprogress").length || 0;
//         const completed =
//           tasks?.filter((task) => task.status === "completed").length || 0;

//         setStats({
//           total,
//           pending,
//           inprogress,
//           completed,
//         });
//       } catch (error) {
//         console.error("Error loading task summary:", error);

//         if (isMounted) {
//           setStats({
//             total: 0,
//             pending: 0,
//             inprogress: 0,
//             completed: 0,
//           });
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     }

//     loadTasks();

//     const channel = supabase
//       .channel(`task-summary-${weddingId}`)
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "tasks",
//         },
//         async () => {
//           await loadTasks();
//         }
//       )
//       .subscribe();

//     return () => {
//       isMounted = false;
//       supabase.removeChannel(channel);
//     };
//   }, [weddingId]);

//   const completedPercent =
//     stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

//   const pendingPercent =
//     stats.total > 0 ? (stats.pending / stats.total) * 100 : 0;

//   const inprogressPercent =
//     stats.total > 0 ? (stats.inprogress / stats.total) * 100 : 0;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">Tasks Progress</h2>
//         {!loading && (
//           <span className="text-sm font-medium text-gray-600">
//             {stats.completed}/{stats.total} done
//           </span>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-sm text-gray-500">Loading tasks...</p>
//       ) : (
//         <>
//           <div className="flex flex-wrap gap-2 mb-4">
//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
//               Pending: {stats.pending}
//             </span>

//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
//               In Progress: {stats.inprogress}
//             </span>

//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
//               Completed: {stats.completed}
//             </span>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm text-gray-600">Pending</span>
//                 <span className="text-xs text-gray-500">
//                   {stats.pending} ({pendingPercent.toFixed(0)}%)
//                 </span>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-3 bg-yellow-400 rounded-full transition-all duration-300"
//                   style={{ width: `${pendingPercent}%` }}
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm text-gray-600">In Progress</span>
//                 <span className="text-xs text-gray-500">
//                   {stats.inprogress} ({inprogressPercent.toFixed(0)}%)
//                 </span>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-3 bg-blue-400 rounded-full transition-all duration-300"
//                   style={{ width: `${inprogressPercent}%` }}
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm text-gray-600">Completed</span>
//                 <span className="text-xs text-gray-500">
//                   {stats.completed} ({completedPercent.toFixed(0)}%)
//                 </span>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-3 bg-green-400 rounded-full transition-all duration-300"
//                   style={{ width: `${completedPercent}%` }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 pt-3 border-t border-gray-100">
//             <p className="text-sm text-gray-500">
//               Total Tasks: <span className="font-medium text-gray-700">{stats.total}</span>
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }