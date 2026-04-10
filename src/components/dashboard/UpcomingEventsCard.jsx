import { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";
import { supabase } from "../../services/supabaseClient";
import { useWedding } from "../../context/WeddingContext";
import formatDate from "../../utils/formatDate";

export default function UpcomingEventsCard() {
  const { weddingId } = useWedding();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!weddingId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadEvents() {
      try {
        setLoading(true);

        const data = await getEvents(weddingId);
        if (!isMounted) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = (data || [])
          .filter((e) => {
            if (!e.event_date) return false;

            const eventDate = new Date(e.event_date);
            eventDate.setHours(0, 0, 0, 0);

            return eventDate >= today;
          })
          .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
          .slice(0, 3);

        setEvents(upcoming);
      } catch (error) {
        console.error("Error loading events:", error);
        if (isMounted) setEvents([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadEvents();

    const channel = supabase
      .channel(`events-card-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
          filter: `wedding_id=eq.${weddingId}`,
        },
        async () => {
          await loadEvents();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [weddingId]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-800">
        Upcoming Events
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-gray-400">No upcoming events</p>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between gap-3 border-b pb-3 last:border-none"
            >
              <div className="min-w-0 flex-1">
                <p className="break-words font-medium text-gray-800">{e.name}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(e.event_date)}
                </p>
                {e.location ? (
                  <p className="break-words text-xs text-gray-400">
                    {e.location}
                  </p>
                ) : null}
              </div>

              <div className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                {getDaysLeft(e.event_date)}d
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getDaysLeft(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? diffDays : 0;
}

// import { useEffect, useState } from "react";
// import { getEvents } from "../../services/eventService";
// import { supabase } from "../../services/supabaseClient";
// import { useWedding } from "../../context/WeddingContext";
// import formatDate from "../../utils/formatDate";

// export default function UpcomingEventsCard() {
//   const { weddingId } = useWedding();

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!weddingId) {
//       setEvents([]);
//       setLoading(false);
//       return;
//     }

//     let isMounted = true;

//     async function loadEvents() {
//       try {
//         setLoading(true);

//         const data = await getEvents(weddingId);

//         if (!isMounted) return;

//         const now = new Date();

//         const upcoming = (data || [])
//           .filter((e) => new Date(e.event_date) >= now)
//           .sort(
//             (a, b) =>
//               new Date(a.event_date) - new Date(b.event_date)
//           )
//           .slice(0, 3);

//         setEvents(upcoming);
//       } catch (error) {
//         console.error("Error loading events:", error);
//         if (isMounted) setEvents([]);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     loadEvents();

//     const channel = supabase
//       .channel(`events-${weddingId}`)
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "events",
//         },
//         async () => {
//           await loadEvents();
//         }
//       )
//       .subscribe();

//     return () => {
//       isMounted = false;
//       supabase.removeChannel(channel);
//     };
//   }, [weddingId]);

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
//       <h2 className="text-lg font-semibold text-gray-800 mb-3">
//         Upcoming Events
//       </h2>

//       {loading ? (
//         <p className="text-sm text-gray-500">Loading events...</p>
//       ) : events.length === 0 ? (
//         <p className="text-sm text-gray-400">
//           No upcoming events
//         </p>
//       ) : (
//         <div className="space-y-3">
//           {events.map((e) => (
//             <div
//               key={e.id}
//               className="flex justify-between items-center border-b pb-2 last:border-none"
//             >
//               <div>
//                 <p className="font-medium text-gray-800">
//                   {e.name}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {formatDate(e.event_date)}
//                 </p>
//               </div>

//               <div className="text-xs text-gray-400">
//                 {getDaysLeft(e.event_date)}d
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* helper */
// function getDaysLeft(date) {
//   const today = new Date();
//   const eventDate = new Date(date);

//   const diffTime = eventDate - today;
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays >= 0 ? diffDays : 0;
// }