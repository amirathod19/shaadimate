import { useCallback, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import {
  getTasks,
  createTask,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  updateTaskStatus as updateTaskStatusService,
} from "../services/taskService";

export default function useTasks(weddingId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      if (!weddingId) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = await getTasks(weddingId);
      setTasks(data || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [weddingId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (!weddingId) return;

    const channel = supabase
      .channel(`tasks-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `wedding_id=eq.${weddingId}`,
        },
        () => {
          loadTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weddingId, loadTasks]);

  async function addTask(taskData) {
    const newTask = await createTask({
      ...taskData,
      wedding_id: weddingId,
    });

    await loadTasks();
    return newTask;
  }

  async function updateTask(taskId, updates) {
    const updatedTask = await updateTaskService(taskId, updates);
    await loadTasks();
    return updatedTask;
  }

  async function deleteTask(taskId) {
    await deleteTaskService(taskId);
    await loadTasks();
  }

  async function updateTaskStatus(taskId, status) {
    const updatedTask = await updateTaskStatusService(taskId, status);
    await loadTasks();
    return updatedTask;
  }

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    reloadTasks: loadTasks,
  };
}

// import { useCallback, useEffect, useState } from "react";
// import { supabase } from "../services/supabaseClient";
// import {
//   getTasks,
//   createTask,
//   updateTask as updateTaskService,
//   deleteTask as deleteTaskService,
//   updateTaskStatus as updateTaskStatusService,
// } from "../services/taskService";

// export default function useTasks(weddingId) {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadTasks = useCallback(async () => {
//     try {
//       if (!weddingId) {
//         setTasks([]);
//         return;
//       }

//       setLoading(true);
//       const data = await getTasks(weddingId);
//       setTasks(data || []);
//     } catch (error) {
//       console.error("Error loading tasks:", error);
//       setTasks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [weddingId]);

//   useEffect(() => {
//     loadTasks();
//   }, [loadTasks]);

//   useEffect(() => {
//     if (!weddingId) return;

//     const channel = supabase
//       .channel(`tasks-${weddingId}`)
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "tasks",
//         },
//         () => {
//           loadTasks();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [weddingId, loadTasks]);

//   async function addTask(taskData) {
//     const newTask = await createTask({
//       ...taskData,
//       wedding_id: weddingId,
//     });

//     await loadTasks();
//     return newTask;
//   }

//   async function updateTask(taskId, updates) {
//     const updatedTask = await updateTaskService(taskId, updates);
//     await loadTasks();
//     return updatedTask;
//   }

//   async function deleteTask(taskId) {
//     await deleteTaskService(taskId);
//     await loadTasks();
//   }

//   async function updateTaskStatus(taskId, status) {
//     const updatedTask = await updateTaskStatusService(taskId, status);
//     await loadTasks();
//     return updatedTask;
//   }

//   return {
//     tasks,
//     loading,
//     addTask,
//     updateTask,
//     deleteTask,
//     updateTaskStatus,
//     reloadTasks: loadTasks,
//   };
// }