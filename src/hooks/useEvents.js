import { useCallback, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import {
  getEvents,
  createEvent,
  deleteEvent as deleteEventService,
} from "../services/eventService";

export default function useEvents(weddingId) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = useCallback(async () => {
    try {
      if (!weddingId) {
        setEvents([]);
        return;
      }

      setLoading(true);
      const data = await getEvents(weddingId);
      setEvents(data || []);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [weddingId]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    if (!weddingId) return;

    const channel = supabase
      .channel(`events-${weddingId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
        },
        () => {
          loadEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weddingId, loadEvents]);

  async function addEvent(eventData) {
    const newEvent = await createEvent({
      ...eventData,
      wedding_id: weddingId,
    });

    await loadEvents();
    return newEvent;
  }

  async function deleteEvent(eventId) {
    await deleteEventService(eventId);
    await loadEvents();
  }

  return {
    events,
    loading,
    addEvent,
    deleteEvent,
    reloadEvents: loadEvents,
  };
}