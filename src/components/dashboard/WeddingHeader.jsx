import { useEffect, useState } from "react";
import { useWedding } from "../../context/WeddingContext";
import { getWedding } from "../../services/weddingService";
import formatDate from "../../utils/formatDate";

export default function WeddingHeader() {
  const { weddingId } = useWedding();

  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadWedding() {
      try {
        setLoading(true);

        if (!weddingId) {
          setWedding(null);
          return;
        }

        const data = await getWedding(weddingId);
        setWedding(data || null);
      } catch (error) {
        console.error("Error loading wedding header:", error);
        setWedding(null);
      } finally {
        setLoading(false);
      }
    }

    loadWedding();
  }, [weddingId]);

  async function handleSharePin() {
    if (!wedding?.pin) return;

    const shareText = `Join our wedding on ShaadiMate.\nPIN: ${wedding.pin}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "ShaadiMate Wedding PIN",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing PIN:", error);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-gray-500">Loading wedding details...</p>
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-gray-500">No wedding selected.</p>
      </div>
    );
  }

  const countdown = getCountdown(wedding.wedding_date);

  return (
    <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-orange-50 p-4 shadow-sm sm:p-5">
      {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"> */}
      <div className="flex flex-col gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm text-gray-500">Wedding</p>

          <h1 className="break-words text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            {wedding.couple_name || "Our Wedding"}
          </h1>

          <p className="mt-2 text-sm text-gray-600 break-words">
            Date:{" "}
            {wedding.wedding_date
              ? formatDate(wedding.wedding_date)
              : "Not set"}
          </p>

          {wedding.pin ? (
            <p className="mt-1 text-sm text-gray-600 break-words">
              PIN: <span className="font-semibold text-gray-900">{wedding.pin}</span>
            </p>
          ) : null}
        </div>

        {/* <div className="flex w-full flex-col gap-3 md:w-auto md:items-end"> */}
        <div className="flex flex-col gap-3">
          <div className="w-full rounded-2xl border border-gray-100 bg-white px-4 py-4 text-center shadow-sm md:min-w-[180px] md:w-auto">
            <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
              Countdown
            </p>
            <p className="break-words text-2xl font-bold text-rose-500 sm:text-3xl">
              {countdown.days}
            </p>
            <p className="text-sm text-gray-600">{countdown.label}</p>
          </div>

          <button
            onClick={handleSharePin}
            className="w-full rounded-xl bg-[#e7bfa7] px-4 py-3 text-sm font-medium text-gray-900 transition hover:opacity-90 md:w-auto"
          >
            {copied ? "PIN Copied" : "Share PIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

function getCountdown(weddingDate) {
  if (!weddingDate) {
    return { days: "--", label: "Date not set" };
  }

  const today = new Date();
  const target = new Date(weddingDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return { days: diffDays, label: "days left" };
  }

  if (diffDays === 0) {
    return { days: "Today", label: "Big day is here" };
  }

  return { days: Math.abs(diffDays), label: "days ago" };
}

// import { useEffect, useState } from "react";
// import { useWedding } from "../../context/WeddingContext";
// import { getWedding } from "../../services/weddingService";
// import formatDate from "../../utils/formatDate";

// export default function WeddingHeader() {
//   const { weddingId } = useWedding();

//   const [wedding, setWedding] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     async function loadWedding() {
//       try {
//         setLoading(true);

//         if (!weddingId) {
//           setWedding(null);
//           return;
//         }

//         const data = await getWedding(weddingId);
//         setWedding(data || null);
//       } catch (error) {
//         console.error("Error loading wedding header:", error);
//         setWedding(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadWedding();
//   }, [weddingId]);

//   async function handleSharePin() {
//     if (!wedding?.pin) return;

//     const shareText = `Join our wedding on ShaadiMate.\nPIN: ${wedding.pin}`;

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: "ShaadiMate Wedding PIN",
//           text: shareText,
//         });
//       } else {
//         await navigator.clipboard.writeText(shareText);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       }
//     } catch (error) {
//       console.error("Error sharing PIN:", error);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
//         <p className="text-sm text-gray-500">Loading wedding details...</p>
//       </div>
//     );
//   }

//   if (!wedding) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
//         <p className="text-sm text-gray-500">No wedding selected.</p>
//       </div>
//     );
//   }

//   const countdown = getCountdown(wedding.wedding_date);

//   return (
//     <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl shadow-sm p-5 border border-rose-100">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <p className="text-sm text-gray-500 mb-1">Wedding</p>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//             {wedding.couple_name || "Our Wedding"}
//           </h1>
//           <p className="text-sm text-gray-600 mt-2">
//             Date: {wedding.wedding_date ? formatDate(wedding.wedding_date) : "Not set"}
//           </p>
//           {wedding.pin && (
//             <p className="text-sm text-gray-600 mt-1">
//               PIN: <span className="font-semibold text-gray-900">{wedding.pin}</span>
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col items-start md:items-end gap-3">
//           <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm min-w-[180px] text-center">
//             <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//               Countdown
//             </p>
//             <p className="text-3xl font-bold text-rose-500">
//               {countdown.days}
//             </p>
//             <p className="text-sm text-gray-600">
//               {countdown.label}
//             </p>
//           </div>

//           <button
//             onClick={handleSharePin}
//             className="px-4 py-2 rounded-xl bg-[#e7bfa7] text-gray-900 font-medium hover:opacity-90 transition"
//           >
//             {copied ? "PIN Copied" : "Share PIN"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function getCountdown(weddingDate) {
//   if (!weddingDate) {
//     return { days: "--", label: "Date not set" };
//   }

//   const today = new Date();
//   const target = new Date(weddingDate);

//   today.setHours(0, 0, 0, 0);
//   target.setHours(0, 0, 0, 0);

//   const diffTime = target - today;
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays > 0) {
//     return { days: diffDays, label: "days left" };
//   }

//   if (diffDays === 0) {
//     return { days: "Today", label: "Big day is here" };
//   }

//   return { days: Math.abs(diffDays), label: "days ago" };
// }