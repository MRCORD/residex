import PlaceholderPage from "@/components/PlaceholderPage";
import { AlertTriangle } from "lucide-react";

export default function IncidentsPage() {
  return (
    <PlaceholderPage
      title="Incident Management"
      description="View, filter, and manage all building incidents. Track resolution progress and assign teams."
      icon={AlertTriangle}
    />
  );
}
