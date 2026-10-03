import { useState } from "react";
import { Link } from "@/lib/router-compat";
import { Check, Hand, Lock, Loader2, AlertCircle } from "lucide-react";
import { useJoinSubmission } from "@/hooks/useJoinSubmission";
import { trackJoinSubmission } from "@/lib/joinTracking";

const SKILLS = [
  "Electrician",
  "Plumber",
  "HVAC",
  "Landscaping",
  "Carpentry",
  "Painting",
  "Babysitter",
  "Childcare",
  "Elder Care",
  "Pet Sitting",
  "Dog Walking",
  "Tutoring",
  "Medical Professional",
  "Nurse / EMT",
  "Attorney",
  "Accountant",
  "Real Estate",
  "IT / Tech Support",
  "Chef / Catering",
  "Photography",
  "Music Lessons",
  "Personal Training",
  "Notary",
  "Handyman",
  "Other",
];

export const CC_JoinForm = () => {
  const { state: submitState, submit } = useJoinSubmission();
  const [hasPets, setHasPets] = useState(false);
  const [emergencyOptIn, setEmergencyOptIn] = useState(false);
  const [mobilityLimitations, setMobilityLimitations] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstName = (document.getElementById("firstName") as HTMLInputElement)?.value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const phone = (document.getElementById("phone") as HTMLInputElement)?.value;
    const address = (document.getElementById("address") as HTMLInputElement)?.value;
    const residentType = (document.getElementById("residentType") as HTMLSelectElement)?.value;
    const householdSize = (document.getElementById("householdSize") as HTMLInputElement)?.value;
    const petName = (document.getElementById("petName") as HTMLInputElement)?.value;
    const petBreed = (document.getElementById("petBreed") as HTMLInputElement)?.value;
    const emergencyName = (document.getElementById("emergencyName") as HTMLInputElement)?.value;
    const emergencyPhone = (document.getElementById("emergencyPhone") as HTMLInputElement)?.value;
    const howDidYouHear = (document.getElementById("howDidYouHear") as HTMLSelectElement)?.value;

    trackJoinSubmission({
      firstName,
      lastName,
      email,
      phone,
      address,
      residentType,
      householdSize,
      hasPets,
      petName,
      petBreed,
      selectedSkills,
      visibility,
      emergencyOptIn,
      emergencyName,
      emergencyPhone,
      mobilityLimitations,
      medicalConditions,
      howDidYouHear,
    });

    await submit({ firstName, lastName, email, phone, address });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClass =
    "w-full p-[12px_16px] border border-[#DDD5C8] rounded-[8px] font-body text-[15px] text-[#3D3229] bg-white focus:border-[#E8A020] focus:outline-hidden focus:ring-[3px] focus:ring-[#E8A020]/15 transition-all";
  const labelClass =
    "block font-body font-bold text-[13px] text-[#4A3728] tracking-[0.5px] uppercase mb-[6px]";
  const requiredAsterisk = <span className="text-[#E8A020] ml-1">*</span>;

  const isSubmitting = submitState.status === "submitting";
  const isSuccess = submitState.status === "success";
  const isError = submitState.status === "error";

  return (
    <div className="bg-white rounded-[16px] p-6 md:p-[48px_40px] shadow-[0_4px_20px_rgba(45,80,22,0.08)] border border-[#DDD5C8]">
      {isSuccess ? (
        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-[#2D5016]/10 text-[#2D5016] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="font-display font-bold text-[28px] text-[#4A3728] mb-4">
            Application Submitted!
          </h2>
          <p className="font-body text-[16px] text-[#7A6A5A] mb-2 max-w-md mx-auto">
            Your application has been received and is now{" "}
            <span className="font-bold text-[#2D5016]">pending board review</span>. You'll get a
            welcome email once a board member approves your request.
          </p>
          {submitState.verificationRequestId && (
            <p className="font-body text-[13px] text-[#7A6A5A] mb-6">
              Reference ID:{" "}
              <span className="font-mono text-[#4A3728]">{submitState.verificationRequestId}</span>
            </p>
          )}
          <Link
            to="/portal"
            className="inline-block bg-[#E8A020] text-[#4A3728] font-body font-bold text-[18px] py-4 px-8 rounded-full shadow-[0_8px_32px_rgba(232,160,32,0.3)] hover:bg-[#D4911A] hover:-translate-y-0.5 transition-all"
          >
            Go to Member Portal
          </Link>
        </div>
      ) : (
        <>
          <h2 className="font-display font-bold text-[28px] text-[#4A3728] mb-[8px]">
            Create Your Account
          </h2>
          <p className="font-body text-[14px] text-[#7A6A5A] mb-[32px]">
            Free for Country Close residents. Your information is private and shared only within our
            community.
          </p>

          {isError && (
            <div className="mb-[24px] flex items-start gap-3 bg-[#C0392B]/6 border border-[#C0392B]/30 rounded-[8px] p-[16px]">
              <AlertCircle className="w-5 h-5 text-[#C0392B] shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-bold text-[14px] text-[#C0392B] mb-1">
                  We couldn't submit your application
                </p>
                <p className="font-body text-[13px] text-[#7A6A5A]">{submitState.error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[24px]">
            {/* 1. ROW: First Name + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First Name{requiredAsterisk}
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last Name{requiredAsterisk}
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* 2. Email Address */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address{requiredAsterisk}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            {/* 3. Cell Phone */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Cell Phone{requiredAsterisk}
              </label>
              <input
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(555) 555-5555"
                className={inputClass}
              />
            </div>

            {/* 4. Street Address */}
            <div>
              <label htmlFor="address" className={labelClass}>
                Street Address{requiredAsterisk}
              </label>
              <input
                id="address"
                type="text"
                required
                autoComplete="street-address"
                placeholder="Your address on Country Close"
                className={inputClass}
              />
              <p className="mt-2 text-[12px] text-[#7A6A5A] italic font-body">
                Enter your street address within Country Close only
              </p>
            </div>

            {/* 5. Resident Type & 6. Number of People */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <div>
                <label htmlFor="residentType" className={labelClass}>
                  Resident Type{requiredAsterisk}
                </label>
                <select id="residentType" required autoComplete="off" className={inputClass}>
                  <option value="">-- Select One --</option>
                  <option value="homeowner">Homeowner</option>
                  <option value="renter">Renter</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="householdSize" className={labelClass}>
                  Number of People in Household{requiredAsterisk}
                </label>
                <input
                  id="householdSize"
                  type="number"
                  min="1"
                  max="20"
                  required
                  autoComplete="off"
                  className={inputClass}
                />
              </div>
            </div>

            {/* 7. DO YOU HAVE PETS? */}
            <div>
              <label className={labelClass}>Do you have pets?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setHasPets(true)}
                  className={`flex-1 py-[10px] px-[24px] rounded-[8px] font-body text-[15px] transition-all border ${hasPets ? "bg-[#2D5016] text-white border-[#2D5016]" : "bg-white text-[#7A6A5A] border-[#DDD5C8] hover:border-[#2D5016]/50"}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasPets(false)}
                  className={`flex-1 py-[10px] px-[24px] rounded-[8px] font-body text-[15px] transition-all border ${!hasPets ? "bg-[#2D5016] text-white border-[#2D5016]" : "bg-white text-[#7A6A5A] border-[#DDD5C8] hover:border-[#2D5016]/50"}`}
                >
                  No
                </button>
              </div>

              {/* Conditional Pet Fields */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${hasPets ? "max-h-[300px] opacity-100 mt-[16px]" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-[16px] p-1">
                  <div>
                    <label htmlFor="petName" className={labelClass}>
                      Pet Name
                    </label>
                    <input id="petName" type="text" autoComplete="off" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="petBreed" className={labelClass}>
                      Breed & Description
                    </label>
                    <input id="petBreed" type="text" autoComplete="off" className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* 8. SKILLS & INTERESTS */}
            <div>
              <label className={labelClass}>Skills & Interests</label>
              <p className="text-[13px] text-[#7A6A5A] mb-[12px] font-body">
                Help neighbors find you for what you're good at. Select all that apply.
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {SKILLS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-[16px] py-[8px] rounded-full font-body text-[13px] transition-all border ${
                        isSelected
                          ? "bg-[#2D5016] text-white border-[#2D5016]"
                          : "bg-white text-[#7A6A5A] border-[#DDD5C8] hover:border-[#2D5016] hover:text-[#2D5016]"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 9. NEIGHBOR DIRECTORY VISIBILITY */}
            <div>
              <label className={labelClass}>Neighbor Directory</label>
              <p className="text-[13px] text-[#7A6A5A] mb-[12px] font-body">
                Choose how you appear to other residents
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div
                  onClick={() => setVisibility("public")}
                  className={`cursor-pointer rounded-[12px] p-[20px_16px] text-center transition-all border-2 ${
                    visibility === "public"
                      ? "border-[#2D5016] bg-[#2D5016]/4"
                      : "border-[#DDD5C8] bg-white hover:border-[#2D5016]/50"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <Hand className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-body font-bold text-[14px] text-[#4A3728] mb-1">
                    Public Profile
                  </h4>
                  <p className="font-body text-[12px] text-[#7A6A5A]">
                    Visible in the neighbor directory
                  </p>
                </div>

                <div
                  onClick={() => setVisibility("private")}
                  className={`cursor-pointer rounded-[12px] p-[20px_16px] text-center transition-all border-2 ${
                    visibility === "private"
                      ? "border-[#2D5016] bg-[#2D5016]/4"
                      : "border-[#DDD5C8] bg-white hover:border-[#2D5016]/50"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-body font-bold text-[14px] text-[#4A3728] mb-1">
                    Private Profile
                  </h4>
                  <p className="font-body text-[12px] text-[#7A6A5A]">Hidden from directory</p>
                </div>
              </div>
            </div>

            {/* 10. EMERGENCY REGISTRY OPT-IN */}
            <div className="bg-[#2D5016]/4 border-l-4 border-l-[#2D5016] rounded-[0_8px_8px_0] p-[20px]">
              <label
                htmlFor="emergencyOptIn"
                className="flex items-start gap-[12px] cursor-pointer group"
              >
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    id="emergencyOptIn"
                    type="checkbox"
                    checked={emergencyOptIn}
                    onChange={(e) => setEmergencyOptIn(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-[20px] h-[20px] border-2 border-[#DDD5C8] rounded-[4px] bg-white peer-checked:bg-[#2D5016] peer-checked:border-[#2D5016] transition-colors group-hover:border-[#2D5016]/50 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2D5016] peer-focus-visible:ring-offset-2"></div>
                  <Check
                    className="absolute w-[14px] h-[14px] text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                    strokeWidth={3}
                  />
                </div>
                <div>
                  <span className="block font-body font-bold text-[14px] text-[#4A3728] mb-[4px]">
                    Register my household for community emergency services
                  </span>
                  <span className="block font-body text-[13px] text-[#7A6A5A]">
                    Confidential information used only by authorized emergency personnel to assist
                    your household during emergencies.
                  </span>
                </div>
              </label>

              {/* Conditional Emergency Fields */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${emergencyOptIn ? "max-h-[500px] opacity-100 mt-[20px]" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-[16px] pt-2 border-t border-[#2D5016]/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label htmlFor="emergencyName" className={labelClass}>
                        Emergency Contact Name
                      </label>
                      <input
                        id="emergencyName"
                        type="text"
                        autoComplete="off"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyPhone" className={labelClass}>
                        Emergency Contact Phone
                      </label>
                      <input
                        id="emergencyPhone"
                        type="tel"
                        autoComplete="off"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body font-bold text-[13px] text-[#4A3728] mb-2">
                      Any mobility limitations in your household?
                    </label>
                    <div className="flex gap-4 max-w-[200px]">
                      <button
                        type="button"
                        onClick={() => setMobilityLimitations(true)}
                        className={`flex-1 py-[8px] rounded-[8px] font-body text-[14px] transition-all border ${mobilityLimitations ? "bg-[#2D5016] text-white border-[#2D5016]" : "bg-white text-[#7A6A5A] border-[#DDD5C8]"}`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobilityLimitations(false)}
                        className={`flex-1 py-[8px] rounded-[8px] font-body text-[14px] transition-all border ${!mobilityLimitations ? "bg-[#2D5016] text-white border-[#2D5016]" : "bg-white text-[#7A6A5A] border-[#DDD5C8]"}`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-body font-bold text-[13px] text-[#4A3728] mb-2">
                      Any medical conditions first responders should know about?
                    </label>
                    <div className="flex gap-4 max-w-[200px] mb-2">
                      <button
                        type="button"
                        onClick={() => setMedicalConditions(true)}
                        className={`flex-1 py-[8px] rounded-[8px] font-body text-[14px] transition-all border ${medicalConditions ? "bg-[#2D5016] text-white border-[#2D5016]" : "bg-white text-[#7A6A5A] border-[#DDD5C8]"}`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setMedicalConditions(false)}
                        className={`flex-1 py-[8px] rounded-[8px] font-body text-[14px] transition-all border ${!medicalConditions ? "bg-[#2D5016] text-white border-[#2D5016]" : "bg-white text-[#7A6A5A] border-[#DDD5C8]"}`}
                      >
                        No
                      </button>
                    </div>
                    <p className="text-[12px] text-[#7A6A5A] italic font-body">
                      Details are stored privately and never shared publicly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 11. HOW DID YOU HEAR ABOUT US? */}
            <div>
              <label htmlFor="howDidYouHear" className={labelClass}>
                How did you hear about us?
              </label>
              <select id="howDidYouHear" autoComplete="off" className={inputClass}>
                <option value="">-- Select One --</option>
                <option value="neighbor">A neighbor told me</option>
                <option value="social">Social media</option>
                <option value="flyer">Community flyer</option>
                <option value="found">I live here and found it myself</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* 12. TERMS CHECKBOXES */}
            <div className="space-y-[16px]">
              <label htmlFor="terms1" className="flex items-start gap-[12px] cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input id="terms1" type="checkbox" required className="peer sr-only" />
                  <div className="w-[20px] h-[20px] border-2 border-[#DDD5C8] rounded-[4px] bg-white peer-checked:bg-[#2D5016] peer-checked:border-[#2D5016] transition-colors group-hover:border-[#2D5016]/50 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2D5016] peer-focus-visible:ring-offset-2"></div>
                  <Check
                    className="absolute w-[14px] h-[14px] text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                    strokeWidth={3}
                  />
                </div>
                <span className="block font-body text-[14px] text-[#4A3728]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#2D5016] font-bold hover:underline">
                    Community Terms of Use
                  </Link>
                  {requiredAsterisk}
                </span>
              </label>

              <label htmlFor="terms2" className="flex items-start gap-[12px] cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input id="terms2" type="checkbox" required className="peer sr-only" />
                  <div className="w-[20px] h-[20px] border-2 border-[#DDD5C8] rounded-[4px] bg-white peer-checked:bg-[#2D5016] peer-checked:border-[#2D5016] transition-colors group-hover:border-[#2D5016]/50 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2D5016] peer-focus-visible:ring-offset-2"></div>
                  <Check
                    className="absolute w-[14px] h-[14px] text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                    strokeWidth={3}
                  />
                </div>
                <div>
                  <span className="block font-body text-[14px] text-[#4A3728] mb-[4px]">
                    I agree to receive community communications via email and SMS{requiredAsterisk}
                  </span>
                  <span className="block font-body text-[12px] text-[#7A6A5A]">
                    You can update your notification preferences anytime in your profile settings.
                  </span>
                </div>
              </label>
            </div>

            {/* 13. SUBMIT BUTTON */}
            <div className="pt-[8px]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E8A020] text-[#4A3728] font-body font-bold text-[18px] py-[16px] rounded-[100px] shadow-[0_8px_32px_rgba(232,160,32,0.3)] hover:bg-[#D4911A] hover:translate-y-[-2px] transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  "Join the Community"
                )}
              </button>
              <p className="text-center mt-[12px] font-body text-[12px] text-[#7A6A5A] flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Your information is private and only shared within
                Country Close
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
