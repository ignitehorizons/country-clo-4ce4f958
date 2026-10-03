import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import {
  MapPin,
  Calendar as CalendarIcon,
  Dog,
  Cat,
  Package,
  Bike,
  Key,
  Smartphone,
} from "lucide-react";

// Mock data
const posts = [
  {
    id: 1,
    type: "LOST",
    category: "Pets",
    icon: <Dog className="w-12 h-12 text-white" />,
    title: "Lost Dog — Golden Retriever",
    description: "Max went missing from our backyard. Golden retriever, red collar, very friendly.",
    location: "Near house #18",
    date: "Apr 10",
    expiresIn: null,
  },
  {
    id: 2,
    type: "FOUND",
    category: "Pets",
    icon: <Cat className="w-12 h-12 text-white" />,
    title: "Found Cat — Grey Tabby",
    description: "Found a grey tabby cat near the entrance. Friendly, no collar. Safe at our home.",
    location: "Near entrance",
    date: "Apr 9",
    expiresIn: null,
  },
  {
    id: 3,
    type: "LOST",
    category: "Items",
    icon: <Package className="w-12 h-12 text-white" />,
    title: "Lost House Keys",
    description: "Lost a set of keys with a blue keychain. May have dropped near the mailboxes.",
    location: "Mailbox area",
    date: "Apr 8",
    expiresIn: null,
  },
  {
    id: 4,
    type: "FOUND",
    category: "Items",
    icon: <Package className="w-12 h-12 text-white" />,
    title: "Found Sunglasses",
    description: "Found a pair of Ray-Ban sunglasses near the common area. Describe to claim.",
    location: "Common area",
    date: "Apr 7",
    expiresIn: null,
  },
  {
    id: 5,
    type: "LOST",
    category: "Items",
    icon: <Bike className="w-12 h-12 text-white" />,
    title: "Missing Bicycle",
    description: "Child's blue bicycle missing from front yard. Last seen Saturday afternoon.",
    location: "House #7",
    date: "Apr 5",
    expiresIn: null,
  },
  {
    id: 6,
    type: "FOUND",
    category: "Keys",
    icon: <Key className="w-12 h-12 text-white" />,
    title: "Found Car Keys",
    description: "Found a set of Toyota car keys on the sidewalk near the cul-de-sac.",
    location: "Cul-de-sac",
    date: "Apr 3",
    expiresIn: null,
  },
  {
    id: 7,
    type: "LOST",
    category: "Pets",
    icon: <Dog className="w-12 h-12 text-white" />,
    title: "Lost Small Dog — Chihuahua",
    description: "Tiny brown chihuahua named Bella. Wearing pink collar. Please call if found.",
    location: "Country Close Dr",
    date: "Mar 30",
    expiresIn: 4,
  },
  {
    id: 8,
    type: "FOUND",
    category: "Items",
    icon: <Smartphone className="w-12 h-12 text-white" />,
    title: "Found iPhone",
    description:
      "Found an iPhone near the entrance. Screen cracked. Contact to identify and claim.",
    location: "Near entrance",
    date: "Mar 28",
    expiresIn: 2,
  },
];

export function CC_LostFound() {
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [modalType, setModalType] = useState("LOST");

  const filteredPosts = posts.filter((post) => {
    if (filterType !== "All" && post.type !== filterType) return false;
    if (filterCategory !== "All" && post.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-bark">Lost &amp; Found</h1>
          <p className="text-text-light mt-1">Help neighbors find lost items and pets</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent-hover text-white rounded-full px-6 font-bold">
              + Post Lost or Found
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-bark">
                Post to Lost &amp; Found
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button
                  type="button"
                  className={`flex-1 py-3 text-sm font-bold transition-colors ${modalType === "LOST" ? "bg-[#C0392B] text-white" : "bg-white text-text-light hover:bg-light-gray"}`}
                  onClick={() => setModalType("LOST")}
                >
                  LOST
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 text-sm font-bold transition-colors ${modalType === "FOUND" ? "bg-primary text-white" : "bg-white text-text-light hover:bg-light-gray"}`}
                  onClick={() => setModalType("FOUND")}
                >
                  FOUND
                </button>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="Pets">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pets">Pet</SelectItem>
                    <SelectItem value="Items">Item</SelectItem>
                    <SelectItem value="Keys">Keys</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="E.g. Lost Golden Retriever" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Provide details like color, size, distinguishing features..."
                  className="h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{modalType === "LOST" ? "Last seen location" : "Found at location"}</Label>
                  <Input placeholder="E.g. Near entrance" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Contact Preference</Label>
                <Select defaultValue="Platform Message">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Platform Message">Platform Message</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary hover:bg-primary-light text-white font-bold mt-2">
                Submit Post
              </Button>
              <p className="text-center text-xs text-text-light italic mt-2">
                Posts automatically expire after 14 days. You'll receive an email reminder before
                expiry.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {["All", "Lost", "Found"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                filterType === type
                  ? type === "Lost"
                    ? "bg-[#C0392B] text-white"
                    : "bg-primary text-white"
                  : "bg-white text-text-light border border-border hover:bg-light-gray"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Pets", "Items", "Keys", "Vehicles", "Other"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                filterCategory === cat
                  ? "bg-earth text-white"
                  : "bg-white text-text border border-border hover:bg-light-gray"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div
              className="h-[160px] relative flex items-center justify-center"
              style={{
                background:
                  post.type === "LOST"
                    ? "linear-gradient(135deg, #C0392B, #E74C3C)"
                    : "linear-gradient(135deg, #2D5016, #3D6B20)",
              }}
            >
              <div
                className="absolute top-3 left-3 text-[11px] font-bold text-white px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: post.type === "LOST" ? "#C0392B" : "#2D5016",
                }}
              >
                {post.type}
              </div>
              <span className="flex items-center justify-center">{post.icon}</span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              {post.expiresIn && (
                <div className="bg-[#E8A020]/10 text-earth font-bold text-[11px] text-center py-1.5 rounded mb-3">
                  ⚠️ Expires in {post.expiresIn} days
                </div>
              )}

              <div className="inline-block bg-light-gray text-text-light text-[11px] px-2 py-0.5 rounded-full w-fit mb-2">
                {post.category}
              </div>

              <h3 className="font-display font-semibold text-lg text-bark leading-tight">
                {post.title}
              </h3>

              <p className="text-text-light text-[13px] mt-1.5 line-clamp-2 leading-relaxed flex-1">
                {post.description}
              </p>

              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-1.5 text-text-light text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{post.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-light text-xs">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
              </div>

              <hr className="border-border my-3" />

              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold text-[13px]"
              >
                Contact Poster
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
