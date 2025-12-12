import { getIncidents, resolveIncident } from "./admin-actions";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Wrench,
  Flame,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Users,
  Plus,
  UserPlus,
  Calendar,
  Building2,
  Zap,
  Timer,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import PhoneMockup from "@/components/PhoneMockup";

export default async function Home() {
  const incidents = await getIncidents();

  // Calculate stats
  const openIncidents = incidents.filter((i) => i.status === "Open").length;
  const criticalIncidents = incidents.filter(
    (i) => i.priority === "High" && i.status === "Open"
  ).length;
  const resolvedToday = incidents.filter((i) => i.status === "Resolved").length;

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "priority-critical";
      case "Medium":
        return "priority-warning";
      case "Pending":
        return "priority-info";
      default:
        return "priority-success";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Fire":
        return <Flame className="w-5 h-5" />;
      case "Security":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Fire":
        return "bg-red-500/20 text-red-400";
      case "Security":
        return "bg-amber-500/20 text-amber-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <DashboardLayout>
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="stats-value text-amber-400">{openIncidents}</p>
                <p className="stats-label">Open Incidents</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <TrendingUp className="w-3 h-3" />
              <span>+2</span>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="stats-value text-red-400">{criticalIncidents}</p>
                <p className="stats-label">Critical</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-400">
              <TrendingDown className="w-3 h-3" />
              <span>-1</span>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="stats-value text-emerald-400">{resolvedToday}</p>
                <p className="stats-label">Resolved Today</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>+12%</span>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="stats-value text-indigo-400">847</p>
                <p className="stats-label">Total Residents</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-indigo-400">
              <TrendingUp className="w-3 h-3" />
              <span>+3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Response Time Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Quick Actions */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors text-sm text-[var(--foreground)]">
              <Plus className="w-4 h-4 text-indigo-400" />
              New Incident
            </button>
            <button className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors text-sm text-[var(--foreground)]">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              Add Resident
            </button>
            <button className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors text-sm text-[var(--foreground)]">
              <Calendar className="w-4 h-4 text-purple-400" />
              Schedule
            </button>
            <button className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors text-sm text-[var(--foreground)]">
              <Building2 className="w-4 h-4 text-cyan-400" />
              Building
            </button>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <Timer className="w-4 h-4 text-emerald-400" />
            Avg. Response Time
          </h3>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-4xl font-bold text-[var(--foreground)]">4.2</p>
              <p className="text-sm text-[var(--foreground-muted)]">minutes</p>
            </div>
            <div className="flex-1 h-16 flex items-end gap-1">
              {[65, 45, 80, 55, 70, 40, 85].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-500/30 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            18% faster than last week
          </p>
        </div>

        {/* Team on Duty */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Team on Duty
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                MR
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">
                  Mike Rodriguez
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  Security Lead
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                SC
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">
                  Sarah Chen
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  Maintenance
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                JT
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">
                  James Taylor
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  Front Desk
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Incident Panel */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Command Center
              </h2>
              <p className="text-sm text-[var(--foreground-muted)]">
                Real-time incident monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)]">
            <span className="w-2 h-2 rounded-full bg-indigo-400 live-indicator"></span>
            <span className="text-sm font-medium text-[var(--foreground-muted)]">
              Live Feed
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-medium text-[var(--foreground)]">
                All Clear
              </h3>
              <p className="text-[var(--foreground-muted)]">
                No active incidents at this time
              </p>
            </div>
          ) : (
            incidents.map((incident) => (
              <div
                key={incident.id}
                className={`incident-card ${getPriorityClass(incident.priority)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getTypeColor(incident.type)}`}
                    >
                      {getTypeIcon(incident.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[var(--foreground)] truncate">
                          {incident.type} Issue
                        </h3>
                        <span className="text-[var(--foreground-muted)]">•</span>
                        <span className="text-sm text-[var(--foreground-muted)]">
                          {incident.location}
                        </span>
                      </div>
                      <p className="text-[var(--foreground-muted)] text-sm mb-3 line-clamp-2">
                        {incident.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[var(--foreground-subtle)]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(incident.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span>ID: #{incident.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`badge ${incident.status === "Resolved"
                          ? "badge-success"
                          : incident.priority === "High"
                            ? "badge-critical"
                            : incident.priority === "Medium"
                              ? "badge-warning"
                              : "badge-info"
                        }`}
                    >
                      {incident.status === "Resolved" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Resolved
                        </>
                      ) : (
                        incident.priority
                      )}
                    </span>
                    {incident.status !== "Resolved" && (
                      <form action={resolveIncident.bind(null, incident.id)}>
                        <button
                          type="submit"
                          className="w-9 h-9 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center transition-colors group"
                          title="Mark as Resolved"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Collapsible Phone Mockup */}
      <PhoneMockup />
    </DashboardLayout>
  );
}
