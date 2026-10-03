import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CalendarIcon,
  Wrench,
  Search,
  Plus,
  AlertCircle,
  CheckCircle2,
  Hammer,
  Leaf,
  Zap,
  Scissors,
  Sprout,
  List,
  Car,
  Users,
} from "lucide-react";

type ToolStatus = "Available" | "OnLoan" | "BorrowedByMe";

interface Tool {
  id: number;
  icon: React.ReactNode;
  name: string;
  desc: string;
  owner: string;
  status: ToolStatus;
  borrower?: string;
  dueDate?: string;
  isOverdue?: boolean;
}

const MOCK_TOOLS: Tool[] = [
  {
    id: 1,
    icon: <Hammer className="w-5 h-5" />,
    name: "Power Drill — DeWalt 20V",
    desc: "Cordless, 2 batteries included.",
    owner: "Tom K.",
    status: "BorrowedByMe",
    dueDate: "Apr 15",
    isOverdue: false,
  },
  {
    id: 2,
    icon: <Leaf className="w-5 h-5" />,
    name: "Lawn Aerator",
    desc: "Push aerator, standard lawns.",
    owner: "Jeremy S.",
    status: "Available",
  },
  {
    id: 3,
    icon: <Zap className="w-5 h-5" />,
    name: "Pressure Washer",
    desc: "2300 PSI electric, 3 attachments.",
    owner: "Me",
    status: "OnLoan",
    borrower: "Sarah",
    dueDate: "Apr 12",
    isOverdue: true,
  },
  {
    id: 4,
    icon: <Scissors className="w-5 h-5" />,
    name: "Circular Saw",
    desc: "Ryobi 7-1/4 inch, extra blade.",
    owner: "Robert B.",
    status: "Available",
  },
  {
    id: 5,
    icon: <Sprout className="w-5 h-5" />,
    name: "Seed Spreader",
    desc: "Broadcast spreader, 25 lbs.",
    owner: "Linda R.",
    status: "Available",
  },
  {
    id: 6,
    icon: <Wrench className="w-5 h-5" />,
    name: "Socket Set — Complete",
    desc: "Full metric and standard, 100+ pieces.",
    owner: "Tom K.",
    status: "Available",
  },
  {
    id: 7,
    icon: <List className="w-5 h-5" />,
    name: "Extension Ladder — 24ft",
    desc: "Aluminum, rated 300 lbs.",
    owner: "Jeremy S.",
    status: "Available",
  },
  {
    id: 8,
    icon: <Car className="w-5 h-5" />,
    name: "Car Jack & Stands",
    desc: "3-ton floor jack, 2 stands.",
    owner: "Robert B.",
    status: "OnLoan",
    borrower: "Mike",
    dueDate: "Apr 18",
    isOverdue: false,
  },
];

const CATEGORIES = [
  "All",
  "Power Tools",
  "Hand Tools",
  "Lawn & Garden",
  "Automotive",
  "Kitchen",
  "Sporting",
  "Other",
];

const RECENT_LOANS = [
  {
    id: 1,
    name: "Socket Set",
    icon: <Wrench className="w-4 h-4" />,
    borrower: "Tom K.",
    dates: "Mar 28 – Apr 2",
  },
  {
    id: 2,
    name: "Lawn Aerator",
    icon: <Leaf className="w-4 h-4" />,
    borrower: "Amy P.",
    dates: "Mar 20 – Mar 22",
  },
  {
    id: 3,
    name: "Extension Ladder",
    icon: <List className="w-4 h-4" />,
    borrower: "Linda R.",
    dates: "Mar 10 – Mar 12",
  },
];

