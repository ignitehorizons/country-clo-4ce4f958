import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus,
  Camera,
  MapPin,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import {
  VIOLATION_RULES,
  MOCK_VIOLATIONS,
  colorForViolation,
  COLOR_BORDER,
  STATUS_LABEL,
  STATUS_BADGE,
  formatDate,
  nextMockNumber,
  newDraftId,
  type Violation,
  type ViolationPhoto,
  type ViolationStatus,
} from "@/lib/violationsMock";

const STATUS_FILTERS: (ViolationStatus | "All" | "Open")[] = [
  "All",
  "Open",
  "Draft",
  "InCure",
  "Escalated",
  "Closed",
];

export const CC_Violations = () => {
  const [violations, setViolations] = useState<Violation[]>(MOCK_VIOLATIONS);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [formOpen, setFormOpen] = useState(false);

  const filtered = useMemo(() => {
    if (statusFilter === "All") return violations;
    if (statusFilter === "Open")
      return violations.filter(
        (v) => !["Closed", "Dismissed", "Voided", "Draft"].includes(v.status),
      );
    return violations.filter((v) => v.status === statusFilter);
  }, [violations, statusFilter]);

  const stats = useMemo(() => {
    const open = violations.filter(
      (v) => !["Closed", "Dismissed", "Voided", "Draft"].includes(v.status),
    ).length;
    const inCure = violations.filter((v) => v.status === "InCure").length;
    const overdue = violations.filter((v) => colorForViolation(v) === "red").length;
    const drafts = violations.filter((v) => v.status === "Draft").length;
    return { open, inCure, overdue, drafts };
  }, [violations]);

  const handleSubmit = (v: Violation) => {
    setViolations((prev) => [v, ...prev]);
    setFormOpen(false);
    toast.success(`Violation ${v.violation_number} issued`, {
      description: "Notice queued for delivery to the owner.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-display text-bark mb-2">CAM Violations</h1>
          <p className="text-lg text-text-light font-body">
            Draft, issue, and track community rule violations
          </p>
        </div>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white hover:bg-primary-light">
              <Plus className="w-4 h-4 mr-2" /> New Violation
            </Button>
          </DialogTrigger>
          <NewViolationDialog onSubmit={handleSubmit} />
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Open" value={stats.open} icon={<ClipboardList className="w-5 h-5" />} />
        <StatCard label="In Cure" value={stats.inCure} icon={<Clock className="w-5 h-5" />} />
        <StatCard
          label="Past Deadline"
          value={stats.overdue}
          icon={<AlertTriangle className="w-5 h-5" />}
          tone="red"
        />
        <StatCard label="Drafts" value={stats.drafts} icon={<Plus className="w-5 h-5" />} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              statusFilter === f
                ? "bg-primary text-white"
                : "bg-cream text-text-light hover:bg-light-gray"
            }`}
          >
            {f === "InCure" ? "In Cure" : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="border-border shadow-xs overflow-hidden">
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-3 border-b border-border bg-cream/50 text-xs font-bold text-text-light uppercase tracking-wide">
            <div className="col-span-2">Number</div>
            <div className="col-span-3">Rule</div>
            <div className="col-span-3">Address</div>
            <div className="col-span-2">Cure Deadline</div>
            <div className="col-span-2">Status</div>
          </div>
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-text-light">
              No violations match this filter.
            </div>
          ) : (
            filtered.map((v) => {
              const color = colorForViolation(v);
              return (
                <div
                  key={v.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 px-6 py-4 border-b border-border border-l-4 ${COLOR_BORDER[color]} hover:bg-cream/40 transition-colors`}
                >
                  <div className="col-span-2 flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${colorForViolation(v) === "green" ? "bg-green-500" : colorForViolation(v) === "yellow" ? "bg-yellow-500" : colorForViolation(v) === "red" ? "bg-red-500" : colorForViolation(v) === "blue" ? "bg-sky-500" : "bg-gray-400"}`}
                    />
                    <span className="font-bold text-bark text-sm">
                      {v.violation_number ?? v.draft_id}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <div className="font-bold text-bark text-sm">{v.citation || "—"}</div>
                    <div className="text-xs text-text-light line-clamp-1">
                      {v.rule_text_snapshot || "Unassigned rule"}
                    </div>
                  </div>
                  <div className="col-span-3 text-sm text-text">
                    {v.address || "—"}
                    {v.owner_name && <div className="text-xs text-text-light">{v.owner_name}</div>}
                  </div>
                  <div className="col-span-2 text-sm text-text-light">
                    {formatDate(v.cure_deadline)}
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline" className={STATUS_BADGE[v.status]}>
                      {STATUS_LABEL[v.status]}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone?: "red";
}) {
  return (
    <Card className="border-border shadow-xs">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`h-11 w-11 rounded-full flex items-center justify-center ${
            tone === "red" ? "bg-red-50 text-red-600" : "bg-cream text-primary"
          }`}
        >
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold font-display text-bark">{value}</div>
          <div className="text-xs text-text-light font-body">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// New Violation form (spec §3) — camera + GPS via browser APIs, mock submit.
// =============================================================================

interface NewViolationProps {
  onSubmit: (v: Violation) => void;
}

function NewViolationDialog({ onSubmit }: NewViolationProps) {
  const [address, setAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [otherRule, setOtherRule] = useState("");
  const [narrative, setNarrative] = useState("");
  const [photos, setPhotos] = useState<ViolationPhoto[]>([]);
  const [gps, setGps] = useState<{ lat: number; lng: number; acc: number } | null>(null);
  const [capturingGps, setCapturingGps] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedRule = VIOLATION_RULES.find((r) => r.id === ruleId) || null;
  const statutoryWarn = selectedRule?.statutory_block;

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    Array.from(files)
      .slice(0, 6)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotos((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              thumb: reader.result as string,
              captured_at: new Date().toISOString(),
              lat: gps?.lat,
              lng: gps?.lng,
              phase: "initial",
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
  };

  const captureGps = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      toast.error("Geolocation is not available on this device.");
      return;
    }
    setCapturingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          acc: Math.round(pos.coords.accuracy),
        });
        setCapturingGps(false);
        toast.success("GPS location captured");
      },
      () => {
        setCapturingGps(false);
        toast.error("Could not capture GPS. Check location permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const canSubmit = !!address && (!!ruleId || !!otherRule) && !!narrative;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const rule = selectedRule;
    const number = nextMockNumber();
    const submittedAt = new Date().toISOString();
    const cureDays = rule?.cure_days ?? 14;
    const cureDeadline = new Date(Date.now() + cureDays * 86400000).toISOString();
    const v: Violation = {
      id: crypto.randomUUID(),
      violation_number: number,
      draft_id: newDraftId(),
      status: "Issued",
      address,
      owner_name: ownerName || "Unassigned / Pending ID",
      owner_phone: ownerPhone,
      owner_email: ownerEmail,
      rule_id: rule?.id ?? "",
      citation: rule?.citation ?? "Other",
      rule_text_snapshot: rule?.rule_text ?? otherRule,
      narrative,
      lat: gps?.lat,
      lng: gps?.lng,
      gps_accuracy_m: gps?.acc,
      issued_by_name: "Jeremy Sidlauskas",
      cam_license_no: "CAM-FL-9982",
      created_at: submittedAt,
      submitted_at: submittedAt,
      delivered_at: null,
      cure_days: cureDays,
      cure_deadline: cureDeadline,
      paused: false,
      pause_reason: null,
      closed_at: null,
      photos,
    };
    onSubmit(v);
  };

  return (
    <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto bg-white">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl text-bark">New Violation</DialogTitle>
      </DialogHeader>

      <form onSubmit={submit} className="space-y-5 mt-2">
        {/* Owner / address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label className="text-bark font-bold">Property Address *</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 1842 Country Close Dr"
              className="border-border bg-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-bark font-bold">Owner Name</Label>
            <Input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Owner or Unassigned / Pending ID"
              className="border-border bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-bark font-bold">Owner Phone</Label>
            <Input
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              placeholder="(813) 555-0000"
              className="border-border bg-white"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="text-bark font-bold">Owner Email</Label>
            <Input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              placeholder="owner@example.com"
              className="border-border bg-white"
            />
          </div>
        </div>

        {/* Nature of violation — type-ahead via select + Other */}
        <div className="space-y-2">
          <Label className="text-bark font-bold">Nature of Violation *</Label>
          <Select value={ruleId} onValueChange={setRuleId}>
            <SelectTrigger className="border-border bg-white">
              <SelectValue placeholder="Select a rule…" />
            </SelectTrigger>
            <SelectContent>
              {VIOLATION_RULES.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.citation} — {r.rule_text}
                </SelectItem>
              ))}
              <SelectItem value="__other">Other (free text)</SelectItem>
            </SelectContent>
          </Select>
          {ruleId === "__other" && (
            <Input
              value={otherRule}
              onChange={(e) => setOtherRule(e.target.value)}
              placeholder="Describe the violation"
              className="border-border bg-white"
              required
            />
          )}
          {statutoryWarn && (
            <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                This rule is statutorily restricted: {selectedRule?.statutory_note} Fines may be
                blocked — review with counsel before issuing.
              </span>
            </div>
          )}
        </div>

        {/* Narrative */}
        <div className="space-y-2">
          <Label className="text-bark font-bold">Narrative *</Label>
          <Textarea
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            placeholder="Describe what was observed…"
            className="min-h-[100px] border-border bg-white"
            required
          />
        </div>

        {/* GPS */}
        <div className="space-y-2">
          <Label className="text-bark font-bold">GPS Location</Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={captureGps}
              disabled={capturingGps}
              className="border-border"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {capturingGps ? "Capturing…" : "Capture GPS"}
            </Button>
            {gps && (
              <span className="text-sm text-text-light">
                {gps.lat.toFixed(5)}, {gps.lng.toFixed(5)} (±{gps.acc}m)
              </span>
            )}
          </div>
        </div>

        {/* Photos — camera capture */}
        <div className="space-y-2">
          <Label className="text-bark font-bold">Evidence Photos</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => handlePhotos(e.target.files)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-lg p-6 text-center bg-cream/30 hover:bg-cream/50 transition-colors"
          >
            <Camera className="w-6 h-6 mx-auto text-text-light mb-2" />
            <span className="text-sm text-text-light">
              Tap to take or upload photos (stamps GPS + timestamp)
            </span>
          </button>
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {photos.map((p) => (
                <div key={p.id} className="relative">
                  <img
                    src={p.thumb}
                    alt="Evidence"
                    className="h-16 w-16 object-cover rounded-md border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotos((prev) => prev.filter((x) => x.id !== p.id))}
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                    aria-label="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Signature / attestation */}
        <div className="bg-cream/50 border border-border rounded-lg p-4 text-sm text-text">
          <div className="flex items-center gap-2 font-bold text-bark mb-1">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Issued by Jeremy Sidlauskas, CAM
            License #CAM-FL-9982
          </div>
          <p className="text-text-light">
            Submitting issues an official violation number and queues the notice for delivery.
            Post-submit edits become logged amendments.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary-light"
          size="lg"
          disabled={!canSubmit}
        >
          Issue Violation
        </Button>
      </form>
    </DialogContent>
  );
}

export default CC_Violations;
