const FEATURE_FLAGS: Record<string, boolean> = {
  // TIER: NEIGHBOR (free)
  bulletinBoard: true,
  communityCalendar: true,
  neighborDirectory: true,
  joinForm: true,
  lostAndFound: true,
  petRegistry: true,
  publicAnnouncements: true,

  // TIER: COMMUNITY ($79/mo)
  maintenanceRequests: true,
  safetyAlerts: true,
  marketplace: true,
  documentLibrary: true,
  sponsorDirectory: true,
  carpoolBoard: true,
  toolLibrary: true,
  packageAlerts: true,
  emergencyRegistry: true,

  // TIER: ASSOCIATION ($199/mo)
  violationTracking: true,
  votingAndPolls: true,
  boardMeetingHub: true,
  duesTracking: true,
  amenityBooking: true,
  multiAdminRoles: true,
  reportingDashboard: true,
  sentimentModeration: true,

  // TIER: DEVELOPER ($799/mo)
  constructionTracker: true,
  preSalePage: true,
  warrantyPortal: true,
  rentalApplications: true,
  lotMap: true,
  designCenter: true,

  // TIER: ENTERPRISE
  aiAssistant: true,
  visitorGateManagement: true,
  goKollabApp: true,

  // ADD-ONS
  mobileApp: true,
  localBusinessSponsors: true,
};

export default FEATURE_FLAGS;
