import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login, signup, user, loading: authLoading } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanEmail = form.email.trim().toLowerCase();
    const cleanPassword = form.password.trim();
    const cleanFullName = form.full_name.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Email and password are required");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isLogin && !cleanFullName) {
      setError("Full name is required");
      return;
    }

    try {
      setSubmitting(true);

      if (isLogin) {
        await login(cleanEmail, cleanPassword);
      } else {
        await signup(cleanEmail, cleanPassword, {
          full_name: cleanFullName,
        });
      }

      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
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
        <h1 className="text-2xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          {isLogin
            ? "Login to continue to ShaadiMate"
            : "Create your ShaadiMate account"}
        </p>

        {error ? (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              name="full_name"
              type="text"
              placeholder="Full name"
              value={form.full_name}
              onChange={handleChange}
            />
          )}

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <Button type="submit" disabled={submitting}>
            {submitting
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </Button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin((prev) => !prev);
              setError("");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}