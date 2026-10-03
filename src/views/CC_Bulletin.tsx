import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TABS = ["All", "General", "Safety"];

export const CC_Bulletin = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="w-full min-h-full bg-cream">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center px-8 pt-8">
        <div>
          <h1 className="font-display font-bold text-[28px] text-bark">Bulletin Board</h1>
          <p className="font-body font-normal text-[14px] text-text-light">
            Stay connected with your neighbors
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent-hover text-bark font-body font-bold text-[14px] px-6 py-[10px] h-auto rounded-full">
              Post Something
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-cream border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-bark text-2xl">Create Post</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label className="font-body text-sm font-bold text-bark">Title</label>
                <Input
                  placeholder="What's on your mind?"
                  className="bg-white border-border focus-visible:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-sm font-bold text-bark">Category</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-body">
                  <option>General</option>
                  <option>Safety</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-sm font-bold text-bark">Message</label>
                <Textarea
                  placeholder="Write your message here..."
                  className="bg-white border-border focus-visible:ring-primary min-h-[100px]"
                />
              </div>
              <Button className="bg-primary hover:bg-primary-light text-white rounded-full mt-2">
                Publish Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* FILTER TABS */}
      <div className="px-8 pt-6 pb-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-body text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-text-light border border-border hover:bg-light-gray"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="px-8 py-4 flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-xs border border-border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-light-gray flex items-center justify-center font-display font-bold text-primary">
                  {i === 1 ? "JD" : i === 2 ? "SM" : "AW"}
                </div>
                <div>
                  <h3 className="font-body font-bold text-bark text-sm">
                    {i === 1 ? "Jane Doe" : i === 2 ? "Sarah Miller" : "Alex Wong"}
                  </h3>
                  <p className="font-body text-xs text-text-light">2 hours ago</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-cream text-primary font-body text-xs font-bold">
                {i === 2 ? "Safety" : "General"}
              </span>
            </div>
            <h4 className="font-display font-bold text-lg text-bark mb-2">
              {i === 1
                ? "Summer Block Party"
                : i === 2
                  ? "Suspicious vehicle reported"
                  : "Looking for a dog walker"}
            </h4>
            <p className="font-body text-text text-sm leading-relaxed mb-4">
              {i === 1
                ? "Hey neighbors! We are planning a block party for next weekend. Everyone is invited! Please bring a dish to share."
                : i === 2
                  ? "Just wanted to alert everyone about a suspicious white van parked near the north entrance. Police have been notified."
                  : "Does anyone have recommendations for a reliable dog walker in the area? I need someone for Tuesday and Thursday afternoons."}
            </p>
            <div className="flex items-center gap-4 border-t border-border pt-4">
              <button className="flex items-center gap-1 text-text-light hover:text-primary transition-colors text-sm font-body font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                Like ({i * 3})
              </button>
              <button className="flex items-center gap-1 text-text-light hover:text-primary transition-colors text-sm font-body font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Comment ({i})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
