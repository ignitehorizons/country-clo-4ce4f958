import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialAlerts = [
  {
    id: 1,
    type: "Wrong Address",
    time: "2 hours ago",
    title: "Package at 22 Country Close Dr",
    description: "Amazon box addressed to #6 was delivered to my door. I have it safe inside.",
    postedBy: "Linda R.",
    expiresIn: null,
    claimed: false,
  },
  {
    id: 2,
    type: "Porch Alert",
    time: "5 hours ago",
    title: "Large box left unattended at #14",
    description:
      "Saw a large package left on the porch at #14. Homeowners appear to be away. Just a heads up.",
    postedBy: "Tom K.",
    expiresIn: null,
    claimed: false,
  },
  {
    id: 3,
    type: "Wrong Address",
    time: "Yesterday",
    title: "FedEx envelope for #3",
    description:
      "Got a FedEx envelope meant for house #3. Will leave on my porch for pickup or I can drop it off.",
    postedBy: "Sarah M.",
    expiresIn: null,
    claimed: false,
  },
  {
    id: 4,
    type: "Claimed",
    time: "2 days ago",
    title: "Package claimed — #18",
    description: "Package has been retrieved by the homeowner. Thanks for looking out!",
    postedBy: "Jeremy S.",
    expiresIn: null,
    claimed: true,
  },
  {
    id: 5,
    type: "Porch Alert",
    time: "3 days ago",
    title: "Multiple boxes at #9",
    description:
      "Three packages sitting on porch at #9 since this morning. Not sure if anyone is home.",
    postedBy: "Mike J.",
    expiresIn: "1h",
    claimed: false,
  },
];

export function CC_Packages() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleClaim = (id: number) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, type: "Claimed", claimed: true } : alert,
      ),
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-bark">Package Alerts</h1>
          <p className="text-text-light mt-1">
            Help neighbors with misdelivered or at-risk packages
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent-hover text-white rounded-full px-6 font-bold">
              + Report a Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-bark">
                Report a Package
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select defaultValue="Wrong Address">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wrong Address">Wrong Address</SelectItem>
                    <SelectItem value="Left on Porch">Left on Porch</SelectItem>
                    <SelectItem value="Suspicious Delivery">Suspicious Delivery</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Address involved <span className="text-[#C0392B]">*</span>
                </Label>
                <Input placeholder="E.g. 14 Country Close Dr" />
              </div>

              <div className="space-y-2">
                <Label>
                  Description <span className="text-[#C0392B]">*</span>
                </Label>
                <Textarea
                  placeholder="Provide details about the package and situation..."
                  className="h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Photo (Optional)</Label>
                <Input type="file" accept="image/*" />
              </div>

              <p className="text-sm text-text-light italic mt-2">
                This post will automatically expire in 72 hours.
              </p>

              <Button className="w-full bg-primary hover:bg-primary-light text-white font-bold mt-4">
                Submit Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-w-[700px] space-y-3">
        {alerts.map((alert) => {
          let badgeColor = "#E8A020";
          let badgeTextColor = "#4A3728";
          let borderColor = "#E8A020";

          if (alert.type === "Porch Alert") {
            badgeColor = "#C0392B";
            badgeTextColor = "#FFFFFF";
            borderColor = "#C0392B";
          } else if (alert.type === "Claimed") {
            badgeColor = "#2D5016";
            badgeTextColor = "#FFFFFF";
            borderColor = "#2D5016";
          }

          return (
            <div
              key={alert.id}
              className="bg-white rounded-xl p-5 border border-border shadow-xs"
              style={{ borderLeft: `4px solid ${borderColor}` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: badgeColor,
                      color: badgeTextColor,
                    }}
                  >
                    {alert.type} {alert.type === "Claimed" && "✓"}
                  </span>
                  {alert.expiresIn && !alert.claimed && (
                    <span className="text-[11px] font-bold text-earth">
                      Expires in {alert.expiresIn}
                    </span>
                  )}
                </div>
                <span className="text-xs text-text-light">{alert.time}</span>
              </div>

              <h3 className="font-bold text-base text-bark">{alert.title}</h3>
              <p className="text-sm text-text mt-1.5 leading-relaxed">{alert.description}</p>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/50">
                <span className="text-xs text-text-light">Posted by: {alert.postedBy}</span>
                {!alert.claimed && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs font-bold rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => handleClaim(alert.id)}
                  >
                    Mark as Claimed
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
