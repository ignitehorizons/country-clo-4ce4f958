import FEATURE_FLAGS from "../config/featureFlags";

export function useFeature(featureName: keyof typeof FEATURE_FLAGS) {
  return FEATURE_FLAGS[featureName] === true;
}
