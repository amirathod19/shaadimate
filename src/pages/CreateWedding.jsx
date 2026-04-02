import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { useWedding } from "../context/WeddingContext";
import { createWedding } from "../services/weddingService";
import { addMemberToWedding } from "../services/memberService";
import generatePIN from "../utils/generatePIN";

export default function CreateWedding() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { weddingId, setWeddingId } = useWedding();

  const [form, setForm] = useState({
    couple_name: "",
    wedding_date: "",
    budget: "",
  });

  const [pin, setPin] = useState(generatePIN());
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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRegeneratePin() {
    setPin(generatePIN());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.couple_name.trim()) {
      setError("Couple name is required");
      return;
    }

    if (!form.wedding_date) {
      setError("Wedding date is required");
      return;
    }

    try {
      setLoading(true);

      const wedding = await createWedding({
        couple_name: form.couple_name.trim(),
        wedding_date: form.wedding_date,
        budget: Number(form.budget) || 0,
        created_by: user.id,
        pin,
      });

      await addMemberToWedding({
        wedding_id: wedding.id,
        user_id: user.id,
        name:
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Admin",
        email: user.email,
        role: "admin",
      });

      setWeddingId(wedding.id);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to create wedding");
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
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-2">Create Wedding</h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Set up your wedding workspace and invite family using the PIN.
        </p>

        {error ? (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="couple_name"
            type="text"
            placeholder="Couple name"
            value={form.couple_name}
            onChange={handleChange}
          />

          <Input
            name="wedding_date"
            type="date"
            value={form.wedding_date}
            onChange={handleChange}
          />

          <Input
            name="budget"
            type="number"
            placeholder="Total budget"
            value={form.budget}
            onChange={handleChange}
          />

          <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">Wedding PIN</p>
                <p className="text-2xl font-bold tracking-widest text-gray-900">
                  {pin}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRegeneratePin}
                className="px-3 py-2 rounded-xl bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 transition"
              >
                Regenerate
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Wedding"}
          </Button>
        </form>
      </div>
    </div>
  );
}