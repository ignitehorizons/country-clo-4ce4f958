/**
 * Sends a lead-capture form submission to the CRM external-tracking endpoint.
 * Fire-and-forget — failures are swallowed so they never block the UI.
 */
export interface LeadTrackingData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  communityName?: string;
  unitCount?: string;
  role?: string;
  message?: string;
}

export function trackLeadSubmission(data: LeadTrackingData) {
  const trackingPayload = {
    type: "external_form_submission",
    timestamp: Date.now(),
    formId: "Contact / Demo Request",
    formData: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      "contact.community_name": data.communityName,
      "contact.unit_count": data.unitCount,
      "contact.role": data.role,
      "contact.message": data.message,
    },
    formLabels: {
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email Address",
      phone: "Phone",
      "contact.community_name": "Community Name",
      "contact.unit_count": "Number of Units",
      "contact.role": "Your Role",
      "contact.message": "Message",
    },
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    trackingId: "tk_faae8523bf484a41923022470df2cf7b",
    locationId: "fTWpkc2JrzTyLdcaKxJD",
    sessionId: crypto.randomUUID(),
    properties: {
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
    },
  };

  fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      version: "2021-07-28",
    },
    body: JSON.stringify(trackingPayload),
  }).catch(() => {});
}