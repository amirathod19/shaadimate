import { supabase } from "./supabaseClient";

export async function getEvents(weddingId) {
  if (!weddingId) return [];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}

export async function createEvent(eventData) {
  const { data, error } = await supabase
    .from("events")
    .insert([eventData])
    .select()
    .single();

  if (error) {
    console.error("Error creating event:", error);
    throw error;
  }

  return data;
}

export async function deleteEvent(eventId) {
  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    console.error("Error deleting event:", error);
    throw error;
  }

  return true;
}


// import { supabase } from "./supabaseClient";

// /**
//  * 📅 Get events
//  */
// export async function getEvents(weddingId) {
//   const { data, error } = await supabase
//     .from("events")
//     .select("*")
//     .eq("wedding_id", weddingId)
//     .order("event_date", { ascending: true });

//   if (error) throw error;
//   return data;
// }

// /**
//  * ➕ Add event
//  */
// export async function addEvent({ name, eventDate, weddingId }) {
//   const { data, error } = await supabase
//     .from("events")
//     .insert([
//       {
//         name,
//         event_date: eventDate,
//         wedding_id: weddingId,
//       },
//     ])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// /**
//  * ❌ Delete event
//  */
// export async function removeEvent(eventId) {
//   const { error } = await supabase
//     .from("events")
//     .delete()
//     .eq("id", eventId);

//   if (error) throw error;
// }

// /**
//  * ⚡ Realtime
//  */
// export function subscribeEvents(weddingId, callback) {
//   const channel = supabase
//     .channel("events-realtime")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "events",
//         filter: `wedding_id=eq.${weddingId}`,
//       },
//       () => callback()
//     )
//     .subscribe();

//   return () => supabase.removeChannel(channel);
// }