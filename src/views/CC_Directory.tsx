import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Inbox, MapPin, Phone, Mail } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  fetchCommunityResidents,
  formatDisplayName,
  COUNTRY_CLOSE_COMMUNITY_ID,
  type DirectoryEntry,
} from "@/lib/supabaseClient";

export const CC_Directory = () => {
  const [search, setSearch] = useState("");
  const [residents, setResidents] = useState<DirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await fetchCommunityResidents(COUNTRY_CLOSE_COMMUNITY_ID);
      if (!active) return;
      if (error) {
        setError(error);
        setResidents([]);
      } else {
        setError(null);
        setResidents(data || []);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filteredResidents = residents.filter((r) => {
    const name = formatDisplayName(r).toLowerCase();
    const unit = (r.unit_or_street || "").toLowerCase();
    // Only match on unit/street if it's actually visible (non-null in the view)
    return name.includes(search.toLowerCase()) || (unit && unit.includes(search.toLowerCase()));
  });

  return (
    <div className="w-full min-h-full bg-cream">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 pt-8 gap-4">
        <div>
          <h1 className="font-display font-bold text-[28px] text-bark">Neighbor Directory</h1>
          <p className="font-body font-normal text-[14px] text-text-light">
            Find and connect with your community
          </p>
        </div>

        <div className="w-full md:w-72 relative">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <Input
            placeholder="Search by name or street..."
            className="pl-9 bg-white border-border focus-visible:ring-primary rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* DIRECTORY GRID */}
      <div className="px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl p-8 border border-border shadow-xs text-center max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-[#C0392B] mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-bark mb-2">
              Couldn't load the directory
            </h3>
            <p className="font-body text-sm text-text-light">{error}</p>
          </div>
        ) : filteredResidents.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-border shadow-xs text-center max-w-md mx-auto">
            <Inbox className="w-12 h-12 text-text-light mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-bark mb-2">
              {residents.length === 0 ? "No neighbors yet" : "No matches found"}
            </h3>
            <p className="font-body text-sm text-text-light">
              {residents.length === 0
                ? "Verified residents will appear here once they join Country Close."
                : "Try a different search term."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResidents.map((neighbor) => {
              const name = formatDisplayName(neighbor);
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("");

              // The view returns null for hidden fields — they are simply
              // absent from the card, never shown as blank or "hidden".
              const hasAnyContact =
                neighbor.address || neighbor.unit_or_street || neighbor.phone || neighbor.email;

              return (
                <div
                  key={neighbor.user_id}
                  className="bg-white rounded-xl p-6 shadow-xs border border-border flex flex-col items-center text-center"
                >
                  {neighbor.photo_url ? (
                    <img
                      src={neighbor.photo_url}
                      alt={name}
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-light-gray flex items-center justify-center font-display font-bold text-2xl text-primary mb-4">
                      {initials || "?"}
                    </div>
                  )}
                  <h3 className="font-body font-bold text-bark text-lg mb-1">{name}</h3>

                  <div className="w-full space-y-3 text-left mt-2">
                    {/* Address — only present (non-null) when address_visible */}
                    {neighbor.address && (
                      <div className="flex items-center gap-3 text-sm font-body">
                        <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-text">{neighbor.address}</span>
                      </div>
                    )}
                    {/* Unit/Street — only present when unit_or_street_visible */}
                    {neighbor.unit_or_street && (
                      <div className="flex items-center gap-3 text-sm font-body">
                        <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-text">{neighbor.unit_or_street}</span>
                      </div>
                    )}
                    {/* Phone — only present when phone_visible */}
                    {neighbor.phone && (
                      <div className="flex items-center gap-3 text-sm font-body">
                        <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-text">{neighbor.phone}</span>
                      </div>
                    )}
                    {/* Email — only present when email_visible */}
                    {neighbor.email && (
                      <div className="flex items-center gap-3 text-sm font-body">
                        <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-primary shrink-0">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-text truncate" title={neighbor.email}>
                          {neighbor.email}
                        </span>
                      </div>
                    )}

                    {/* If nothing is visible, show a subtle note */}
                    {!hasAnyContact && (
                      <p className="font-body text-xs text-text-light/70 italic text-center py-2">
                        This neighbor has kept their contact details private.
                      </p>
                    )}
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        tabIndex={0}
                        className="inline-flex w-full mt-6 rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <button
                          type="button"
                          disabled
                          aria-label="Send message (coming soon)"
                          className="w-full py-2 rounded-full border border-primary text-primary opacity-50 cursor-not-allowed font-body font-bold text-sm"
                        >
                          Send Message
                        </button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Coming soon</TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CC_Directory;
