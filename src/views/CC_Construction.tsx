import React from "react";
import { CheckCircle2, Circle, Clock, HardHat, Image as ImageIcon, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";

export const CC_Construction = () => {
  const milestones = [
    {
      id: 1,
      title: "Foundation & Framing",
      date: "Completed Oct 15",
      status: "completed",
    },
    {
      id: 2,
      title: "Plumbing & Electrical",
      date: "Completed Nov 02",
      status: "completed",
    },
    {
      id: 3,
      title: "Drywall & Insulation",
      date: "In Progress",
      status: "current",
    },
    {
      id: 4,
      title: "Interior Finishes",
      date: "Estimated Dec 01",
      status: "upcoming",
    },
    {
      id: 5,
      title: "Final Inspection",
      date: "Estimated Dec 15",
      status: "upcoming",
    },
  ];

  const recentUpdates = [
    {
      id: 1,
      date: "Nov 10, 2026",
      title: "Drywall Installation Started",
      description: "The team has begun hanging drywall in the main living areas and bedrooms.",
      image: true,
    },
    {
      id: 2,
      date: "Nov 02, 2026",
      title: "Electrical Rough-in Complete",
      description: "All wiring has been run and inspected. We are ready to move to insulation.",
      image: false,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-bark mb-2">Construction Tracker</h1>
        <p className="font-body text-text-light text-lg">Track the progress of your new home</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-display text-2xl text-bark">
                    Lot 42 - The Oakwood
                  </CardTitle>
                  <p className="text-text-light font-body mt-1 flex items-center gap-1.5">
                    <MapPin size={16} />
                    124 Country Close Drive
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-body font-bold">
                  Phase 2
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between font-body text-sm">
                <span className="font-bold text-bark">Overall Progress</span>
                <span className="text-primary font-bold">60%</span>
              </div>
              <Progress value={60} className="h-3 bg-light-gray" />
            </CardContent>
          </Card>

          <h2 className="font-display font-bold text-2xl text-bark mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <Card key={update.id} className="border-border shadow-xs overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {update.image && (
                    <div className="sm:w-48 h-48 sm:h-auto bg-light-gray flex items-center justify-center border-r border-border">
                      <ImageIcon size={32} className="text-text-light/50" />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <div className="text-sm font-body text-text-light mb-2">{update.date}</div>
                    <h3 className="font-display font-bold text-xl text-bark mb-2">
                      {update.title}
                    </h3>
                    <p className="font-body text-text">{update.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-border shadow-xs sticky top-[100px]">
            <CardHeader>
              <CardTitle className="font-display text-xl text-bark flex items-center gap-2">
                <HardHat className="text-accent" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-cream text-text-light shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {milestone.status === "completed" ? (
                        <CheckCircle2 size={16} className="text-primary fill-primary/20" />
                      ) : milestone.status === "current" ? (
                        <Circle size={12} className="text-accent fill-accent" />
                      ) : (
                        <Circle size={12} className="text-border" />
                      )}
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded border border-border bg-white shadow-xs">
                      <h4
                        className={`font-body font-bold text-sm ${milestone.status === "current" ? "text-accent" : "text-bark"}`}
                      >
                        {milestone.title}
                      </h4>
                      <p className="font-body text-xs text-text-light mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {milestone.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
