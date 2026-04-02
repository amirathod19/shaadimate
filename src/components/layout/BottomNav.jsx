import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    path: "/dashboard",
    icon: "🏠",
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: "✅",
  },
  {
    label: "Events",
    path: "/events",
    icon: "📅",
  },
  {
    label: "Members",
    path: "/members",
    icon: "👥",
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: "💸",
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex min-w-[56px] flex-col items-center justify-center rounded-xl px-3 py-2 text-xs transition ${
                isActive
                  ? "bg-[#f3e5dc] text-[#b08968]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}