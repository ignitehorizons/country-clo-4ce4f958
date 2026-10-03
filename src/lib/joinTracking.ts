/**
 * Sends the join form submission to the CRM external-tracking endpoint.
 * Fire-and-forget — failures are swallowed so they never block the
 * Supabase application submission.
 */
export interface JoinTrackingData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  residentType?: string;
  householdSize?: string;
  hasPets: boolean;
  petName?: string;
  petBreed?: string;
  selectedSkills: string[];
  visibility: string;
  emergencyOptIn: boolean;
  emergencyName?: string;
  emergencyPhone?: string;
  mobilityLimitations: boolean;
  medicalConditions: boolean;
  howDidYouHear?: string;
}

export function trackJoinSubmission(data: JoinTrackingData) {
  const trackingPayload = {
    type: "external_form_submission",
    timestamp: Date.now(),
    formId: "Join Community Form",
    formData: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      "contact.resident_type": data.residentType,
      "contact.household_size": data.householdSize,
      "contact.has_pets": data.hasPets ? "Yes" : "No",
      "contact.pet_name": data.petName,
      "contact.pet_breed": data.petBreed,
      "contact.skills__interests": data.selectedSkills.join(", "),
      "contact.directory_visibility": data.visibility,
      "contact.emergency_optin": data.emergencyOptIn ? "Yes" : "No",
      "contact.emergency_contact_name": data.emergencyName,
      "contact.emergency_contact_phone": data.emergencyPhone,
      "contact.mobility_limitations": data.mobilityLimitations ? "Yes" : "No",
      "contact.medical_conditions": data.medicalConditions ? "Yes" : "No",
      "contact.how_did_you_hear": data.howDidYouHear,
    },
    formLabels: {
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email Address",
      phone: "Cell Phone",
      address: "Street Address",
      "contact.resident_type": "Resident Type",
      "contact.household_size": "Household Size",
      "contact.has_pets": "Has Pets",
      "contact.pet_name": "Pet Name",
      "contact.pet_breed": "Pet Breed",
      "contact.skills__interests": "Skills & Interests",
      "contact.directory_visibility": "Directory Visibility",
      "contact.emergency_optin": "Emergency Opt-In",
      "contact.emergency_contact_name": "Emergency Contact Name",
      "contact.emergency_contact_phone": "Emergency Contact Phone",
      "contact.mobility_limitations": "Mobility Limitations",
      "contact.medical_conditions": "Medical Conditions",
      "contact.how_did_you_hear": "How Did You Hear",
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
