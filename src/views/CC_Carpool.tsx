import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MapPin, ArrowRight, User, Car, Search, CheckCircle2 } from "lucide-react";

type RideType = "Offering" | "Seeking";
type RouteType = "Regular" | "One-Time";

interface Ride {
  id: number;
  type: RideType;
  route: RouteType;
  from: string;
  to: string;
  desc: string;
  author: string;
  date: string;
}

const MOCK_RIDES: Ride[] = [
  {
    id: 1,
    type: "Offering",
    route: "Regular",
    from: "Country Close",
    to: "Downtown Tampa",
    desc: "Weekdays 8:00 AM departure, return ~5:30 PM. 2 seats available. Happy to split gas.",
    author: "Jeremy S.",
    date: "Apr 10",
  },
  {
    id: 2,
    type: "Seeking",
    route: "Regular",
    from: "Country Close",
    to: "Wesley Chapel",
    desc: "Need Mon/Wed/Fri, 6 AM shift. Will Venmo for gas.",
    author: "Tom K.",
    date: "Apr 9",
  },
  {
    id: 3,
    type: "Offering",
    route: "One-Time",
    from: "Country Close",
    to: "Tampa International Airport",
    desc: "Saturday April 19 at 6 AM. Room for 2 passengers and luggage.",
    author: "Sarah M.",
    date: "Apr 8",
  },
  {
    id: 4,
    type: "Seeking",
    route: "One-Time",
    from: "Country Close",
    to: "USF Tampa Campus",
    desc: "April 22 graduation, 9 AM. Happy to pay for the ride.",
    author: "Amy P.",
    date: "Apr 7",
  },
  {
    id: 5,
    type: "Offering",
    route: "Regular",
    from: "Country Close",
    to: "Carrollwood Publix",
    desc: "Sunday mornings ~10 AM. Happy to take a neighbor along.",
    author: "Linda R.",
    date: "Apr 5",
  },
  {
    id: 6,
    type: "Seeking",
    route: "Regular",
    from: "Country Close",
    to: "Lutz Elementary School",
    desc: "Morning drop-off carpool. 2 kids, grades 1 and 3.",
    author: "Karen C.",
    date: "Apr 3",
  },
];

const FILTERS = ["All", "Offering Rides", "Seeking Rides", "One-Time", "Regular Route"];

