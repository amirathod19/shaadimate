import { useState } from "react";

export default function AddMemberForm({ onAddMember }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "family",
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

    if (!form.name.trim()) return;

    try {
      setLoading(true);

      await onAddMember({
        name: form.name.trim(),
        email: form.email.trim() || null,
        role: form.role,
      });

      setForm({
        name: "",
        email: "",
        role: "family",
      });
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Add Member</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder="Member name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#e7bfa7]"
        />

        <input
          name="email"
          type="email"
          placeholder="Member email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#e7bfa7]"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#e7bfa7]"
        >
          <option value="family">Family</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#e7bfa7] px-4 py-3 font-medium text-gray-900 transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
}


// import { useState } from "react";

// export default function AddMemberForm({ onAddMember }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "family",
//   });
//   const [loading, setLoading] = useState(false);

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

//       await onAddMember({
//         name: form.name.trim(),
//         email: form.email.trim() || null,
//         role: form.role,
//       });

//       setForm({
//         name: "",
//         email: "",
//         role: "family",
//       });
//     } catch (error) {
//       console.error("Error adding member:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Member</h2>

//       <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
//         <input
//           name="name"
//           type="text"
//           placeholder="Member name"
//           value={form.name}
//           onChange={handleChange}
//           className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="Member email"
//           value={form.email}
//           onChange={handleChange}
//           className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
//         />

//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7] bg-white"
//         >
//           <option value="family">Family</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className="rounded-xl bg-[#e7bfa7] px-4 py-2 font-medium text-gray-900 hover:opacity-90 transition disabled:opacity-60"
//         >
//           {loading ? "Adding..." : "Add Member"}
//         </button>
//       </form>
//     </div>
//   );
// }