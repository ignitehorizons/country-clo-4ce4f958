import React from "react";
import { FileText, Plus, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export const CC_Warranty = () => {
  const claims = [
    {
      id: "WR-2026-089",
      title: "Master Bathroom Sink Leak",
      date: "Nov 12, 2026",
      status: "In Progress",
      category: "Plumbing",
      description: "Small drip under the master bathroom sink when running hot water.",
    },
    {
      id: "WR-2026-042",
      title: "HVAC Thermostat Issue",
      date: "Oct 05, 2026",
      status: "Resolved",
      category: "Electrical/HVAC",
      description: "Thermostat losing connection to wifi and resetting schedule.",
    },
  ];

  const documents = [
    { name: "Homeowner Warranty Manual", size: "2.4 MB", date: "Jan 2026" },
    { name: "Appliance Warranty Packet", size: "5.1 MB", date: "Jan 2026" },
    {
      name: "Structural Warranty Certificate",
      size: "1.2 MB",
      date: "Jan 2026",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none">
            <Clock size={12} className="mr-1" /> {status}
          </Badge>
        );
      case "Resolved":
        return (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
            <CheckCircle2 size={12} className="mr-1" /> {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-bark mb-2">Warranty Portal</h1>
          <p className="font-body text-text-light text-lg">Manage your home warranty requests</p>
        </div>
        <Button className="bg-primary hover:bg-primary-light text-white font-body font-bold">
          <Plus size={16} className="mr-2" />
          Submit New Claim
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="w-full justify-start bg-white border border-border rounded-xl p-1 mb-6 h-auto">
              <TabsTrigger
                value="active"
                className="font-body data-[state=active]:bg-light-gray data-[state=active]:text-bark py-2.5 px-4 rounded-lg"
              >
                Active Claims
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="font-body data-[state=active]:bg-light-gray data-[state=active]:text-bark py-2.5 px-4 rounded-lg"
              >
                Claim History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {claims
                .filter((c) => c.status !== "Resolved")
                .map((claim) => (
                  <Card key={claim.id} className="border-border shadow-xs">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body text-xs font-bold text-text-light uppercase tracking-wider">
                              {claim.id}
                            </span>
                            {getStatusBadge(claim.status)}
                          </div>
                          <CardTitle className="font-display text-xl text-bark">
                            {claim.title}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className="font-body text-text-light bg-light-gray/50"
                        >
                          {claim.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-body text-text text-sm mb-4">{claim.description}</p>
                      <div className="flex items-center text-xs text-text-light font-body">
                        <Clock size={14} className="mr-1" />
                        Submitted on {claim.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {claims
                .filter((c) => c.status === "Resolved")
                .map((claim) => (
                  <Card key={claim.id} className="border-border shadow-xs bg-white/60">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body text-xs font-bold text-text-light uppercase tracking-wider">
                              {claim.id}
                            </span>
                            {getStatusBadge(claim.status)}
                          </div>
                          <CardTitle className="font-display text-xl text-bark">
                            {claim.title}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className="font-body text-text-light bg-light-gray/50"
                        >
                          {claim.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-body text-text text-sm mb-4">{claim.description}</p>
                      <div className="flex items-center text-xs text-text-light font-body">
                        <Clock size={14} className="mr-1" />
                        Resolved on {claim.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-border shadow-xs bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display text-lg text-bark flex items-center gap-2">
                <AlertCircle size={18} className="text-primary" />
                Warranty Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center font-body text-sm">
                  <span className="text-text-light">1-Year Fit & Finish</span>
                  <span className="font-bold text-primary">Active</span>
                </div>
                <div className="flex justify-between items-center font-body text-sm">
                  <span className="text-text-light">2-Year Systems</span>
                  <span className="font-bold text-primary">Active</span>
                </div>
                <div className="flex justify-between items-center font-body text-sm">
                  <span className="text-text-light">10-Year Structural</span>
                  <span className="font-bold text-primary">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-xs">
            <CardHeader>
              <CardTitle className="font-display text-lg text-bark flex items-center gap-2">
                <FileText size={18} className="text-text-light" />
                Documents
              </CardTitle>
              <CardDescription className="font-body text-sm">
                Important warranty information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-light-gray transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText size={16} className="text-primary shrink-0" />
                      <div className="truncate">
                        <p className="font-body font-bold text-sm text-bark truncate">{doc.name}</p>
                        <p className="font-body text-xs text-text-light">
                          {doc.size} • {doc.date}
                        </p>
                      </div>
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
