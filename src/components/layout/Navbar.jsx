import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useWedding } from "../../context/WeddingContext";
import { getWedding } from "../../services/weddingService";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { weddingId, leaveWedding } = useWedding();

  const [weddingName, setWeddingName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function loadWeddingName() {
      try {
        if (!weddingId) {
          setWeddingName("");
          return;
        }

        const wedding = await getWedding(weddingId);
        setWeddingName(wedding?.couple_name || "Wedding");
      } catch (error) {
        console.error("Error loading wedding name:", error);
        setWeddingName("");
      }
    }

    loadWeddingName();
  }, [weddingId]);

  async function handleLogout() {
    try {
      await logout();
      leaveWedding();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  function handleLeaveWedding() {
    leaveWedding();
    navigate("/join", { replace: true });
  }

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Events", path: "/events" },
    { name: "Members", path: "/members" },
    { name: "Expenses", path: "/expenses" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-bold text-gray-900">
            ShaadiMate
          </Link>
          {weddingName ? (
            <p className="text-xs text-gray-500">{weddingName}</p>
          ) : null}
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-[#e7bfa7] text-gray-900"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user?.email ? (
            <span className="text-sm text-gray-500">{user.email}</span>
          ) : null}

          {weddingId ? (
            <button
              type="button"
              onClick={handleLeaveWedding}
              className="px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Leave Wedding
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden px-3 py-2 rounded-xl bg-gray-100 text-sm font-medium"
        >
          Menu
        </button>
      </div>

      {menuOpen ? (
        <div className="md:hidden px-4 pb-4 border-t border-gray-100 bg-white">
          <div className="pt-3 space-y-2">
            {weddingName ? (
              <p className="text-sm font-medium text-gray-700">{weddingName}</p>
            ) : null}

            {navLinks.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                    active
                      ? "bg-[#e7bfa7] text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-gray-100">
              {user?.email ? (
                <p className="text-sm text-gray-500 mb-2">{user.email}</p>
              ) : null}

              {weddingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLeaveWedding();
                  }}
                  className="w-full mb-2 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Leave Wedding
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full px-3 py-2 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}