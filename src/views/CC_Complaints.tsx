import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { AlertCircle, FileText, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CC_ComingSoonButton } from "@/components/CC_ComingSoonButton";

export const CC_Complaints = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const recentReports = [
    {
      id: "V-2026-042",
      type: "Noise Complaint",
      status: "In Review",
      date: "Apr 01, 2026",
    },
    {
      id: "V-2026-038",
      type: "Parking Violation",
      status: "Resolved",
      date: "Mar 15, 2026",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display text-bark mb-2">Violation Tracking</h1>
        <p className="text-lg text-text-light font-body">
          Report community rule violations or track existing complaints
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-border shadow-xs">
            <CardHeader className="border-b border-border bg-cream/50">
              <CardTitle className="font-display text-2xl text-bark flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Submit a New Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-bark">
                    Report Submitted Successfully
                  </h3>
                  <p className="text-text-light max-w-md">
                    Thank you for helping keep our community safe and beautiful. Your report has
                    been assigned reference number <strong className="text-bark">V-2026-045</strong>
                    .
                  </p>
                  <Button
                    className="mt-4 bg-primary text-white hover:bg-primary-light"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Report
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-bark font-bold">
                        Violation Type
                      </Label>
                      <Select>
                        <SelectTrigger className="border-border bg-white">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="noise">Noise Complaint</SelectItem>
                          <SelectItem value="parking">Parking Violation</SelectItem>
                          <SelectItem value="property">Property Maintenance</SelectItem>
                          <SelectItem value="pets">Pet Violation</SelectItem>
                          <SelectItem value="trash">Trash/Recycling</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-bark font-bold">
                        Location / Address
                      </Label>
                      <Input
                        id="location"
                        placeholder="E.g., 123 Oak Lane"
                        className="border-border bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-bark font-bold">
                      Date & Time of Incident
                    </Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      className="border-border bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-bark font-bold">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide details about the violation..."
                      className="min-h-[120px] border-border bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-bark font-bold">Upload Evidence (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-cream/30 hover:bg-cream/50 transition-colors cursor-pointer">
                      <p className="text-sm text-text-light">
                        Drag and drop photos here, or click to browse
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>
                      <strong>Note:</strong> All reports are kept strictly confidential. The HOA
                      board will review this submission within 2-3 business days.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary-light"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-display text-bark border-b border-border pb-2">
            Your Recent Reports
          </h2>

          <div className="space-y-4">
            {recentReports.map((report, idx) => (
              <Card key={idx} className="border-border shadow-xs">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-text-light font-bold mb-1">{report.id}</p>
                      <h3 className="font-bold text-bark">{report.type}</h3>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        report.status === "Resolved"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light mt-3">
                    <Clock className="w-4 h-4" /> Submitted {report.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border shadow-xs bg-cream border-none mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-bark mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Community Rules
              </h3>
              <p className="text-sm text-text-light mb-4">
                Not sure if something is a violation? Review our CC&Rs and community guidelines.
              </p>
              <CC_ComingSoonButton
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
              >
                Read Guidelines
              </CC_ComingSoonButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CC_Complaints;
