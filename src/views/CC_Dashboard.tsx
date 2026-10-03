import React, { useState, useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { useAuth } from "../context/CC_AuthContext";
import {
  Wrench,
  ClipboardList,
  Users,
  AlertTriangle,
  Calendar as CalendarIcon,
  Hand,
} from "lucide-react";

export const CC_Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.firstName || "Jeremy";

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update the time every minute to keep it current
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const hour = now.getHours();
  const day = now.getDay();

  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  let dayMessage = "Welcome to Country Close. Here's what's happening today.";
  if (day === 5) dayMessage = "Happy Friday! Here's what's happening as we head into the weekend.";
  else if (day === 6)
    dayMessage = "Enjoy your weekend! Here's what's happening around the neighborhood.";
  else if (day === 0) dayMessage = "Have a relaxing Sunday. Here's a look at the week ahead.";
  else if (day === 1) dayMessage = "Welcome to a new week! Here's what's happening.";

  return (
    <div className="pb-8">
      {/* Welcome Bar */}
      <div className="mx-4 md:mx-8 mt-6 md:mt-8 p-6 md:p-8 rounded-[16px] bg-linear-to-br from-primary to-primary-light flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white shadow-md">
        <div>
          <h2 className="font-display font-bold text-[clamp(20px,2.5vw,28px)] mb-1.5 flex items-center gap-2 text-white">
            {greeting}, {firstName}! <Hand className="w-6 h-6" />
          </h2>
          <p className="font-body text-[15px] text-white/90">{dayMessage}</p>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="font-display font-bold text-[24px] text-white leading-none mb-1">
            {timeString}
          </div>
          <div className="font-body text-[13px] text-white/80">{today}</div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="px-4 md:px-8 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          <Link
            to="/portal/maintenance"
            className="bg-white rounded-[12px] p-4 md:p-5 border border-border flex flex-col items-center text-center gap-2 md:gap-3 hover:border-accent hover:shadow-xs transition-all group"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <Wrench className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-full">
              <div className="font-body font-bold text-[14px] md:text-[15px] text-bark mb-0.5 group-hover:text-primary transition-colors leading-tight">
                Maintenance
              </div>
              <div className="font-body text-[11px] md:text-[13px] text-text-light leading-tight">
                Report an issue
              </div>
            </div>
          </Link>

          <Link
            to="/portal/bulletin"
            className="bg-white rounded-[12px] p-4 md:p-5 border border-border flex flex-col items-center text-center gap-2 md:gap-3 hover:border-accent hover:shadow-xs transition-all group"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <ClipboardList className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-full">
              <div className="font-body font-bold text-[14px] md:text-[15px] text-bark mb-0.5 group-hover:text-primary transition-colors leading-tight">
                Bulletin
              </div>
              <div className="font-body text-[11px] md:text-[13px] text-text-light leading-tight">
                Share with neighbors
              </div>
            </div>
          </Link>

          <Link
            to="/portal/directory"
            className="bg-white rounded-[12px] p-4 md:p-5 border border-border flex flex-col items-center text-center gap-2 md:gap-3 hover:border-accent hover:shadow-xs transition-all group"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-full">
              <div className="font-body font-bold text-[14px] md:text-[15px] text-bark mb-0.5 group-hover:text-primary transition-colors leading-tight">
                Directory
              </div>
              <div className="font-body text-[11px] md:text-[13px] text-text-light leading-tight">
                Find neighbors
              </div>
            </div>
          </Link>

          <Link
            to="/portal/safety"
            className="bg-white rounded-[12px] p-4 md:p-5 border border-border flex flex-col items-center text-center gap-2 md:gap-3 hover:border-accent hover:shadow-xs transition-all group"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-[#C0392B]">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-full">
              <div className="font-body font-bold text-[14px] md:text-[15px] text-bark mb-0.5 group-hover:text-primary transition-colors leading-tight">
                Safety
              </div>
              <div className="font-body text-[11px] md:text-[13px] text-text-light leading-tight">
                Report incident
              </div>
            </div>
          </Link>

          <Link
            to="/portal/calendar"
            className="bg-white rounded-[12px] p-4 md:p-5 border border-border flex flex-col items-center text-center gap-2 md:gap-3 hover:border-accent hover:shadow-xs transition-all group"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <CalendarIcon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="w-full">
              <div className="font-body font-bold text-[14px] md:text-[15px] text-bark mb-0.5 group-hover:text-primary transition-colors leading-tight">
                Calendar
              </div>
              <div className="font-body text-[11px] md:text-[13px] text-text-light leading-tight">
                Upcoming events
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Two Column Content */}
      <div className="px-4 md:px-8 mt-8 flex flex-col lg:flex-row gap-6">
        {/* Left - Upcoming Events */}
        <div className="lg:w-[60%]">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-body font-bold text-[16px] text-bark">Upcoming Events</h3>
            <Link
              to="/portal/calendar"
              className="font-body font-bold text-[13px] text-primary hover:text-primary-light transition-colors"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                date: "Apr 12",
                month: "APR",
                day: "12",
                title: "Spring Cookout",
                timeLoc: "4:00 PM · Country Close Common Area",
                badge: "Events",
                badgeColor: "bg-accent/10 text-accent border-accent/20",
              },
              {
                date: "Apr 15",
                month: "APR",
                day: "15",
                title: "Board Check-In",
                timeLoc: "6:00 PM · Virtual",
                badge: "Governance",
                badgeColor: "bg-primary/10 text-primary border-primary/20",
              },
              {
                date: "Apr 22",
                month: "APR",
                day: "22",
                title: "Earth Day Cleanup",
                timeLoc: "9:00 AM · Neighborhood Entrance",
                badge: "Community",
                badgeColor: "bg-sky/10 text-[#5A8DA6] border-sky/20",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] p-4 border border-border flex gap-4 items-start"
              >
                <div className="w-12 bg-primary rounded-[8px] p-1 text-center shrink-0">
                  <div className="font-body font-bold text-[10px] text-white/70 uppercase leading-tight mt-1">
                    {event.month}
                  </div>
                  <div className="font-body font-black text-[22px] text-white leading-tight mb-1">
                    {event.day}
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex justify-between items-start">
                    <h4 className="font-body font-bold text-[15px] text-bark">{event.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${event.badgeColor}`}
                    >
                      {event.badge}
                    </span>
                  </div>
                  <div className="font-body text-[13px] text-text-light mt-1">{event.timeLoc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Recent Announcements */}
        <div className="lg:w-[40%] mt-8 lg:mt-0">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-body font-bold text-[16px] text-bark">Announcements</h3>
            <Link
              to="/portal/bulletin"
              className="font-body font-bold text-[13px] text-primary hover:text-primary-light transition-colors"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                title: "Gate Light Outage",
                date: "April 8",
                badge: "Safety",
                color: "#C0392B",
                badgeClass: "bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/20",
              },
              {
                title: "Spring Cookout This Saturday",
                date: "April 10",
                badge: "Events",
                color: "var(--color-accent)",
                badgeClass: "bg-accent/10 text-accent border-accent/20",
              },
              {
                title: "Welcome the Johnson Family!",
                date: "April 3",
                badge: "General",
                color: "var(--color-sky)",
                badgeClass: "bg-sky/10 text-[#5A8DA6] border-sky/20",
              },
            ].map((ann, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] p-4 border border-border"
                style={{ borderLeft: `3px solid ${ann.color}` }}
              >
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block mb-2 ${ann.badgeClass}`}
                >
                  {ann.badge}
                </span>
                <h4 className="font-body font-bold text-[14px] text-bark mb-1">{ann.title}</h4>
                <div className="font-body text-[12px] text-text-light">{ann.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 md:px-8 mt-8 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "26", label: "Households", color: "text-primary" },
            { num: "3", label: "Open Requests", color: "text-accent" },
            { num: "2", label: "Active Alerts", color: "text-[#C0392B]" },
            { num: "5", label: "Upcoming Events", color: "text-sky" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-[12px] py-5 px-6 border border-border text-center"
            >
              <div
                className={`font-display font-bold text-[32px] leading-none mb-1.5 ${stat.color}`}
              >
                {stat.num}
              </div>
              <div className="font-body text-[13px] text-text-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
