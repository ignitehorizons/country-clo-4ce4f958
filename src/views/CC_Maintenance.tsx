import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Lightbulb, Leaf, Car, Wrench, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CC_LazyMap as CC_Map } from "@/components/CC_LazyMap";
import communityConfig from "@/config/communityConfig";

type RequestStatus = "Submitted" | "In Progress" | "Completed" | "Closed";

interface Request {
  id: string;
  status: RequestStatus;
  category: string;
  title: string;
  description: string;
  submittedBy: string;
  date: string;
  lastUpdated: string;
  urgency?: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Lighting: <Lightbulb className="w-3 h-3 mr-1" />,
  Landscaping: <Leaf className="w-3 h-3 mr-1" />,
  "Roads & Drainage": <Car className="w-3 h-3 mr-1" />,
  General: <Wrench className="w-3 h-3 mr-1" />,
};

const REQUESTS: Request[] = [
  {
    id: "# CC-001",
    status: "Submitted",
    category: "Lighting",
    title: "Entrance pillar — left side",
    description:
      "The light on the left stone pillar at the entrance has been out for 3 days. Dark at night and safety concern.",
    submittedBy: "Jeremy S.",
    date: "Apr 8",
    lastUpdated: "Apr 8",
  },
  {
    id: "# CC-002",
    status: "In Progress",
    category: "Landscaping",
    title: "Common area — overgrown hedges",
    description:
      "Hedges along the south fence are overgrown and blocking sightlines at the entrance.",
    submittedBy: "Sarah M.",
    date: "Apr 5",
    lastUpdated: "Apr 6",
  },
  {
    id: "# CC-003",
    status: "In Progress",
    category: "Roads & Drainage",
    title: "Pothole near cul-de-sac",
    description: "Pothole developing at the cul-de-sac turn. Getting worse after recent rain.",
    submittedBy: "Tom K.",
    date: "Apr 3",
    lastUpdated: "Apr 4",
  },
  {
    id: "# CC-004",
    status: "Submitted",
    category: "General",
    title: "Speed bump sign faded",
    description: "Speed bump warning sign near house 18 is faded and hard to see at night.",
    submittedBy: "Linda R.",
    date: "Apr 1",
    lastUpdated: "Apr 1",
  },
  {
    id: "# CC-005",
    status: "Completed",
    category: "Lighting",
    title: "Street light — Oak Lane",
    description: "Street light at the bend on Oak Lane was out. Has been repaired and tested.",
    submittedBy: "Mike J.",
    date: "Mar 28",
    lastUpdated: "Mar 30",
  },
  {
    id: "# CC-006",
    status: "Completed",
    category: "Landscaping",
    title: "Entrance tree trimming",
    description: "Large oak branch hanging low over the entrance road. Trimmed and cleared.",
    submittedBy: "Admin",
    date: "Mar 20",
    lastUpdated: "Mar 22",
  },
];

const STATUS_COLORS: Record<RequestStatus, string> = {
  Submitted: "#6BA3BE",
  "In Progress": "#F39C12",
  Completed: "#2D5016",
  Closed: "#7A6A5A",
};

const CATEGORIES = ["Lighting", "Landscaping", "Roads & Drainage", "General"];

