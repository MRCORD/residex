import { getIncidents, submitIncident, resolveIncident } from "./actions";
import { AlertTriangle, CheckCircle, Shield, Wrench } from "lucide-react";

export default async function Home() {
  const incidents = await getIncidents();

  return (
    <main className="min-h-screen bg-gray-100">
      {/* TENANT VIEW (Mobile-ish) */}
      <div className="bg-white p-6 shadow-md border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Residex Report 📝</h1>
          <p className="text-gray-500 mb-6">Report an issue in your building instantly.</p>

          <form action={submitIncident} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
              <select name="type" className="w-full p-3 border rounded-lg bg-gray-50">
                <option value="Maintenance">Maintenance (Leak, Broken Item)</option>
                <option value="Security">Security (Suspicious Activity)</option>
                <option value="Fire">Fire / Hazard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                name="location"
                type="text"
                placeholder="e.g. Lobby, Apt 404"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Describe the issue..."
                className="w-full p-3 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* MANAGER VIEW (Dashboard) */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="text-indigo-600" />
            Command Center
          </h2>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Live Feed
          </span>
        </div>

        <div className="grid gap-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`bg-white p-4 rounded-lg shadow-sm border-l-4 flex justify-between items-center ${incident.priority === "High"
                  ? "border-red-500"
                  : incident.priority === "Medium"
                    ? "border-yellow-500"
                    : "border-blue-500"
                }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${incident.type === "Security"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                    }`}
                >
                  {incident.type === "Security" ? <AlertTriangle /> : <Wrench />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {incident.type} at {incident.location}
                  </h3>
                  <p className="text-gray-600">{incident.description}</p>
                  <div className="flex gap-2 mt-2 text-xs text-gray-400">
                    <span>{new Date(incident.createdAt).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>ID: #{incident.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${incident.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {incident.status}
                </span>
                {incident.status !== "Resolved" && (
                  <form action={resolveIncident.bind(null, incident.id)}>
                    <button className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors">
                      <CheckCircle />
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
