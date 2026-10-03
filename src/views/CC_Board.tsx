import { CC_PortalLayout } from "@/components/CC_PortalLayout";
import { Button } from "@/components/ui/button";
import { CC_ComingSoonButton } from "@/components/CC_ComingSoonButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  Video,
  Calendar as CalendarIcon,
  Download,
  ChevronRight,
} from "lucide-react";

export const CC_Board = () => {
  const pastMeetings = [
    {
      id: 1,
      date: "March 25, 2026",
      title: "Q1 Financial Review",
      type: "Regular Meeting",
      minutesAvailable: true,
    },
    {
      id: 2,
      date: "February 28, 2026",
      title: "Landscaping Contract Renewal",
      type: "Special Meeting",
      minutesAvailable: true,
    },
    {
      id: 3,
      date: "January 20, 2026",
      title: "Annual General Meeting",
      type: "AGM",
      minutesAvailable: true,
    },
  ];

  const boardMembers = [
    { role: "President", name: "Sarah Jenkins", term: "2025-2027" },
    { role: "Vice President", name: "Michael Chen", term: "2024-2026" },
    { role: "Treasurer", name: "David Rodriguez", term: "2025-2027" },
    { role: "Secretary", name: "Emily Thompson", term: "2026-2028" },
    { role: "Member at Large", name: "Robert Wilson", term: "2024-2026" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display text-bark mb-2">Board Meeting Hub</h1>
        <p className="text-lg text-text-light font-body">
          Governance, minutes, and community decisions
        </p>
      </div>

      <div
        className="rounded-2xl p-7 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        style={{ background: "linear-gradient(135deg, #2D5016, #3D6B20)" }}
      >
        <div className="space-y-2">
          <div className="font-body font-bold text-[11px] tracking-[2px] text-white/70 uppercase">
            Next Meeting
          </div>
          <div className="font-display font-bold text-3xl text-white">Tuesday, April 29, 2026</div>
          <div className="font-body font-normal text-[15px] text-white/80 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> 7:00 PM · Virtual (Zoom)
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <CC_ComingSoonButton
            className="rounded-full font-body font-bold text-[14px] px-7 py-6"
            style={{ backgroundColor: "#E8A020", color: "#4A3728" }}
          >
            RSVP to Attend
          </CC_ComingSoonButton>
          <CC_ComingSoonButton
            variant="outline"
            className="rounded-full font-body font-bold text-[14px] px-7 py-6 border-white/20 text-white hover:bg-white/10 hover:text-white"
            style={{ backgroundColor: "transparent" }}
          >
            View Agenda
          </CC_ComingSoonButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold font-display text-bark border-b border-border pb-2">
            Recent Meetings
          </h2>
          <div className="space-y-4">
            {pastMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="border-border shadow-xs hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {meeting.type}
                      </span>
                      <span className="text-sm text-text-light">{meeting.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-bark">{meeting.title}</h3>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    {meeting.minutesAvailable && (
                      <CC_ComingSoonButton
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-text-light border-border hover:text-primary hover:border-primary"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Minutes
                      </CC_ComingSoonButton>
                    )}
                    <CC_ComingSoonButton
                      variant="ghost"
                      size="sm"
                      className="w-full sm:w-auto text-text-light hover:text-primary"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Recording
                    </CC_ComingSoonButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <CC_ComingSoonButton
            variant="outline"
            className="w-full border-border text-text-light hover:text-primary"
          >
            View All Past Meetings <ChevronRight className="w-4 h-4 ml-1" />
          </CC_ComingSoonButton>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-bark border-b border-border pb-2">
            Board of Directors
          </h2>
          <Card className="border-border shadow-xs">
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {boardMembers.map((member, index) => (
                  <li key={index} className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary font-bold font-display">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-bark">{member.name}</p>
                      <p className="text-sm text-text-light">
                        {member.role} · Term: {member.term}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border shadow-xs bg-cream border-none">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-bark mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Get Involved
              </h3>
              <p className="text-sm text-text-light mb-4">
                Interested in joining the board or a committee? Elections are held annually in
                January.
              </p>
              <CC_ComingSoonButton className="w-full bg-primary text-white hover:bg-primary-light">
                Learn About Elections
              </CC_ComingSoonButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CC_Board;
