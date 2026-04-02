import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children, title }) {
  // 🔥 Close on ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-5 shadow-lg z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}