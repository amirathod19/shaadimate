import { useEffect, useState } from "react";
import { useWedding } from "../../context/WeddingContext";
import { getMembers } from "../../services/memberService";
import { getEvents } from "../../services/eventService";

export default function AddExpenseForm({ onAddExpense }) {
  const { weddingId } = useWedding();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    paid_by: "",
    paid_by_name: "",
    event_id: "",
  });

  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!weddingId) return;

      try {
        const [membersData, eventsData] = await Promise.all([
          getMembers(weddingId),
          getEvents(weddingId),
        ]);

        setMembers(membersData || []);
        setEvents(eventsData || []);
      } catch (error) {
        console.error("Error loading expense form data:", error);
      }
    }

    loadData();
  }, [weddingId]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "paid_by") {
      const selectedMember = members.find((member) => member.id === value);

      setForm((prev) => ({
        ...prev,
        paid_by: value,
        paid_by_name: selectedMember?.name || "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.amount) return;

    try {
      setLoading(true);

      await onAddExpense({
        name: form.name.trim(),
        amount: Number(form.amount),
        paid_by: form.paid_by || null,
        paid_by_name: form.paid_by_name || null,
        event_id: form.event_id || null,
      });

      setForm({
        name: "",
        amount: "",
        paid_by: "",
        paid_by_name: "",
        event_id: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder="Expense name"
          value={form.name}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
        />

        <select
          name="paid_by"
          value={form.paid_by}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
        >
          <option value="">Paid By</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          name="event_id"
          value={form.event_id}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#e7bfa7] px-4 py-2 font-medium text-gray-900 hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}