import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { useWedding } from "../context/WeddingContext";
import { joinWeddingByPin } from "../services/weddingService";
import { addMemberToWedding } from "../services/memberService";

export default function JoinWedding() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { weddingId, setWeddingId } = useWedding();

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (weddingId) {
      navigate("/", { replace: true });
    }
  }, [weddingId, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanPin = pin.trim();

    if (!cleanPin) {
      setError("PIN is required");
      return;
    }

    if (cleanPin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    try {
      setLoading(true);

      const wedding = await joinWeddingByPin(cleanPin);

      if (!wedding) {
        setError("Invalid wedding PIN");
        return;
      }

      await addMemberToWedding({
        wedding_id: wedding.id,
        user_id: user.id,
        name:
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Member",
        email: user.email,
        role: "family",
      });

      setWeddingId(wedding.id);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to join wedding");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 text-center">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-2">Join Wedding</h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 4-digit wedding PIN to join your wedding space.
        </p>

        {error ? (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="pin"
            type="text"
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            maxLength={4}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Joining..." : "Join Wedding"}
          </Button>
        </form>
      </div>
    </div>
  );
}