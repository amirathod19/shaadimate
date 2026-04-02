import { createContext, useContext, useEffect, useState } from "react";

const WeddingContext = createContext(null);

export function WeddingProvider({ children }) {
  const [weddingId, setWeddingIdState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedWeddingId = localStorage.getItem("weddingId");

      if (storedWeddingId) {
        setWeddingIdState(storedWeddingId);
      }
    } catch (error) {
      console.error("Error loading weddingId from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    try {
      if (weddingId) {
        localStorage.setItem("weddingId", weddingId);
      } else {
        localStorage.removeItem("weddingId");
      }
    } catch (error) {
      console.error("Error saving weddingId to localStorage:", error);
    }
  }, [weddingId, loading]);

  function setWeddingId(id) {
    setWeddingIdState(id || null);
  }

  function leaveWedding() {
    setWeddingIdState(null);

    try {
      localStorage.removeItem("weddingId");
    } catch (error) {
      console.error("Error clearing weddingId from localStorage:", error);
    }
  }

  const value = {
    weddingId,
    setWeddingId,
    leaveWedding,
    loading,
    hasWedding: !!weddingId,
  };

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);

  if (!context) {
    throw new Error("useWedding must be used inside WeddingProvider");
  }

  return context;
}