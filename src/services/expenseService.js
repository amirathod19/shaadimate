import { supabase } from "./supabaseClient";

export async function getExpenses(weddingId) {
  if (!weddingId) return [];

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }

  return data || [];
}

export async function createExpense(expenseData) {
  const { data, error } = await supabase
    .from("expenses")
    .insert([expenseData])
    .select()
    .single();

  if (error) {
    console.error("Error creating expense:", error);
    throw error;
  }

  return data;
}

export async function deleteExpense(expenseId) {
  const { error } = await supabase.from("expenses").delete().eq("id", expenseId);

  if (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }

  return true;
}

export async function getTotalExpense(weddingId) {
  if (!weddingId) return 0;

  const { data, error } = await supabase
    .from("expenses")
    .select("amount")
    .eq("wedding_id", weddingId);

  if (error) {
    console.error("Error fetching total expense:", error);
    return 0;
  }

  return (data || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

// import { supabase } from "./supabaseClient";

// /**
//  * 💸 Get all expenses with payer + event info
//  */
// export async function getExpenses(weddingId) {
//   const { data, error } = await supabase
//     .from("expenses")
//     .select(`
//       *,
//       payer:paid_by ( id, name ),
//       events ( id, name )
//     `)
//     .eq("wedding_id", weddingId)
//     .order("created_at", { ascending: false });

//   if (error) throw error;
//   return data;
// }

// /**
//  * ➕ Add expense
//  */
// export async function addExpense({
//   title,
//   amount,
//   weddingId,
//   paidBy,
//   splitBetween = [],
//   eventId = null,
// }) {
//   const { data, error } = await supabase
//     .from("expenses")
//     .insert([
//       {
//         title,
//         amount: Number(amount),
//         wedding_id: weddingId,
//         paid_by: paidBy,
//         split_between: splitBetween,
//         event_id: eventId,
//       },
//     ])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// /**
//  * 🔄 Update expense
//  */
// export async function updateExpense(expenseId, updates) {
//   const { data, error } = await supabase
//     .from("expenses")
//     .update(updates)
//     .eq("id", expenseId)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// /**
//  * ❌ Delete expense
//  */
// export async function removeExpense(expenseId) {
//   const { error } = await supabase
//     .from("expenses")
//     .delete()
//     .eq("id", expenseId);

//   if (error) throw error;
// }

// /**
//  * 📊 Total expense
//  */
// export async function getTotalExpense(weddingId) {
//   const { data, error } = await supabase
//     .from("expenses")
//     .select("amount")
//     .eq("wedding_id", weddingId);

//   if (error) throw error;

//   return (data || []).reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0
//   );
// }

// /**
//  * ⚖️ Balance calculation
//  * +ve = should receive
//  * -ve = owes
//  */
// export function calculateBalances(expenses) {
//   const balances = {};

//   expenses.forEach((expense) => {
//     const splitBetween = expense.split_between || [];
//     const splitCount = splitBetween.length || 1;
//     const share = Number(expense.amount || 0) / splitCount;

//     splitBetween.forEach((memberId) => {
//       if (!balances[memberId]) balances[memberId] = 0;
//       balances[memberId] -= share;
//     });

//     if (expense.paid_by) {
//       if (!balances[expense.paid_by]) balances[expense.paid_by] = 0;
//       balances[expense.paid_by] += Number(expense.amount || 0);
//     }
//   });

//   return balances;
// }

// /**
//  * ⚡ Realtime subscription
//  */
// export function subscribeExpenses(weddingId, callback) {
//   const channel = supabase
//     .channel("expenses-realtime")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "expenses",
//         filter: `wedding_id=eq.${weddingId}`,
//       },
//       () => callback()
//     )
//     .subscribe();

//   return () => {
//     supabase.removeChannel(channel);
//   };
// }