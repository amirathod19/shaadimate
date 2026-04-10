import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#f9f5f2] pb-24">
      <Navbar />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {children}
      </div>

      <BottomNav />
    </div>
  );
}