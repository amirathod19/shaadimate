export default function EventList({
  events,
  loading,
  onDeleteEvent,
  emptyText = "No events found",
}) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading events...</p>;
  }

  if (!events?.length) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-start justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold text-gray-900">{event.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{event.event_date}</p>
            {event.location ? (
              <p className="text-sm text-gray-500">{event.location}</p>
            ) : null}
          </div>

          <button
            onClick={() => onDeleteEvent(event.id)}
            className="px-3 py-2 rounded-xl bg-red-50 text-sm font-medium text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}