export function CC_Tools() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [tools, setTools] = useState(MOCK_TOOLS);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const borrowedTools = tools.filter((t) => t.status === "BorrowedByMe");

  const handleReturnTool = (id: number) => {
    setTools(tools.map((t) => (t.id === id ? { ...t, status: "Available" } : t)));
    toast.success("Tool marked as returned!");
  };

  const handleBorrowRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setBorrowModalOpen(false);
    toast.success(`Request sent to ${selectedTool?.owner}! You'll be notified when they respond.`);
    setTimeout(() => {
      toast("Owner Notification Simulation", {
        description: `Current User wants to borrow your ${selectedTool?.name}`,
        style: { backgroundColor: "#2D5016", color: "white", border: "none" },
      });
    }, 2000);
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    setAddModalOpen(false);
    toast.success("Your tool has been added to the library!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 pt-8 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#4A3728]">
            Tool & Resource Library
          </h1>
          <p className="text-[#7A6A5A] font-body mt-1">
            Borrow tools from your neighbors — ask before you buy
          </p>
        </div>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#E8A020] hover:bg-[#D4911A] text-white font-body font-bold text-sm px-6 py-2.5 rounded-full shadow-xs transition-colors whitespace-nowrap">
              + Add a Tool
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#F7F3ED] border-[#DDD5C8]">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-[#4A3728]">
                Add a Tool to the Library
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTool} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-1 block">Tool name *</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                  placeholder="e.g. Power Drill"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-1 block">Category *</label>
                <select className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]">
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-1 block">Description *</label>
                <textarea
                  required
                  rows={2}
                  className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                  placeholder="Briefly describe the tool..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">Condition</label>
                  <select className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]">
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-[#4A3728] mb-1 block">Max loan</label>
                  <select className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]">
                    <option>1 day</option>
                    <option>2-3 days</option>
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>No limit</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                  Borrowing rules
                </label>
                <textarea
                  rows={2}
                  className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                  placeholder="Any special instructions for borrowers?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#E8A020] hover:bg-[#D4911A] text-white font-bold py-2.5 rounded-full mt-2 transition-colors"
              >
                Add to Library
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3 px-8 mb-8">
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <Wrench className="w-4 h-4 mr-1 text-primary" />{" "}
          <span className="font-bold ml-1">18</span> Tools Available
        </div>
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <Zap className="w-4 h-4 mr-1 text-accent" /> <span className="font-bold ml-1">3</span>{" "}
          Currently On Loan
        </div>
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <Users className="w-4 h-4 mr-1 text-sky" /> <span className="font-bold ml-1">7</span>{" "}
          Contributing Neighbors
        </div>
        <div className="bg-white border border-[#DDD5C8] rounded-full px-4 py-1.5 text-sm font-body text-[#4A3728] shadow-xs flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-1 text-primary" />{" "}
          <span className="font-bold ml-1">24</span> Successful Loans
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 px-8 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              activeCategory === cat
                ? "bg-[#4A3728] text-white"
                : "bg-[#F0EDE8] text-[#7A6A5A] hover:bg-[#DDD5C8]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* My Borrowed Tools Section */}
      {borrowedTools.length > 0 && (
        <div className="mx-8 mb-6 bg-[rgba(232,160,32,0.06)] border border-[#E8A020] rounded-xl px-6 py-5">
          <h2 className="font-body font-bold text-[15px] text-[#8B6914] mb-4">
            Tools You Currently Have
          </h2>
          <div className="space-y-3">
            {borrowedTools.map((tool) => (
              <div
                key={tool.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 p-3 rounded-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="font-body font-bold text-[15px] text-[#4A3728] flex items-center gap-2">
                    {tool.icon} {tool.name}
                  </span>
                  <span className="font-body text-[13px] text-[#7A6A5A]">
                    Borrowed from {tool.owner}
                  </span>
                  <span
                    className={`font-body font-bold text-[13px] ${tool.isOverdue ? "text-[#C0392B]" : "text-[#2D5016]"}`}
                  >
                    Due back: {tool.dueDate}
                  </span>
                </div>
                <button
                  onClick={() => handleReturnTool(tool.id)}
                  className="bg-[#2D5016] hover:bg-[#3D6B20] text-white font-body font-bold text-[13px] rounded-full px-[18px] py-2 transition-colors whitespace-nowrap"
                >
                  Mark as Returned
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-8 pb-8">
        {tools.map((tool) => {
          const isOwnedByMe = tool.owner === "Me";

          return (
            <div
              key={tool.id}
              className="bg-white rounded-xl p-5 border border-[#DDD5C8] shadow-xs hover:border-[#E8A020] transition-colors flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-full bg-[#F0EDE8] flex items-center justify-center text-xl">
                  {tool.icon}
                </div>
                <div>
                  {tool.status === "Available" && (
                    <span className="bg-[rgba(45,80,22,0.1)] text-[#2D5016] font-body font-bold text-[11px] px-2.5 py-1 rounded-full">
                      ✓ Available
                    </span>
                  )}
                  {tool.status === "OnLoan" && (
                    <span className="bg-[rgba(192,57,43,0.1)] text-[#C0392B] font-body font-bold text-[11px] px-2.5 py-1 rounded-full">
                      {isOwnedByMe ? `On Loan to ${tool.borrower}` : "On Loan"}
                    </span>
                  )}
                  {tool.status === "BorrowedByMe" && (
                    <span className="bg-[rgba(232,160,32,0.1)] text-[#8B6914] font-body font-bold text-[11px] px-2.5 py-1 rounded-full">
                      You have this
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-body font-bold text-[16px] text-[#4A3728] mt-3">{tool.name}</h3>
              <p className="font-body text-[13px] text-[#7A6A5A] mt-1.5 line-clamp-2 min-h-[39px]">
                {tool.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-[#F0EDE8] grow">
                <p className="font-body text-[12px] text-[#7A6A5A]">
                  Owned by {isOwnedByMe ? "You" : tool.owner}
                </p>
                {tool.status === "OnLoan" && tool.dueDate && (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-body font-bold text-[12px] text-[#C0392B]">
                      Due back: {tool.dueDate}
                    </p>
                    {tool.isOverdue && (
                      <span className="bg-[rgba(192,57,43,0.1)] text-[#C0392B] font-body font-bold text-[11px] px-2 py-0.5 rounded-full">
                        ⚠️ Overdue
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4">
                {isOwnedByMe ? (
                  tool.status === "OnLoan" ? (
                    <div className="text-center">
                      <p className="font-body font-bold text-[13px] text-[#C0392B]">
                        {tool.borrower} has this — Due {tool.dueDate}
                      </p>
                      <button className="font-body text-[12px] text-[#2D5016] hover:underline mt-1">
                        Send Reminder
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button className="flex-1 border border-[#DDD5C8] text-[#7A6A5A] font-bold text-[12px] py-1.5 rounded-full hover:bg-[#F0EDE8] transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 border border-[#C0392B] text-[#C0392B] font-bold text-[12px] py-1.5 rounded-full hover:bg-[rgba(192,57,43,0.05)] transition-colors">
                        Remove
                      </button>
                    </div>
                  )
                ) : tool.status === "Available" ? (
                  <Dialog
                    open={borrowModalOpen && selectedTool?.id === tool.id}
                    onOpenChange={(open) => {
                      setSelectedTool(tool);
                      setBorrowModalOpen(open);
                    }}
                  >
                    <DialogTrigger asChild>
                      <button className="w-full border border-[#2D5016] text-[#2D5016] font-body font-bold text-[13px] py-2 rounded-full hover:bg-[rgba(45,80,22,0.05)] transition-colors">
                        Request to Borrow
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#F7F3ED] border-[#DDD5C8]">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl text-[#4A3728]">
                          Request to Borrow
                        </DialogTitle>
                      </DialogHeader>

                      <div className="bg-[#F7F3ED] border border-[#DDD5C8] rounded-lg px-4 py-3 mb-2 mt-2">
                        <p className="font-body font-bold text-[#4A3728] flex items-center gap-2">
                          {tool.icon} {tool.name}
                        </p>
                        <p className="font-body text-sm text-[#7A6A5A]">Owned by {tool.owner}</p>
                      </div>

                      <form onSubmit={handleBorrowRequest} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                              Borrow Start *
                            </label>
                            <input
                              required
                              type="date"
                              className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                              Return By *
                            </label>
                            <input
                              required
                              type="date"
                              className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                            Message to owner
                          </label>
                          <textarea
                            rows={3}
                            className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                            placeholder="Hi! I'd like to borrow this for [reason]. I'll have it back by [date]."
                          ></textarea>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-[#4A3728] mb-1 block">
                            Your contact number
                          </label>
                          <input
                            type="tel"
                            className="w-full rounded-md border-[#DDD5C8] px-3 py-2 text-sm bg-white border outline-hidden focus:border-[#E8A020]"
                            placeholder="(555) 000-0000"
                          />
                        </div>

                        <div className="bg-[rgba(45,80,22,0.04)] border-l-4 border-l-[#2D5016] rounded-r-lg px-4 py-3 mt-4">
                          <p className="font-body text-[13px] text-[#7A6A5A]">
                            By requesting this tool you agree to return it in the same condition by
                            your agreed return date. The owner will be notified of your request.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#E8A020] hover:bg-[#D4911A] text-white font-bold py-2.5 rounded-full mt-2 transition-colors"
                        >
                          Send Borrow Request
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                ) : tool.status === "BorrowedByMe" ? (
                  <button
                    onClick={() => handleReturnTool(tool.id)}
                    className="w-full bg-[#2D5016] hover:bg-[#3D6B20] text-white font-body font-bold text-[13px] py-2 rounded-full transition-colors"
                  >
                    Mark as Returned
                  </button>
                ) : (
                  <div className="text-center">
                    <button
                      disabled
                      className="w-full bg-[#F0EDE8] text-[#7A6A5A] font-body font-bold text-[13px] py-2 rounded-full cursor-not-allowed"
                    >
                      Currently On Loan
                    </button>
                    <button className="font-body text-[12px] text-[#2D5016] hover:underline mt-2 inline-block">
                      Notify me when available
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loan History Section */}
      <div className="mt-4 mb-8">
        <h2 className="font-body font-bold text-[16px] text-[#4A3728] mx-8 mb-4">
          Recent Loan Activity
        </h2>
        <div className="mx-8 bg-white rounded-xl border border-[#DDD5C8] shadow-xs">
          {RECENT_LOANS.map((loan, idx) => (
            <div
              key={loan.id}
              className={`flex justify-between items-center px-6 py-3 ${idx !== RECENT_LOANS.length - 1 ? "border-b border-[#F0EDE8]" : ""}`}
            >
              <div className="font-body font-bold text-[14px] text-[#4A3728] w-1/3">
                <div className="flex items-center gap-2">
                  {loan.icon} {loan.name}
                </div>
              </div>
              <div className="font-body text-[13px] text-[#7A6A5A] w-1/3 text-center">
                Borrowed by {loan.borrower}
              </div>
              <div className="w-1/3 flex justify-end items-center gap-3">
                <span className="font-body text-[12px] text-[#7A6A5A]">{loan.dates}</span>
                <span className="bg-[rgba(45,80,22,0.08)] text-[#2D5016] font-body font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Returned
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CC_Tools;
