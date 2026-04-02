import { supabase } from "./supabaseClient";

export async function getWedding(weddingId) {
  if (!weddingId) return null;

  const { data, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("id", weddingId)
    .single();

  if (error) {
    console.error("Error fetching wedding:", error);
    return null;
  }

  return data;
}

export async function joinWeddingByPin(pin) {
  if (!pin) return null;

  const { data, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("pin", pin)
    .single();

  if (error) {
    console.error("Error joining wedding by PIN:", error);
    return null;
  }

  return data;
}

export async function createWedding({
  couple_name,
  wedding_date,
  budget = 0,
  created_by,
  pin,
}) {
  const { data, error } = await supabase
    .from("weddings")
    .insert([
      {
        couple_name,
        wedding_date,
        budget,
        created_by,
        pin,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating wedding:", error);
    throw error;
  }

  return data;
}

export async function updateWedding(weddingId, updates) {
  const { data, error } = await supabase
    .from("weddings")
    .update(updates)
    .eq("id", weddingId)
    .select()
    .single();

  if (error) {
    console.error("Error updating wedding:", error);
    throw error;
  }

  return data;
}

export async function deleteWedding(weddingId) {
  const { error } = await supabase
    .from("weddings")
    .delete()
    .eq("id", weddingId);

  if (error) {
    console.error("Error deleting wedding:", error);
    throw error;
  }

  return true;
}

// import { supabase } from "./supabaseClient";

// /**
//  * 🔍 Get single wedding by ID
//  */
// export async function getWedding(weddingId) {
//   if (!weddingId) return null;

//   const { data, error } = await supabase
//     .from("weddings")
//     .select("*")
//     .eq("id", weddingId)
//     .single();

//   if (error) {
//     console.error("Error fetching wedding:", error);
//     return null;
//   }

//   return data;
// }

// /**
//  * 🔑 Join wedding using PIN
//  */
// export async function joinWeddingByPin(pin) {
//   if (!pin) return null;

//   const { data, error } = await supabase
//     .from("weddings")
//     .select("*")
//     .eq("pin", pin)
//     .single();

//   if (error) {
//     console.error("Error joining wedding by PIN:", error);
//     return null;
//   }

//   return data;
// }

// /**
//  * 🆕 Create new wedding
//  */
// export async function createWedding({
//   couple_name,
//   wedding_date,
//   budget = 0,
//   created_by,
//   pin,
// }) {
//   const { data, error } = await supabase
//     .from("weddings")
//     .insert([
//       {
//         couple_name,
//         wedding_date,
//         budget,
//         created_by,
//         pin,
//       },
//     ])
//     .select()
//     .single();

//   if (error) {
//     console.error("Error creating wedding:", error);
//     throw error;
//   }

//   return data;
// }

// /**
//  * ✏️ Update wedding (optional use)
//  */
// export async function updateWedding(weddingId, updates) {
//   const { data, error } = await supabase
//     .from("weddings")
//     .update(updates)
//     .eq("id", weddingId)
//     .select()
//     .single();

//   if (error) {
//     console.error("Error updating wedding:", error);
//     throw error;
//   }

//   return data;
// }

// /**
//  * ❌ Delete wedding (optional use)
//  */
// export async function deleteWedding(weddingId) {
//   const { error } = await supabase
//     .from("weddings")
//     .delete()
//     .eq("id", weddingId);

//   if (error) {
//     console.error("Error deleting wedding:", error);
//     throw error;
//   }

//   return true;
// }