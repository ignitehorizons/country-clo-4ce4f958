import { useCallback, useEffect, useState } from "react";
import { Check, X, Loader2, RefreshCw, AlertCircle, Inbox } from "lucide-react";
import { useAuth } from "@/context/CC_AuthContext";
import {
  approveVerification,
  fetchPendingVerifications,
  fetchResident,
  COUNTRY_CLOSE_COMMUNITY_ID,
  formatDisplayName,
  type VerificationRequest,
  type DirectoryEntry,
} from "@/lib/supabaseClient";

interface EnrichedRequest extends VerificationRequest {
  applicant?: DirectoryEntry | null;
}

type DecisionState = {
  [id: string]: { status: "idle" | "loading" | "done"; decision?: string };
};

export const CC_ApprovalQueue = () => {
  const { user, userRole } = useAuth();
  const [requests, setRequests] = useState<EnrichedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<DecisionState>({});
  const [lastResult, setLastResult] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await fetchPendingVerifications(COUNTRY_CLOSE_COMMUNITY_ID);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Enrich each request with the applicant's directory entry (for display).
    // NOTE: the community_directory view hides fields per the applicant's
    // visibility settings. For an admin/board approval queue we want the full
    // applicant contact info regardless of visibility — but since the raw
    // `users` table is RLS-locked to anon, we use whatever the view exposes.
    const enriched: EnrichedRequest[] = [];
    for (const req of data || []) {
      let applicant: DirectoryEntry | null = null;
      if (req.user_id) {
        const { data: u } = await fetchResident(req.user_id);
        applicant = u;
      }
      enriched.push({ ...req, applicant });
    }
    setRequests(enriched);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDecision = async (req: EnrichedRequest, decision: "Approved" | "Denied") => {
    if (!req.user_id) return;
    // The reviewer is now derived from the signed-in user's access token
    // server-side; no reviewer_user_id is sent from the client.

    setDecisions((d) => ({
      ...d,
      [req.id]: { status: "loading", decision },
    }));

    const result = await approveVerification({
      verification_request_id: req.id,
      decision,
    });

    if (!result.ok) {
      setDecisions((d) => ({ ...d, [req.id]: { status: "idle" } }));
      setLastResult(
        `Error ${decision === "Approved" ? "approving" : "denying"} application: ${result.error}`,
      );
      return;
    }

    setDecisions((d) => ({
      ...d,
      [req.id]: { status: "done", decision },
    }));
    setLastResult(
      `Application ${decision.toLowerCase()} successfully. Verification request id: ${req.id}`,
    );
  };

  const isBoardOrAdmin =
    userRole === "admin" || userRole === "boardMember" || userRole === "blockCaptain";

  if (!isBoardOrAdmin) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-border shadow-xs text-center">
          <AlertCircle className="w-12 h-12 text-text-light mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-bark mb-2">Board Members Only</h2>
          <p className="font-body text-text-light">
            You need board member or admin access to review resident applications. Switch to the
            Board Member role using the DEV toggle to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-bark mb-2">Approval Queue</h1>
          <p className="font-body text-text-light text-lg">
            Review pending resident applications for Country Close
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-text-light hover:text-primary hover:border-primary transition-colors font-body font-bold text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {lastResult && (
        <div className="mb-6 bg-primary/6 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="font-body text-sm text-text">{lastResult}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl p-8 border border-border shadow-xs text-center">
          <AlertCircle className="w-12 h-12 text-[#C0392B] mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl text-bark mb-2">
            Couldn't load applications
          </h3>
          <p className="font-body text-text-light mb-4">{error}</p>
          <button
            onClick={load}
            className="px-6 py-2 rounded-full bg-primary text-white font-body font-bold text-sm hover:bg-primary-light transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border shadow-xs text-center">
          <Inbox className="w-12 h-12 text-text-light mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl text-bark mb-2">No pending applications</h3>
          <p className="font-body text-text-light">
            All caught up! New resident applications will appear here for review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const decision = decisions[req.id];
            const isDone = decision?.status === "done";
            const isLoading = decision?.status === "loading";
            const applicantName = req.applicant
              ? formatDisplayName(req.applicant)
              : "Unknown Applicant";

            return (
              <div key={req.id} className="bg-white rounded-2xl p-6 border border-border shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary font-body font-bold text-xs px-2.5 py-1 rounded-full">
                        Pending
                      </span>
                      {req.mode_used && (
                        <span className="bg-light-gray text-text-light font-body font-bold text-xs px-2.5 py-1 rounded-full">
                          {req.mode_used}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-bark mb-1">
                      {applicantName}
                    </h3>
                    {req.applicant?.email && (
                      <p className="font-body text-sm text-text-light mb-1">
                        {req.applicant.email}
                      </p>
                    )}
                    {req.applicant?.phone && (
                      <p className="font-body text-sm text-text-light mb-1">
                        {req.applicant.phone}
                      </p>
                    )}
                    {req.applicant?.address && (
                      <p className="font-body text-sm text-text-light mb-1">
                        {req.applicant.address}
                      </p>
                    )}
                    <p className="font-body text-xs text-text-light/70 mt-2">
                      Submitted:{" "}
                      {req.submitted_at ? new Date(req.submitted_at).toLocaleString() : "—"}
                    </p>
                    <p className="font-body text-xs text-text-light/70 font-mono mt-1">
                      Request ID: {req.id}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {isDone ? (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-body font-bold text-sm">
                        <Check className="w-4 h-4" />
                        {decision.decision}
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDecision(req, "Approved")}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-body font-bold text-sm hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading && decision?.decision === "Approved" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecision(req, "Denied")}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C0392B] text-[#C0392B] font-body font-bold text-sm hover:bg-[#C0392B] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading && decision?.decision === "Denied" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                          Deny
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CC_ApprovalQueue;
