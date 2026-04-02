import { supabase } from "./supabaseClient";

export async function getMembers(weddingId) {
  if (!weddingId) return [];

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching members:", error);
    return [];
  }

  return data || [];
}

export async function createMember(memberData) {
  const { data, error } = await supabase
    .from("members")
    .insert([memberData])
    .select()
    .single();

  if (error) {
    console.error("Error creating member:", error);
    throw error;
  }

  return data;
}

export async function addMemberToWedding(memberData) {
  const { data: existing, error: existingError } = await supabase
    .from("members")
    .select("id")
    .eq("wedding_id", memberData.wedding_id)
    .eq("user_id", memberData.user_id)
    .maybeSingle();

  if (existingError) {
    console.error("Error checking existing member:", existingError);
    throw existingError;
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("members")
    .insert([memberData])
    .select()
    .single();

  if (error) {
    console.error("Error adding member to wedding:", error);
    throw error;
  }

  return data;
}

export async function deleteMember(memberId) {
  const { error } = await supabase.from("members").delete().eq("id", memberId);

  if (error) {
    console.error("Error deleting member:", error);
    throw error;
  }

  return true;
}


// import { supabase } from "./supabaseClient";

// /**
//  * 👥 Get members
//  */
// export async function getMembers(weddingId) {
//   const { data, error } = await supabase
//     .from("members")
//     .select("*")
//     .eq("wedding_id", weddingId)
//     .order("created_at", { ascending: true });

//   if (error) throw error;
//   return data;
// }

// /**
//  * ➕ Add member
//  */
// export async function addMember({ name, weddingId }) {
//   const { data, error } = await supabase
//     .from("members")
//     .insert([
//       {
//         name,
//         wedding_id: weddingId,
//         role: "member",
//       },
//     ])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// /**
//  * ❌ Remove member
//  */
// export async function removeMember(memberId) {
//   const { error } = await supabase
//     .from("members")
//     .delete()
//     .eq("id", memberId);

//   if (error) throw error;
// }

// /**
//  * ⚡ Realtime subscription
//  */
// export function subscribeMembers(weddingId, callback) {
//   const channel = supabase
//     .channel("members-changes")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "members",
//         filter: `wedding_id=eq.${weddingId}`,
//       },
//       () => {
//         callback(); // refetch
//       }
//     )
//     .subscribe();

//   return () => {
//     supabase.removeChannel(channel);
//   };
// }