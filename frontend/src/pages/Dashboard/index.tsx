import WelcomeCard from "@/components/dashboard/WelcomeCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentDocuments from "@/components/dashboard/RecentDocuments";

function DashboardPage() {
  return (
    <div className="space-y-8">

      <WelcomeCard />

      <div className="grid gap-8 lg:grid-cols-2">

        <RecentDocuments />

        <QuickActions />

      </div>

    </div>
  );
}

export default DashboardPage;