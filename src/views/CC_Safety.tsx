import { CC_ComingSoonButton } from "@/components/CC_ComingSoonButton";
import {
  Plus,
  ShieldAlert,
  Search,
  Filter,
  Phone,
  FileText,
  AlertTriangle,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function CC_Safety() {
  const incidents = [
    {
      id: "INC-2026-012",
      title: "Suspicious Vehicle",
      location: "West Parking Lot",
      status: "Active Alert",
      date: "Apr 3, 2026",
    },
    {
      id: "INC-2026-011",
      title: "Missing Pet Report",
      location: "Block C",
      status: "Under Review",
      date: "Apr 1, 2026",
    },
    {
      id: "INC-2026-009",
      title: "Package Theft",
      location: "Building 2 Lobby",
      status: "Resolved",
      date: "Mar 25, 2026",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active Alert":
        return "bg-red-500/10 text-red-500";
      case "Under Review":
        return "bg-accent/10 text-accent";
      case "Resolved":
        return "bg-primary/10 text-primary";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Active Alert":
        return "bg-red-500";
      case "Under Review":
        return "bg-accent";
      case "Resolved":
        return "bg-primary";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* GREEN HEADER BANNER */}
      <div className="bg-primary text-primary-foreground px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Safety Center</h1>
            <p className="font-body opacity-90">
              Community safety alerts, resources, and reporting
            </p>
          </div>
          <CC_ComingSoonButton className="bg-white text-primary hover:bg-light-gray rounded-full px-6 py-2 h-auto font-body font-semibold shadow-xs">
            <Plus className="w-4 h-4 mr-2" />
            Report Incident
          </CC_ComingSoonButton>
        </div>
      </div>

      <div className="px-8 -mt-6">
        {/* 4 QUICK ACTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-body font-bold text-bark mb-1">Emergency</h3>
              <p className="text-sm text-text-light font-body">Call 911 for immediate help</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-body font-bold text-bark mb-1">Report Issue</h3>
              <p className="text-sm text-text-light font-body">Log non-emergency incidents</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-sky/10 text-sky flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-body font-bold text-bark mb-1">Watch Program</h3>
              <p className="text-sm text-text-light font-body">Join neighborhood watch</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-body font-bold text-bark mb-1">Guidelines</h3>
              <p className="text-sm text-text-light font-body">View safety protocols</p>
            </CardContent>
          </Card>
        </div>

        {/* CONTENT AREA: 2 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
          {/* LEFT COLUMN: INCIDENT LOG */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-bark">Incident Log</h2>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-xs overflow-hidden">
              <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-light-gray/30">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                  <Input
                    placeholder="Search incidents..."
                    className="pl-9 bg-white border-border rounded-full h-10 font-body text-sm"
                  />
                </div>
                <CC_ComingSoonButton
                  variant="outline"
                  className="rounded-full border-border text-bark font-body h-10 px-4 w-full sm:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </CC_ComingSoonButton>
              </div>

              <div className="divide-y divide-border">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="p-4 hover:bg-light-gray/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${getStatusColor(incident.status)}`}
                      >
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-body font-bold text-bark">{incident.title}</h3>
                        <p className="font-body text-sm text-text-light">
                          {incident.location} • {incident.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${getStatusColor(incident.status)} font-body text-xs font-bold`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${getStatusDot(incident.status)}`}
                        ></div>
                        {incident.status}
                      </span>
                      <span className="text-xs font-body text-text-light">{incident.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RESOURCES & CONTACTS */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-bark mb-4">Emergency Contacts</h2>
              <Card className="border-border shadow-xs">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-light-gray flex items-center justify-center text-bark">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-body font-bold text-bark">Local Police (Non-Emergency)</p>
                      <p className="font-body text-sm text-text-light">(555) 012-3456</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-light-gray flex items-center justify-center text-bark">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-body font-bold text-bark">Community Security</p>
                      <p className="font-body text-sm text-text-light">(555) 012-7890</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-light-gray flex items-center justify-center text-bark">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-body font-bold text-bark">Fire Department</p>
                      <p className="font-body text-sm text-text-light">(555) 012-4321</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-bark mb-4">Safety Resources</h2>
              <Card className="border-border shadow-xs">
                <CardContent className="p-4 space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-bark hover:text-primary transition-colors"
                  >
                    <FileText className="w-5 h-5 text-text-light" />
                    <span className="font-body text-sm font-semibold">Evacuation Plan 2026</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-bark hover:text-primary transition-colors"
                  >
                    <FileText className="w-5 h-5 text-text-light" />
                    <span className="font-body text-sm font-semibold">
                      Neighborhood Watch Guidelines
                    </span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-bark hover:text-primary transition-colors"
                  >
                    <FileText className="w-5 h-5 text-text-light" />
                    <span className="font-body text-sm font-semibold">
                      Disaster Preparedness Kit
                    </span>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
