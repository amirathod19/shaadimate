import { useState } from "react";

export default function AddEventForm({ onAddEvent }) {
  const [form, setForm] = useState({
    name: "",
    event_date: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.event_date) return;

    try {
      setLoading(true);

      await onAddEvent({
        name: form.name.trim(),
        event_date: form.event_date,
        location: form.location.trim() || null,
      });

      setForm({
        name: "",
        event_date: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Event</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder="Event name"
          value={form.name}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
        />

        <input
          name="event_date"
          type="date"
          value={form.event_date}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#e7bfa7] px-4 py-2 font-medium text-gray-900 hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}