// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");

  async function getEvents() {
    const { data, error } = await supabase.from("events").select("*");
    if (error) console.log(error);
    else setEvents(data);
  }

  async function getTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("deadline", { ascending: true });

    if (!error) setTasks(data || []);
  }

  async function updateTaskStatus(id, newStatus) {
    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      // ✅ instant UI update (no reload)
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      );
    }
  }

  async function updateTask(id, name) {
    const { error } = await supabase
      .from("tasks")
      .update({ name })
      .eq("id", id);

    if (!error) {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error(error);
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  }

  const filteredTasks =
    selectedEvent === "all"
      ? tasks
      : tasks.filter((t) => t.event_id == selectedEvent);

  async function addEvent() {
    if (!name) return;

    await supabase.from("events").insert([
      {
        name,
        budget: 100000,
        date: "2026-12-01",
      },
    ]);

    getEvents();
  }

  useEffect(() => {
    getEvents();
    getTasks();

    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          console.log("Realtime update:", payload);
          getTasks(); // auto refresh
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <AddTaskForm events={events} onAdded={getTasks} />

      {/* 🔥 ADD FILTER UI HERE */}
      <div className="max-w-md mx-auto mt-4">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full p-3 rounded-xl border"
        >
          <option value="all">All Events</option>

          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}

      <TaskList tasks={filteredTasks} updateTaskStatus={updateTaskStatus} updateTask={updateTask} deleteTask={deleteTask} />
    </div>

    // <div style={{ padding: 20 }}>
    //   <h1>ShaadiMate</h1>

    //   <input
    //     placeholder="Event name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <button onClick={addEvent}>Add Event</button>
    //   <AddTaskForm events={events} onAdded={getEvents} />

    //   <ul>
    //     {events?.map((e) => (
    //       <li key={e.id}>{e.name}</li>
    //     ))}
    //   </ul>
    //   <h1 className="text-3xl font-bold text-green-500">
    //  Tailwind Working
    //   </h1>
    // </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
