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

        const now = new Date();

        const upcoming = (data || [])
          .filter((e) => new Date(e.event_date) >= now)
          .sort(
            (a, b) =>
              new Date(a.event_date) - new Date(b.event_date)
          )
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
      .channel(`events-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
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
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Upcoming Events
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-gray-400">
          No upcoming events
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {e.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(e.event_date)}
                </p>
              </div>

              <div className="text-xs text-gray-400">
                {getDaysLeft(e.event_date)}d
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* helper */
function getDaysLeft(date) {
  const today = new Date();
  const eventDate = new Date(date);

  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? diffDays : 0;
}