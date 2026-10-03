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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PartyPopper, Recycle, Trash2 } from "lucide-react";

const events = [
  {
    id: 1,
    date: "Apr 3",
    title: "Platform Launch",
    icon: <PartyPopper className="inline w-3 h-3 mr-1" />,
    category: "Community",
    color: "#2D5016",
    day: 3,
  },
  {
    id: 2,
    date: "Apr 12",
    title: "Spring Cookout",
    time: "4:00 PM",
    location: "Common Area",
    category: "Community",
    color: "#2D5016",
    day: 12,
  },
  {
    id: 3,
    date: "Apr 15",
    title: "Board Check-In",
    time: "6:00 PM",
    location: "Virtual",
    category: "Governance",
    color: "#6BA3BE",
    day: 15,
  },
  {
    id: 4,
    date: "Apr 20",
    title: "Earth Day Cleanup",
    time: "9:00 AM",
    location: "Entrance",
    category: "Community",
    color: "#2D5016",
    day: 20,
  },
  {
    id: 5,
    date: "Apr 22",
    title: "Trash: Bulk Pickup",
    time: "All day",
    location: "Curbside",
    category: "Maintenance",
    color: "#E8A020",
    day: 22,
  },
  {
    id: 6,
    date: "Apr 29",
    title: "Monthly Board Meeting",
    time: "7:00 PM",
    location: "Virtual",
    category: "Governance",
    color: "#6BA3BE",
    day: 29,
  },
];

export function CC_Calendar() {
  const [view, setView] = useState("Month");

  // April 2026 starts on Wednesday (0: Sun, 1: Mon, 2: Tue, 3: Wed)
  const daysInMonth = 30;
  const startDay = 3;

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < startDay; i++) {
      cells.push(
        <div
          key={`empty-${i}`}
          className="min-h-[80px] border border-border/50 bg-light-gray/30 p-1"
        ></div>,
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === 12; // Example today
      const dayOfWeek = (startDay + i - 1) % 7;

      const dayEvents = events.filter((e) => e.day === i);
      const isRecycling = dayOfWeek === 2; // Tuesday
      const isTrash = dayOfWeek === 5; // Friday

      cells.push(
        <div
          key={`day-${i}`}
          className="min-h-[80px] border border-border p-1.5 hover:bg-light-gray/20 transition-colors cursor-pointer"
        >
          <div className="flex justify-between items-start mb-1">
            <span
              className={`text-[13px] font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-primary text-white" : "text-bark"}`}
            >
              {i}
            </span>
          </div>

          <div className="space-y-1">
            {isRecycling && (
              <div className="text-[11px] font-bold bg-[#F0EDE8] text-[#7A6A5A] px-1.5 py-0.5 rounded truncate flex items-center">
                <Recycle className="inline w-3 h-3 mr-1" /> Recycling
              </div>
            )}
            {isTrash && (
              <div className="text-[11px] font-bold bg-[#F0EDE8] text-[#7A6A5A] px-1.5 py-0.5 rounded truncate flex items-center">
                <Trash2 className="inline w-3 h-3 mr-1" /> Trash Pickup
              </div>
            )}
            {dayEvents.map((e) => (
              <div
                key={e.id}
                className="text-[11px] font-bold text-white px-1.5 py-0.5 rounded truncate flex items-center"
                style={{ backgroundColor: e.color }}
              >
                {e.icon} {e.title}
              </div>
            ))}
          </div>
        </div>,
      );
    }
    return cells;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-bark">Community Calendar</h1>
          <p className="text-text-light mt-1">Events, meetings, and important dates</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 font-bold"
            >
              + Suggest an Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-bark">
                Suggest a Community Event
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>
                  Event Name <span className="text-[#C0392B]">*</span>
                </Label>
                <Input placeholder="E.g. Summer Block Party" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Start/End Time</Label>
                  <Input placeholder="E.g. 4:00 PM - 8:00 PM" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="E.g. Cul-de-sac" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="Community">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Governance">Governance</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="What's the event about?" className="h-20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estimated attendance</Label>
                  <Input type="number" placeholder="E.g. 20" />
                </div>
                <div className="space-y-2">
                  <Label>Would you help organize?</Label>
                  <RadioGroup defaultValue="yes" className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="org-yes" />
                      <Label htmlFor="org-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="org-no" />
                      <Label htmlFor="org-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary-light text-white font-bold mt-2">
                Submit for Review
              </Button>
              <p className="text-center text-xs text-text-light italic mt-2">
                Event suggestions are reviewed by admin before being added to the calendar.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[70%] space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex bg-white rounded-lg border border-border p-1">
              <button
                className={`px-4 py-1 rounded-md text-sm font-bold ${view === "Month" ? "bg-primary text-white" : "text-text-light hover:bg-light-gray"}`}
                onClick={() => setView("Month")}
              >
                Month
              </button>
              <button
                className={`px-4 py-1 rounded-md text-sm font-bold ${view === "Week" ? "bg-primary text-white" : "text-text-light hover:bg-light-gray"}`}
                onClick={() => setView("Week")}
              >
                Week
              </button>
            </div>
            <div className="font-display font-bold text-xl text-bark flex items-center gap-4">
              <button className="text-text-light hover:text-bark">←</button>
              April 2026
              <button className="text-text-light hover:text-bark">→</button>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-7 bg-light-gray/50 border-b border-border">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-[12px] font-bold text-text-light uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">{renderCells()}</div>
          </div>
        </div>

        <div className="w-full lg:w-[30%]">
          <h2 className="font-bold text-base text-bark mb-4">Coming Up</h2>
          <div className="space-y-2.5">
            {events
              .filter((e) => e.time)
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-[10px] p-3.5 flex gap-3 shadow-xs border border-border"
                  style={{ borderLeft: `3px solid ${event.color}` }}
                >
                  <div className="flex flex-col items-center justify-center bg-light-gray rounded-lg w-[48px] h-[48px] shrink-0">
                    <span className="text-[10px] font-bold text-[#C0392B] uppercase tracking-wider">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-lg font-bold text-bark leading-none mt-0.5">
                      {event.date.split(" ")[1]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-bark truncate">{event.title}</h4>
                    <div className="flex flex-wrap gap-x-2 text-[12px] text-text-light mt-1">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-[11px] font-bold rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      RSVP
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
