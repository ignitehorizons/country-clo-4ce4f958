import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Folder, FileText, Download, File, ChevronRight, FileDown } from "lucide-react";
import { CC_ComingSoonButton } from "@/components/CC_ComingSoonButton";

export const CC_Documents = () => {
  const folders = [
    { id: 1, name: "Governing Documents", count: 4, icon: Folder },
    { id: 2, name: "Financial Reports", count: 12, icon: Folder },
    { id: 3, name: "Meeting Minutes", count: 24, icon: Folder },
    { id: 4, name: "Forms & Applications", count: 8, icon: Folder },
  ];

  const recentDocuments = [
    {
      id: 1,
      name: "CC_Bylaws_Amended_2025.pdf",
      category: "Governing Documents",
      date: "Jan 15, 2026",
      size: "2.4 MB",
      type: "PDF",
    },
    {
      id: 2,
      name: "Q1_2026_Financial_Statement.pdf",
      category: "Financial Reports",
      date: "Apr 02, 2026",
      size: "1.1 MB",
      type: "PDF",
    },
    {
      id: 3,
      name: "Architectural_Review_Form.pdf",
      category: "Forms & Applications",
      date: "Mar 10, 2026",
      size: "0.8 MB",
      type: "PDF",
    },
    {
      id: 4,
      name: "March_2026_Board_Minutes.pdf",
      category: "Meeting Minutes",
      date: "Mar 28, 2026",
      size: "1.5 MB",
      type: "PDF",
    },
    {
      id: 5,
      name: "Community_Rules_Guidelines.pdf",
      category: "Governing Documents",
      date: "Feb 20, 2026",
      size: "3.2 MB",
      type: "PDF",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-display text-bark mb-2">Document Library</h1>
          <p className="text-lg text-text-light font-body">
            Access important community files and forms
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
          <Input placeholder="Search documents..." className="pl-9 border-border bg-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Card
            key={folder.id}
            className="border-border shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group"
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <folder.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-bark group-hover:text-primary transition-colors">
                  {folder.name}
                </h3>
                <p className="text-sm text-text-light">{folder.count} files</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-2xl font-bold font-display text-bark">Recent Documents</h2>
          <CC_ComingSoonButton
            variant="ghost"
            className="text-primary hover:text-primary-light hover:bg-primary/5"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </CC_ComingSoonButton>
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream/50 border-b border-border text-sm text-text-light">
                  <th className="p-4 font-bold">Document Name</th>
                  <th className="p-4 font-bold hidden md:table-cell">Category</th>
                  <th className="p-4 font-bold hidden sm:table-cell">Date Added</th>
                  <th className="p-4 font-bold hidden lg:table-cell">Size</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-cream/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-red-50 text-red-500">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-bark">{doc.name}</p>
                          <p className="text-xs text-text-light md:hidden">{doc.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <Badge
                        variant="secondary"
                        className="bg-cream text-text-light hover:bg-cream"
                      >
                        {doc.category}
                      </Badge>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-sm text-text-light">{doc.date}</td>
                    <td className="p-4 hidden lg:table-cell text-sm text-text-light">{doc.size}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-text-light hover:text-primary hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CC_Documents;
