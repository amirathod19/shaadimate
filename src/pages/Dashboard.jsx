import PageWrapper from "../components/layout/PageWrapper";
import WeddingHeader from "../components/dashboard/WeddingHeader";
import BudgetCard from "../components/dashboard/BudgetCard";
import TaskSummaryCard from "../components/dashboard/TaskSummaryCard";
import UpcomingEventsCard from "../components/dashboard/UpcomingEventsCard";
import { useWedding } from "../context/WeddingContext";
import useEvents from "../hooks/useEvents";
import useExpenses from "../hooks/useExpenses";

export default function Dashboard() {
  const { weddingId, wedding } = useWedding();
  const { events } = useEvents(weddingId);
  const { expenses } = useExpenses(weddingId);

  return (
    <PageWrapper title="Dashboard">
      <div className="space-y-6">
        <WeddingHeader />
        <UpcomingEventsCard />
        <TaskSummaryCard />
        <BudgetCard events={events} expenses={expenses} />
      </div>
    </PageWrapper>
  );
}

// import PageWrapper from "../components/layout/PageWrapper";
// import WeddingHeader from "../components/dashboard/WeddingHeader";
// import BudgetCard from "../components/dashboard/BudgetCard";
// import TaskSummaryCard from "../components/dashboard/TaskSummaryCard";
// import UpcomingEventsCard from "../components/dashboard/UpcomingEventsCard";
// import { useWedding } from "../context/WeddingContext";
// import useEvents from "../hooks/useEvents";
// import useExpenses from "../hooks/useExpenses";

// export default function Dashboard() {
//   const { weddingId, wedding } = useWedding();
//   const { events } = useEvents(weddingId);
//   const { expenses } = useExpenses(weddingId);

//   return (
//     <PageWrapper title="Dashboard">
//       <div className="space-y-6">
//         <WeddingHeader wedding={wedding} />

//         <BudgetCard events={events} expenses={expenses} />

//         <TaskSummaryCard />

//         <UpcomingEventsCard />
//       </div>
//     </PageWrapper>
//   );
// }

// import PageWrapper from "../components/layout/PageWrapper";
// import WeddingHeader from "../components/dashboard/WeddingHeader";
// import BudgetCard from "../components/dashboard/BudgetCard";
// import TaskSummaryCard from "../components/dashboard/TaskSummaryCard";
// import UpcomingEventsCard from "../components/dashboard/UpcomingEventsCard";
// import { useWedding } from "../context/WeddingContext";

// export default function Dashboard() {
//   const { weddingId, loading } = useWedding();

//   if (loading) {
//     return (
//       <PageWrapper title="Dashboard">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
//           <p className="text-sm text-gray-500">Loading dashboard...</p>
//         </div>
//       </PageWrapper>
//     );
//   }

//   if (!weddingId) {
//     return (
//       <PageWrapper title="Dashboard">
//         <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-2xl p-4">
//           Please join or create a wedding first.
//         </div>
//       </PageWrapper>
//     );
//   }

//   return (
//     <PageWrapper title="Dashboard">
//       <div className="space-y-6">
//         <WeddingHeader />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <BudgetCard />
//           <TaskSummaryCard />
//         </div>

//         <UpcomingEventsCard />
//       </div>
//     </PageWrapper>
//   );
// }