import { useState } from "react";
import { submitApplication, COUNTRY_CLOSE_COMMUNITY_ID } from "@/lib/supabaseClient";

export interface JoinFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface JoinSubmitState {
  status: "idle" | "submitting" | "success" | "error";
  verificationRequestId: string | null;
  error: string | null;
}

/**
 * Handles submission of the resident application form to the
 * `submit-application` Supabase Edge Function.
 *
 * Keeps CC_Join.tsx thin — this hook owns all the async + state logic.
 */
export function useJoinSubmission() {
  const [state, setState] = useState<JoinSubmitState>({
    status: "idle",
    verificationRequestId: null,
    error: null,
  });

  const reset = () => setState({ status: "idle", verificationRequestId: null, error: null });

  const submit = async (values: JoinFormValues) => {
    setState({
      status: "submitting",
      verificationRequestId: null,
      error: null,
    });

    const result = await submitApplication({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone || undefined,
      address: values.address || undefined,
      community_id: COUNTRY_CLOSE_COMMUNITY_ID,
    });

    if (!result.ok) {
      setState({
        status: "error",
        verificationRequestId: null,
        error:
          typeof result.error === "string"
            ? result.error
            : "We couldn't submit your application. Please try again.",
      });
      return;
    }

    // The edge function returns the created verification request nested under
    // `verification_request.id` (confirmed against the live response).
    const data = result.data as Record<string, unknown> | null;
    const vr = (data?.["verification_request"] as Record<string, unknown> | undefined) ?? undefined;
    const id =
      (vr?.["id"] as string) ||
      (data?.["verification_request_id"] as string) ||
      (data?.["id"] as string) ||
      null;

    setState({
      status: "success",
      verificationRequestId: id,
      error: null,
    });
  };

  return { state, submit, reset };
}
