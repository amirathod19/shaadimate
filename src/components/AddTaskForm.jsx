// import { useState } from "react";
// import { supabase } from "../supabase";

// export default function AddTaskForm({ events, onAdded }) {
//   const [name, setName] = useState("");
//   const [eventId, setEventId] = useState(null);
//   const [assignedTo, setAssignedTo] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [notes, setNotes] = useState("");

//   async function handleAdd() {
//     if (!name || !eventId) {
//       alert("Task name and event required");
//       return;
//     }

//     const { error } = await supabase.from("tasks").insert([
//       {
//         name,
//         event_id: eventId,
//         assigned_to: assignedTo,
//         deadline,
//         notes,
//       },
//     ]);

//     if (error) {
//       console.log(error);
//       alert("Error adding task");
//       return;
//     }

//     // reset
//     setName("");
//     setEventId(null);
//     setAssignedTo("");
//     setDeadline("");
//     setNotes("");

//     onAdded && onAdded();
//   }

//   return (
//     <div style={styles.card}>
//       <h2>Add New Task</h2>

//       {/* Task Name */}
//       <input
//         placeholder="e.g. Book venue"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={styles.input}
//       />

//       {/* Event Chips */}
//       <div>
//         <p>Event</p>
//         <div style={styles.chipWrap}>
//           {events.map((e) => (
//             <button
//               key={e.id}
//               onClick={() => setEventId(e.id)}
//               style={{
//                 ...styles.chip,
//                 background:
//                   eventId === e.id ? "#c79a63" : "#eee",
//                 color: eventId === e.id ? "#fff" : "#000",
//               }}
//             >
//               {e.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Assigned */}
//       <input
//         placeholder="Assigned to (name)"
//         value={assignedTo}
//         onChange={(e) => setAssignedTo(e.target.value)}
//         style={styles.input}
//       />

//       {/* Deadline */}
//       <input
//         type="date"
//         value={deadline}
//         onChange={(e) => setDeadline(e.target.value)}
//         style={styles.input}
//       />

//       {/* Notes */}
//       <textarea
//         placeholder="Notes"
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         style={styles.textarea}
//       />

//       <button onClick={handleAdd} style={styles.button}>
//         Add Task
//       </button>
//     </div>
//   );
// }

// const styles = {
//   card: {
//     padding: 20,
//     borderRadius: 16,
//     background: "#fff",
//     maxWidth: 400,
//     margin: "20px auto",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 10,
//     border: "1px solid #ddd",
//   },
//   textarea: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 10,
//     border: "1px solid #ddd",
//   },
//   chipWrap: {
//     display: "flex",
//     gap: 8,
//     flexWrap: "wrap",
//     marginBottom: 10,
//   },
//   chip: {
//     padding: "6px 12px",
//     borderRadius: 20,
//     border: "none",
//     cursor: "pointer",
//   },
//   button: {
//     width: "100%",
//     padding: 12,
//     borderRadius: 12,
//     border: "none",
//     background: "#c79a63",
//     color: "#fff",
//     fontWeight: "bold",
//     cursor: "pointer",
//   },
// };

import { useState } from "react";
import { supabase } from "../supabase";

export default function AddTaskForm({ events, onAdded }) {
  const [name, setName] = useState("");
  const [eventId, setEventId] = useState(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  async function handleAdd() {
    if (!name || !eventId) {
      alert("Task name and event required");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        name,
        event_id: eventId,
        assigned_to: assignedTo,
        deadline,
        notes,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error adding task");
      return;
    }

    // reset
    setName("");
    setEventId(null);
    setAssignedTo("");
    setDeadline("");
    setNotes("");

    onAdded && onAdded();
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>

      {/* Task Name */}
      <input
        placeholder="e.g. Book venue"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c79a63]"
      />

      {/* Event Chips */}
      <div className="mb-3">
        <p className="text-sm font-medium mb-2">Event</p>

        <div className="flex flex-wrap gap-2">
          {events &&
            events.map((e) => (
              <button
                key={e.id}
                onClick={() => setEventId(e.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  eventId === e.id ? "bg-[#c79a63] text-white" : "bg-gray-200"
                }`}
              >
                {e.name}
              </button>
            ))}
        </div>
      </div>

      {/* Assigned */}
      <input
        placeholder="Assigned to (name)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c79a63]"
      />

      {/* Deadline */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c79a63]"
      />

      {/* Notes */}
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c79a63]"
      />

      {/* Button */}
      <button
        onClick={handleAdd}
        className="w-full p-3 rounded-xl bg-[#c79a63] text-white font-semibold hover:opacity-90 transition"
      >
        Add Task
      </button>
    </div>
  );
}
