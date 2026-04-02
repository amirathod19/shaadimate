import { supabase } from "./supabaseClient";

export async function getTasks(weddingId) {
  if (!weddingId) return [];

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  return data || [];
}

export async function createTask(taskData) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([taskData])
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    throw error;
  }

  return data;
}

export async function updateTask(taskId, updates) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    console.error("Error updating task:", error);
    throw error;
  }

  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error);
    throw error;
  }

  return true;
}

export async function updateTaskStatus(taskId, status) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .select()
    .single();

  if (error) {
    console.error("Error updating task status:", error);
    throw error;
  }

  return data;
}


// import { supabase } from "./supabaseClient";

// /**
//  * 📋 Get all tasks (with member + event)
//  */
// export async function getTasks(weddingId) {
//   const { data, error } = await supabase
//     .from("tasks")
//     .select(`
//       *,
//       members ( id, name ),
//       events ( id, name, event_date )
//     `)
//     .eq("wedding_id", weddingId)
//     .order("created_at", { ascending: true });

//   if (error) throw error;
//   return data;
// }

// /**
//  * ➕ Add task
//  */
// export async function addTask({
//   name,
//   weddingId,
//   memberId = null,
//   eventId = null,
// }) {
//   const { data, error } = await supabase
//     .from("tasks")
//     .insert([
//       {
//         name,
//         wedding_id: weddingId,
//         member_id: memberId,
//         event_id: eventId,
//         status: "todo",
//       },
//     ])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// /**
//  * 🔄 Update task (status, name, member, event)
//  */
// export async function updateTask(taskId, updates) {
//   const { data, error } = await supabase
//     .from("tasks")
//     .update(updates)
//     .eq("id", taskId)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// /**
//  * ❌ Delete task
//  */
// export async function removeTask(taskId) {
//   const { error } = await supabase
//     .from("tasks")
//     .delete()
//     .eq("id", taskId);

//   if (error) throw error;
// }

// /**
//  * 📊 Get tasks by event (optional helper)
//  */
// export async function getTasksByEvent(weddingId, eventId) {
//   const { data, error } = await supabase
//     .from("tasks")
//     .select(`
//       *,
//       members ( id, name )
//     `)
//     .eq("wedding_id", weddingId)
//     .eq("event_id", eventId);

//   if (error) throw error;
//   return data;
// }

// /**
//  * ⚡ Realtime subscription
//  */
// export function subscribeTasks(weddingId, callback) {
//   const channel = supabase
//     .channel("tasks-realtime")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "tasks",
//         filter: `wedding_id=eq.${weddingId}`,
//       },
//       () => callback()
//     )
//     .subscribe();

//   return () => {
//     supabase.removeChannel(channel);
//   };
// }