import { useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import AddEventForm from "../components/events/AddEventForm";
import EventList from "../components/events/EventList";
import { useWedding } from "../context/WeddingContext";
import useEvents from "../hooks/useEvents";

export default function Events() {
  const { weddingId } = useWedding();
  const {
    events,
    loading,
    addEvent,
    deleteEvent,
  } = useEvents(weddingId);

  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return events || [];

    return (events || []).filter((event) => {
      const name = event.name?.toLowerCase() || "";
      const location = event.location?.toLowerCase() || "";
      return name.includes(query) || location.includes(query);
    });
  }, [events, search]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return filteredEvents
      .filter((event) => {
        if (!event.event_date) return false;
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return filteredEvents
      .filter((event) => {
        if (!event.event_date) return false;
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < today;
      })
      .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
  }, [filteredEvents]);

  return (
    <PageWrapper title="Events">
      <div className="space-y-6">
        {!weddingId ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-4">
            Please join or create a wedding first.
          </div>
        ) : (
          <>
            <AddEventForm onAddEvent={addEvent} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <input
                type="text"
                placeholder="Search by event name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-[#e7bfa7]"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Upcoming Events
                  </h2>
                  <span className="text-sm text-gray-500">
                    {upcomingEvents.length}
                  </span>
                </div>

                <EventList
                  events={upcomingEvents}
                  loading={loading}
                  onDeleteEvent={deleteEvent}
                  emptyText="No upcoming events"
                />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Past Events
                  </h2>
                  <span className="text-sm text-gray-500">
                    {pastEvents.length}
                  </span>
                </div>

                <EventList
                  events={pastEvents}
                  loading={loading}
                  onDeleteEvent={deleteEvent}
                  emptyText="No past events"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}