export function CC_Maintenance() {
  const [activeTab, setActiveTab] = useState<"All" | RequestStatus>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<string>("");
  const [duplicateWarning, setDuplicateWarning] = useState<Request | null>(null);
  const [submitAnyway, setSubmitAnyway] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const filteredRequests = REQUESTS.filter((r) => activeTab === "All" || r.status === activeTab);

  const counts = {
    Submitted: REQUESTS.filter((r) => r.status === "Submitted").length,
    "In Progress": REQUESTS.filter((r) => r.status === "In Progress").length,
    Completed: REQUESTS.filter((r) => r.status === "Completed").length,
    Closed: REQUESTS.filter((r) => r.status === "Closed").length,
  };

  useEffect(() => {
    if (requestType && !submitAnyway) {
      setIsChecking(true);

      const timer = setTimeout(() => {
        setIsChecking(false);
        const duplicate = REQUESTS.find(
          (r) =>
            (r.status === "Submitted" || r.status === "In Progress") && r.category === requestType,
        );
        if (duplicate) {
          setDuplicateWarning(duplicate);
        } else {
          setDuplicateWarning(null);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [requestType, submitAnyway]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRequestType("");
    setDuplicateWarning(null);
    setSubmitAnyway(false);
    setSelectedLocation(null);
  };

  return (
    <div className="flex flex-col min-h-full pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-8 pt-8 pb-6 max-w-[900px] mx-auto w-full">
        <div>
          <h1 className="text-3xl font-display font-bold text-bark mb-2">Maintenance Requests</h1>
          <p className="text-text-light font-body">Community maintenance tracking and requests</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-accent-hover text-white rounded-full px-6 py-2 h-auto font-body font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 mr-2" />
          Submit Request
        </Button>
      </div>

      {/* STATUS SUMMARY BAR */}
      <div className="px-8 pb-6 max-w-[900px] mx-auto w-full">
        <div className="flex flex-wrap gap-3">
          <div className="bg-white rounded-full px-4 py-1.5 border border-border inline-flex items-center gap-2 shadow-xs">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS["Submitted"] }}
            ></div>
            <span className="font-body font-bold text-[14px] text-bark">{counts["Submitted"]}</span>
            <span className="font-body font-normal text-[13px] text-text-light">Submitted</span>
          </div>

          <div className="bg-white rounded-full px-4 py-1.5 border border-border inline-flex items-center gap-2 shadow-xs">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS["In Progress"] }}
            ></div>
            <span className="font-body font-bold text-[14px] text-bark">
              {counts["In Progress"]}
            </span>
            <span className="font-body font-normal text-[13px] text-text-light">In Progress</span>
          </div>

          <div className="bg-white rounded-full px-4 py-1.5 border border-border inline-flex items-center gap-2 shadow-xs">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS["Completed"] }}
            ></div>
            <span className="font-body font-bold text-[14px] text-bark">{counts["Completed"]}</span>
            <span className="font-body font-normal text-[13px] text-text-light">Completed</span>
          </div>

          <div className="bg-white rounded-full px-4 py-1.5 border border-border inline-flex items-center gap-2 shadow-xs">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS["Closed"] }}
            ></div>
            <span className="font-body font-bold text-[14px] text-bark">{counts["Closed"]}</span>
            <span className="font-body font-normal text-[13px] text-text-light">Closed</span>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="px-8 pb-6 max-w-[900px] mx-auto w-full">
        <div className="flex flex-wrap gap-2">
          {(["All", "Submitted", "In Progress", "Completed", "Closed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full font-body text-[14px] font-bold transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-text-light hover:bg-light-gray border border-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* REQUEST FEED */}
      <div className="px-8 max-w-[900px] mx-auto w-full">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-[12px] p-6 mb-4 shadow-xs"
            style={{
              border: "1px solid #DDD5C8",
              borderLeft: `4px solid ${STATUS_COLORS[req.status]}`,
            }}
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="font-body font-bold text-[12px] text-text-light">{req.id}</span>
                <span className="flex items-center px-2.5 py-1 rounded-full bg-light-gray font-body font-bold text-[11px] text-bark">
                  {CATEGORY_ICONS[req.category]} {req.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-1 rounded-full font-body font-bold text-[11px]"
                  style={{
                    backgroundColor: `${STATUS_COLORS[req.status]}20`,
                    color: STATUS_COLORS[req.status],
                  }}
                >
                  {req.status}
                </span>
                <span className="font-body text-[12px] text-text-light">{req.date}</span>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="mb-4">
              <h3 className="font-body font-bold text-[16px] text-bark">{req.title}</h3>
              <p className="font-body text-[14px] text-text leading-normal mt-2 line-clamp-2">
                {req.description}
              </p>
            </div>

            {/* BOTTOM ROW */}
            <div className="border-t border-[#F0EDE8] pt-3 flex justify-between items-center">
              <div className="font-body text-[12px] text-text-light flex items-center gap-2">
                <span>Submitted by {req.submittedBy}</span>
                {req.urgency && (
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px] uppercase">
                    {req.urgency}
                  </span>
                )}
              </div>
              <div className="font-body text-[12px] text-text-light">
                Last updated: {req.lastUpdated}
              </div>
            </div>
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-text-light font-body">
            No requests found for this filter.
          </div>
        )}
      </div>

      {/* SUBMIT MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="font-display font-bold text-2xl text-bark">
                Submit Maintenance Request
              </DialogTitle>
              <DialogDescription className="font-body text-text-light">
                Report an issue in the community areas.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="font-body font-bold text-bark">
                  Request Type
                </Label>
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <div className="flex items-center">
                          {CATEGORY_ICONS[cat]} {cat}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {duplicateWarning && !submitAnyway && (
                <div
                  className="p-4 mb-5"
                  style={{
                    backgroundColor: "rgba(232,160,32,0.1)",
                    borderLeft: "4px solid #E8A020",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  <div className="font-body font-bold text-[14px] text-earth mb-2">
                    ⚠️ It looks like a similar request may already be open.
                  </div>
                  <div className="bg-white/50 p-3 rounded border border-[#E8A020]/20 mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[12px] text-bark">{duplicateWarning.id}</span>
                      <span className="text-[11px] text-text-light">{duplicateWarning.date}</span>
                    </div>
                    <div className="text-[13px] text-bark truncate">{duplicateWarning.title}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="font-body font-bold text-[13px] h-8 border-earth text-earth hover:bg-earth hover:text-white"
                    >
                      View Existing Request
                    </Button>
                    <button
                      onClick={() => setSubmitAnyway(true)}
                      className="font-body text-[13px] text-text-light hover:text-bark underline"
                    >
                      I understand this is a different issue
                    </button>
                  </div>
                </div>
              )}

              <div
                className={`space-y-4 transition-opacity ${duplicateWarning && !submitAnyway ? "opacity-50 pointer-events-none" : "opacity-100"}`}
              >
                <div className="space-y-2">
                  <Label className="font-body font-bold text-bark">
                    Pinpoint Location (Optional)
                  </Label>
                  <p className="text-xs text-text-light mb-2">
                    Click on the map to drop a pin where the issue is located.
                  </p>
                  <CC_Map
                    height="200px"
                    interactive={true}
                    onMapClick={(lat, lng) => setSelectedLocation({ lat, lng })}
                    pins={
                      selectedLocation
                        ? [
                            {
                              id: "selected",
                              lat: selectedLocation.lat,
                              lng: selectedLocation.lng,
                              color: communityConfig.brandColors.accent,
                            },
                          ]
                        : []
                    }
                  />
                  {selectedLocation && (
                    <div className="flex items-center gap-2 text-xs text-primary mt-2">
                      <MapPin className="w-3 h-3" /> Location pinned successfully
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="font-body font-bold text-bark">
                    Location / Title
                  </Label>
                  <Input id="title" placeholder="e.g. Broken sprinkler near clubhouse" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-body font-bold text-bark">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about the issue..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-light-gray/50 border-t border-border flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={handleModalClose}
              className="font-body font-bold text-text-light hover:text-bark"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary-light text-white font-body font-bold px-6"
              disabled={!requestType || isChecking || (!!duplicateWarning && !submitAnyway)}
              onClick={handleModalClose}
            >
              {isChecking ? "Checking for duplicates..." : "Submit Request"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