export function CC_Carpool() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<RideType>("Offering");
  const [routeType, setRouteType] = useState<RouteType>("Regular");

  const handlePostRide = (e: React.FormEvent) => {
    e.preventDefault();
    setPostModalOpen(false);
    toast.success("Your ride post has been published!", {
      icon: <Car className="w-4 h-4" />,
    });
  };

  const filteredRides = MOCK_RIDES.filter((ride) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Offering Rides") return ride.type === "Offering";
    if (activeFilter === "Seeking Rides") return ride.type === "Seeking";
    if (activeFilter === "One-Time") return ride.route === "One-Time";
    if (activeFilter === "Regular Route") return ride.route === "Regular";
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 pt-8 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#4A3728]">Carpool & Rides</h1>
          <p className="text-[#7A6A5A] font-body mt-1">
            Share the commute, save money, meet neighbors
          </p>
        </div>
        <Dialog open={postModalOpen} onOpenChange={setPostModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#E8A020] hover:bg-[#D4911A] text-white font-body font-bold text-sm px-6 py-2.5 rounded-full shadow-xs transition-colors whitespace-nowrap">
              + Post a Ride
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-[#F7F3ED] border-[#DDD5C8] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-[#4A3728]">
                Post a Ride
              </DialogTitle>
            </DialogHeader>

            <div className="flex rounded-lg overflow-hidden border border-[#DDD5C8] mt-4 mb-6">
              <button
                type="button"
                onClick={() => setPostType("Offering")}
                className={`flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${postType === "Offering" ? "bg-[#2D5016] text-white" : "bg-white text-[#7A6A5A] hover:bg-[#F0EDE8]"}`}
              >
                <Car className="w-4 h-4" /> Offering a Ride
              </button>
              <button
                type="button"
                onClick={() => setPostType("Seeking")}
                className={`flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${postType === "Seeking" ? "bg-[#2D5016] text-white" : "bg-white text-[#7A6A5A] hover:bg-[#F0EDE8]"}`}
              >
                <Search className="w-4 h-4" /> Seeking a Ride
              </button>
            </div>

            <form onSubmit={handlePostRide} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-2 block">Route Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="routeType"
                      checked={routeType === "Regular"}
                      onChange={() => setRouteType("Regular")}
                      className="accent-[#2D5016]"
                    />
                    <span className="text-sm text-[#4A3728]">Regular Route</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="routeType"
                      checked={routeType === "One-Time"}
                      onChange={() => setRouteType("One-Time")}
                      className="accent-[#2D5016]"
                    />
                    <span className="text-sm text-[#4A3728]">One-Time Trip</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                    From location *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                    placeholder="Starting address or neighborhood"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                    To location *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                    placeholder="Destination"
                  />
                </div>
              </div>

              {routeType === "Regular" && (
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-2 block">
                    Days of week
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-1.5 bg-white border border-[#DDD5C8] px-3 py-1.5 rounded-md cursor-pointer hover:border-[#E8A020]"
                      >
                        <input type="checkbox" className="accent-[#2D5016]" />
                        <span className="text-sm text-[#4A3728]">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {routeType === "One-Time" && (
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                    Departure date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                    Departure time
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                  />
                </div>
                {postType === "Offering" && (
                  <div>
                    <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                      Return time (optional)
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                    />
                  </div>
                )}
              </div>

              {postType === "Offering" && (
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                    Seats available
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    defaultValue="1"
                    className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-1 block">Notes</label>
                <textarea
                  rows={2}
                  className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                  placeholder="Any details neighbors should know..."
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-2 block">
                  Contact preference
                </label>
                <select className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]">
                  <option>Platform Message</option>
                  <option>Phone Number</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E8A020] hover:bg-[#D4911A] text-white font-bold py-3 rounded-full mt-4 transition-colors"
              >
                Post Ride
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3 px-8 mb-8">
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <Car className="w-4 h-4 mr-1 text-primary" /> <span className="font-bold ml-1">5</span>{" "}
          Active Offers
        </div>
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <Search className="w-4 h-4 mr-1 text-accent" /> <span className="font-bold ml-1">3</span>{" "}
          Seeking Rides
        </div>
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-1 text-primary" />{" "}
          <span className="font-bold ml-1">12</span> Successful Matches
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 px-8 mb-8">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              activeFilter === filter
                ? "bg-[#4A3728] text-white"
                : "bg-[#F0EDE8] text-[#7A6A5A] hover:bg-[#DDD5C8]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Carpool Feed */}
      <div className="max-w-[800px] mx-auto px-8 pb-8 pt-2">
        {filteredRides.map((ride) => (
          <div
            key={ride.id}
            className={`bg-white rounded-xl p-6 border border-[#DDD5C8] shadow-xs hover:shadow-md transition-shadow mb-4 border-l-4 ${
              ride.type === "Offering" ? "border-l-[#2D5016]" : "border-l-[#E8A020]"
            }`}
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`font-body font-bold text-[11px] px-2.5 py-1 rounded-full ${
                    ride.type === "Offering"
                      ? "bg-[#2D5016] text-white"
                      : "bg-[#E8A020] text-[#4A3728]"
                  }`}
                >
                  {ride.type}
                </span>
                <span className="bg-[#F0EDE8] text-[#7A6A5A] font-body font-bold text-[11px] px-2.5 py-1 rounded-full">
                  {ride.route}
                </span>
              </div>
              <span className="font-body text-[12px] text-[#7A6A5A]">{ride.date}</span>
            </div>

            {/* Route Display */}
            <div className="flex items-center gap-2 font-body font-bold text-[16px] text-[#4A3728] mt-3">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7A6A5A]" />
                {ride.from}
              </div>
              <ArrowRight className="w-4 h-4 text-[#DDD5C8] mx-1" />
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7A6A5A]" />
                {ride.to}
              </div>
            </div>

            {/* Details */}
            <p className="font-body text-[13px] text-[#7A6A5A] mt-3 leading-relaxed">{ride.desc}</p>

            {/* Bottom Row */}
            <div className="mt-5 pt-4 border-t border-[#F0EDE8] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F0EDE8] flex items-center justify-center">
                  <User className="w-3 h-3 text-[#7A6A5A]" />
                </div>
                <span className="font-body text-[12px] text-[#7A6A5A]">
                  Posted by {ride.author}
                </span>
              </div>
              <button className="border border-[#2D5016] text-[#2D5016] hover:bg-[rgba(45,80,22,0.05)] font-body font-bold text-[12px] px-4 py-1.5 rounded-full transition-colors">
                Contact
              </button>
            </div>
          </div>
        ))}
        {filteredRides.length === 0 && (
          <div className="text-center py-12 text-[#7A6A5A] font-body">
            No rides found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default CC_Carpool;
