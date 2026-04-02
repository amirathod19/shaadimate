import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TaskList({
  tasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
}) {
  //   const [tasks, setTasks] = useState([]);

  //   async function fetchTasks() {
  //     const { data, error } = await supabase
  //       .from("tasks")
  //       .select("*")
  //       .order("deadline", { ascending: true });

  //     if (error) {
  //       console.error(error);
  //     } else {
  //       setTasks(data);
  //     }
  //   }

  //   useEffect(() => {
  //     fetchTasks();
  //   }, []);

  // ---- GROUPING ----
  const pending = tasks.filter((t) => t.status === "pending");
  const inprogress = tasks.filter((t) => t.status === "inprogress");
  const complete = tasks.filter((t) => t.status === "complete");

  const upcoming = tasks.filter((t) => {
    if (!t.deadline) return false;
    return new Date(t.deadline) >= new Date() && t.status !== "complete";
  });

  // ---- STATS ----
  const total = tasks.length;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <StatCard title="Total" value={total} />
        <StatCard title="Pending" value={pending.length} />
        <StatCard title="In Progress" value={inprogress.length} />
        <StatCard title="Completed" value={complete.length} />
        <StatCard title="Upcoming" value={upcoming.length} />
      </div>

      {/* ===== TASK COLUMNS ===== */}
      <div className="grid md:grid-cols-3 gap-4">
        <TaskColumn
          title="Pending"
          tasks={pending}
          color="bg-yellow-100"
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
        <TaskColumn
          title="In-progress"
          tasks={inprogress}
          color="bg-yellow-100"
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
        <TaskColumn
          title="Complete"
          tasks={complete}
          color="bg-yellow-100"
          updateTaskStatus={updateTaskStatus}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

// ===== SMALL COMPONENTS =====

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  color,
  updateTaskStatus,
  updateTask,
  deleteTask,
}) {
  return (
    <div className={`${color} p-3 rounded-xl`}>
      <h2 className="font-bold mb-3">{title}</h2>

      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks</p>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateTaskStatus={updateTaskStatus}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, updateTaskStatus, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "complete";

  return (
    <div
      className={`p-3 rounded-xl shadow ${
        isOverdue ? "bg-red-100 border border-red-400" : "bg-white"
      }`}
    >
      {editing ? (
        <div className="mb-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-1 w-full mb-2"
          />
          <button
            onClick={() => {
              updateTask(task.id, newName);
              setEditing(false);
            }}
            className="bg-green-500 text-white px-2 py-1 text-xs rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <h3 className="font-semibold">{task.name}</h3>
      )}

      {task.deadline && (
        <p className="text-sm text-gray-500">📅 {task.deadline}</p>
      )}

      {task.assigned_to && (
        <p className="text-sm text-gray-500">👤 {task.assigned_to}</p>
      )}

      {/* 🔥 OVERDUE LABEL */}
      {isOverdue && (
        <p className="text-red-600 text-xs font-bold mt-1">⚠ Overdue</p>
      )}

      {/* 🔥 BUTTONS */}
      <div className="flex gap-2 mt-3">
        {task.status === "pending" && (
          <button
            onClick={() => updateTaskStatus(task.id, "inprogress")}
            className="text-xs px-3 py-1 bg-blue-500 text-white rounded"
          >
            Start
          </button>
        )}

        {task.status !== "complete" && (
          <button
            onClick={() => updateTaskStatus(task.id, "complete")}
            className="text-xs px-3 py-1 bg-green-500 text-white rounded"
          >
            Complete
          </button>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-3">
        {/* Edit (hide if complete) */}
        {task.status !== "complete" && (
          <button
            onClick={() => setEditing(true)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            title="Edit"
          >
            <FaEdit size={14} className="text-gray-700" />
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
          title="Delete"
        >
          <FaTrash size={14} className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
