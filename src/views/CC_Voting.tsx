import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { CC_PortalLayout } from "@/components/CC_PortalLayout";

export const CC_Voting = () => {
  const [isAdmin] = useState(true); // Mock admin state

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#4A3728]">Voting & Polls</h1>
          <p className="text-[#7A6A5A] font-body mt-1">Your voice matters in Country Close</p>
        </div>
        {isAdmin && (
          <Button className="bg-[#C4A875] hover:bg-[#B39764] text-white rounded-full px-6 font-body font-bold shadow-xs">
            <Plus className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        )}
      </div>

      <div className="grid gap-8">
        {/* Active Polls Section */}
        <section>
          <h2 className="text-[18px] font-bold font-body text-[#4A3728] px-[32px] pt-[24px] mb-4">
            Active Polls
          </h2>
          <div className="space-y-4">
            {INITIAL_ACTIVE_POLLS.map((poll) => (
              <PollCard key={poll.id} poll={poll} isAdmin={isAdmin} />
            ))}
          </div>
        </section>

        {/* Closed Polls Section */}
        <section>
          <h2 className="text-[18px] font-bold font-body text-[#4A3728] px-[32px] pt-[24px] mb-4">
            Closed Polls
          </h2>
          <div className="space-y-4">
            {CLOSED_POLLS.map((poll) => (
              <PollCard key={poll.id} poll={poll} isAdmin={isAdmin} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type Poll = {
  id: string;
  question: string;
  status: "active" | "closed";
  closeDate: string;
  options: PollOption[];
  totalVotes: number;
  winnerId?: string;
};

const INITIAL_ACTIVE_POLLS: Poll[] = [
  {
    id: "p1",
    question: "Should we organize a neighborhood watch program for Country Close?",
    status: "active",
    closeDate: "Apr 20, 2026",
    totalVotes: 12,
    options: [
      { id: "o1", text: "Yes, I'd participate actively", votes: 5 },
      { id: "o2", text: "Yes, but I'd be a passive supporter", votes: 4 },
      { id: "o3", text: "No, I don't think it's needed", votes: 2 },
      { id: "o4", text: "I need more information first", votes: 1 },
    ],
  },
  {
    id: "p2",
    question: "What time works best for our monthly community meetup?",
    status: "active",
    closeDate: "Apr 25, 2026",
    totalVotes: 18,
    options: [
      { id: "o1", text: "Saturday morning (10 AM)", votes: 6 },
      { id: "o2", text: "Saturday afternoon (2 PM)", votes: 4 },
      { id: "o3", text: "Sunday afternoon (3 PM)", votes: 3 },
      { id: "o4", text: "Weekday evening (7 PM)", votes: 5 },
    ],
  },
];

const CLOSED_POLLS: Poll[] = [
  {
    id: "c1",
    question: "Should we plant flowers at the neighborhood entrance?",
    status: "closed",
    closeDate: "Mar 15, 2026",
    totalVotes: 20,
    winnerId: "o1",
    options: [
      { id: "o1", text: "Yes", votes: 17 },
      { id: "o2", text: "No", votes: 3 },
    ],
  },
  {
    id: "c2",
    question: "Are you happy with the current trash pickup schedule?",
    status: "closed",
    closeDate: "Feb 28, 2026",
    totalVotes: 20,
    winnerId: "o1",
    options: [
      { id: "o1", text: "Very happy", votes: 9 },
      { id: "o2", text: "Somewhat happy", votes: 6 },
      { id: "o3", text: "Not happy", votes: 5 },
    ],
  },
  {
    id: "c3",
    question: "Which food truck should we invite for the summer block party?",
    status: "closed",
    closeDate: "Jan 10, 2026",
    totalVotes: 50,
    winnerId: "o1",
    options: [
      { id: "o1", text: "Tacos", votes: 25 },
      { id: "o2", text: "Burgers", votes: 15 },
      { id: "o3", text: "Pizza", votes: 10 },
    ],
  },
];

const PollCard = ({ poll, isAdmin }: { poll: Poll; isAdmin: boolean }) => {
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

  const isClosed = poll.status === "closed";
  const showResults = isClosed || votedOptionId !== null;

  const handleVote = (optionId: string) => {
    if (!showResults) {
      setVotedOptionId(optionId);
    }
  };

  const totalVotes =
    showResults && votedOptionId && !isClosed ? poll.totalVotes + 1 : poll.totalVotes;

  return (
    <div
      className="bg-white rounded-[16px] p-[28px] border border-[#DDD5C8] mb-5"
      style={{
        borderTop: `4px solid ${isClosed ? "#7A6A5A" : "#2D5016"}`,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <div
          className="px-2 py-1 rounded-full text-[11px] font-bold font-body"
          style={{
            backgroundColor: isClosed ? "#F0EDE8" : "rgba(45,80,22,0.1)",
            color: isClosed ? "#7A6A5A" : "#2D5016",
          }}
        >
          {isClosed ? "Closed" : "● Active"}
        </div>
        <div className="text-[#7A6A5A] text-[13px] font-body">
          {isClosed ? `Closed: ${poll.closeDate}` : `Closes: ${poll.closeDate}`}
        </div>
      </div>

      {/* Question */}
      <h3 className="font-display font-bold text-[22px] text-[#4A3728] my-4 leading-tight">
        {poll.question}
      </h3>

      {/* Options */}
      <div className="space-y-2 mb-6">
        {poll.options.map((option) => {
          const isSelected = votedOptionId === option.id;
          const isWinner = isClosed && poll.winnerId === option.id;
          const optionVotes = isSelected && !isClosed ? option.votes + 1 : option.votes;
          const percentage = totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;

          if (showResults) {
            return (
              <div
                key={option.id}
                className="relative w-full rounded-lg overflow-hidden border-2"
                style={{
                  borderColor: isSelected || isWinner ? "#2D5016" : "#DDD5C8",
                  backgroundColor: isSelected || isWinner ? "rgba(45,80,22,0.08)" : "transparent",
                }}
              >
                {/* Progress Bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 z-0 transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: "rgba(45,80,22,0.15)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex justify-between items-center p-[14px_16px]">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-body font-bold text-[15px] text-[#4A3728]">
                        {option.text}
                      </span>
                      {isSelected && !isClosed && <Check className="w-4 h-4 text-[#2D5016]" />}
                    </div>
                    <span className="font-body text-[12px] text-[#7A6A5A] mt-1">
                      {optionVotes} {optionVotes === 1 ? "vote" : "votes"}
                    </span>
                    {isWinner && (
                      <span className="font-body text-[12px] text-[#2D5016] font-bold mt-1">
                        ✓ Winning option
                      </span>
                    )}
                  </div>
                  <div className="font-body font-bold text-[14px] text-[#2D5016]">
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          }

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              className="w-full text-left p-[14px_16px] border-2 border-[#DDD5C8] rounded-lg font-body font-bold text-[15px] text-[#4A3728] hover:border-[#2D5016] transition-colors cursor-pointer bg-transparent"
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {votedOptionId && !isClosed && (
        <div className="text-[#2D5016] text-[13px] font-body mb-4 font-medium">
          You voted for: {poll.options.find((o) => o.id === votedOptionId)?.text}
        </div>
      )}

      {/* Footer Row */}
      <div className="flex justify-between items-center border-t border-[#DDD5C8] pt-4">
        <div className="text-[#7A6A5A] text-[13px] font-body">
          {totalVotes} votes total • {isClosed ? "Voting closed" : `Voting ends ${poll.closeDate}`}
        </div>

        {isAdmin && !isClosed && (
          <div className="flex items-center space-x-2">
            <Switch id={`share-${poll.id}`} />
            <Label
              htmlFor={`share-${poll.id}`}
              className="text-[13px] text-[#7A6A5A] font-body cursor-pointer"
            >
              Share results
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};
