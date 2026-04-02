import { useCallback, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import {
  getExpenses,
  createExpense,
  deleteExpense as deleteExpenseService,
} from "../services/expenseService";

export default function useExpenses(weddingId) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    try {
      if (!weddingId) {
        setExpenses([]);
        return;
      }

      setLoading(true);
      const data = await getExpenses(weddingId);
      setExpenses(data || []);
    } catch (error) {
      console.error("Error loading expenses:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, [weddingId]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    if (!weddingId) return;

    const channel = supabase
      .channel(`expenses-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "expenses",
        },
        () => {
          loadExpenses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weddingId, loadExpenses]);

  async function addExpense(expenseData) {
    const newExpense = await createExpense({
      ...expenseData,
      wedding_id: weddingId,
    });

    await loadExpenses();
    return newExpense;
  }

  async function deleteExpense(expenseId) {
    await deleteExpenseService(expenseId);
    await loadExpenses();
  }

  return {
    expenses,
    loading,
    addExpense,
    deleteExpense,
    reloadExpenses: loadExpenses,
  };
}