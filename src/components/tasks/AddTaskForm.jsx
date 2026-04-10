import { useEffect, useState } from "react";
import { useWedding } from "../../context/WeddingContext";
import { getEvents } from "../../services/eventService";
import { getMembers } from "../../services/memberService";

export default function AddTaskForm({ onAddTask }) {
  const { weddingId } = useWedding();

  const [form, setForm] = useState({
    name: "",
    event_id: "",
    assigned_to: "",
    deadline: "",
    status: "pending",
    notes: "",
  });

  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!weddingId) {
        setEvents([]);
        setMembers([]);
        return;
      }

      try {
        const [eventsData, membersData] = await Promise.all([
          getEvents(weddingId),
          getMembers(weddingId),
        ]);

        setEvents(eventsData || []);
        setMembers(membersData || []);
      } catch (error) {
        console.error("Error loading task form data:", error);
      }
    }

    loadData();
  }, [weddingId]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return;

    try {
      setLoading(true);

      await onAddTask({
        name: form.name.trim(),
        event_id: form.event_id || null,
        assigned_to: form.assigned_to || null,
        deadline: form.deadline || null,
        status: form.status,
        notes: form.notes.trim() || null,
      });

      setForm({
        name: "",
        event_id: "",
        assigned_to: "",
        deadline: "",
        status: "pending",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Add Task</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder="Task name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#e7bfa7]"
        />

        <select
          name="event_id"
          value={form.event_id}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#e7bfa7]"
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>

        <select
          name="assigned_to"
          value={form.assigned_to}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#e7bfa7]"
        >
          <option value="">Assign Member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#e7bfa7]"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#e7bfa7] sm:col-span-2"
        >
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="complete">Complete</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#e7bfa7] sm:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#e7bfa7] px-4 py-3 font-medium text-gray-900 transition hover:opacity-90 disabled:opacity-60 sm:col-span-2"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useWedding } from "../../context/WeddingContext";
// import { getEvents } from "../../services/eventService";
// import { getMembers } from "../../services/memberService";

// export default function AddTaskForm({ onAddTask }) {
//   const { weddingId } = useWedding();

//   const [form, setForm] = useState({
//     name: "",
//     event_id: "",
//     assigned_to: "",
//     deadline: "",
//     status: "pending",
//     notes: "",
//   });

//   const [events, setEvents] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function loadData() {
//       if (!weddingId) {
//         setEvents([]);
//         setMembers([]);
//         return;
//       }

//       try {
//         const [eventsData, membersData] = await Promise.all([
//           getEvents(weddingId),
//           getMembers(weddingId),
//         ]);

//         setEvents(eventsData || []);
//         setMembers(membersData || []);
//       } catch (error) {
//         console.error("Error loading task form data:", error);
//       }
//     }

//     loadData();
//   }, [weddingId]);

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.name.trim()) return;

//     try {
//       setLoading(true);

//       await onAddTask({
//         name: form.name.trim(),
//         event_id: form.event_id || null,
//         assigned_to: form.assigned_to || null,
//         deadline: form.deadline || null,
//         status: form.status,
//         notes: form.notes.trim() || null,
//       });

//       setForm({
//         name: "",
//         event_id: "",
//         assigned_to: "",
//         deadline: "",
//         status: "pending",
//         notes: "",
//       });
//     } catch (error) {
//       console.error("Error adding task:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Task</h2>

//       <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
//         <input
//           name="name"
//           type="text"
//           placeholder="Task name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//         />

//         <select
//           name="event_id"
//           value={form.event_id}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="">Select Event</option>
//           {events.map((event) => (
//             <option key={event.id} value={event.id}>
//               {event.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="assigned_to"
//           value={form.assigned_to}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="">Assign Member</option>
//           {members.map((member) => (
//             <option key={member.id} value={member.id}>
//               {member.name}
//             </option>
//           ))}
//         </select>

//         <input
//           name="deadline"
//           type="date"
//           value={form.deadline}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//         />

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="pending">Pending</option>
//           <option value="inprogress">In Progress</option>
//           <option value="complete">Complete</option>
//         </select>

//         <textarea
//           name="notes"
//           placeholder="Notes (optional)"
//           value={form.notes}
//           onChange={handleChange}
//           rows={3}
//           className="md:col-span-2 w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] resize-none"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="md:col-span-2 w-full rounded-xl bg-[#e7bfa7] px-4 py-2 font-medium text-gray-900 hover:opacity-90 transition disabled:opacity-60"
//         >
//           {loading ? "Adding..." : "Add Task"}
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useWedding } from "../../context/WeddingContext";
// import { getEvents } from "../../services/eventService";
// import { getMembers } from "../../services/memberService";

// export default function AddTaskForm({ onAddTask }) {
//   const { weddingId } = useWedding();

//   const [form, setForm] = useState({
//     name: "",
//     event_id: "",
//     assigned_to: "",
//     assigned_to_name: "",
//     deadline: "",
//     status: "pending",
//   });

//   const [events, setEvents] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function loadData() {
//       if (!weddingId) return;

//       try {
//         const [eventsData, membersData] = await Promise.all([
//           getEvents(weddingId),
//           getMembers(weddingId),
//         ]);

//         setEvents(eventsData || []);
//         setMembers(membersData || []);
//       } catch (error) {
//         console.error("Error loading task form data:", error);
//       }
//     }

//     loadData();
//   }, [weddingId]);

//   function handleChange(e) {
//     const { name, value } = e.target;

//     if (name === "assigned_to") {
//       const selectedMember = members.find((member) => member.id === value);

//       setForm((prev) => ({
//         ...prev,
//         assigned_to: value,
//         assigned_to_name: selectedMember?.name || "",
//       }));
//       return;
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.name.trim()) return;

//     try {
//       setLoading(true);

//       await onAddTask({
//         name: form.name.trim(),
//         event_id: form.event_id || null,
//         assigned_to: form.assigned_to || null,
//         assigned_to_name: form.assigned_to_name || null,
//         deadline: form.deadline || null,
//         status: form.status,
//       });

//       setForm({
//         name: "",
//         event_id: "",
//         assigned_to: "",
//         assigned_to_name: "",
//         deadline: "",
//         status: "pending",
//       });
//     } catch (error) {
//       console.error("Error adding task:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Task</h2>

//       <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
//         <input
//           name="name"
//           type="text"
//           placeholder="Task name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//         />

//         <select
//           name="event_id"
//           value={form.event_id}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="">Select Event</option>
//           {events.map((event) => (
//             <option key={event.id} value={event.id}>
//               {event.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="assigned_to"
//           value={form.assigned_to}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="">Assign Member</option>
//           {members.map((member) => (
//             <option key={member.id} value={member.id}>
//               {member.name}
//             </option>
//           ))}
//         </select>

//         <input
//           name="deadline"
//           type="date"
//           value={form.deadline}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//         />

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="pending">Pending</option>
//           <option value="inprogress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-[#e7bfa7] px-4 py-2 font-medium text-gray-900 hover:opacity-90 transition disabled:opacity-60"
//         >
//           {loading ? "Adding..." : "Add Task"}
//         </button>
//       </form>
//     </div>
//   );
// }