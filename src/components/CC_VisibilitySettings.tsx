import { useState } from "react";
import { Loader2, AlertCircle, Check, ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { updateVisibility, type VisibilityField } from "@/lib/supabaseClient";

// Fields that require a confirmation modal before being toggled ON.
const CONFIRM_FIELDS: VisibilityField[] = ["address_visible", "phone_visible", "email_visible"];

const FIELD_LABELS: Record<VisibilityField, string> = {
  address_visible: "Street Address",
  unit_or_street_visible: "Unit / Street",
  phone_visible: "Phone Number",
  email_visible: "Email Address",
  photo_visible: "Profile Photo",
  display_name_mode: "Display Name",
};

const DISPLAY_NAME_OPTIONS = [
  { value: "First Name + Last Initial", label: "First Name + Last Initial" },
  { value: "Full Name", label: "Full Name" },
] as const;

interface PendingConfirm {
  field: VisibilityField;
}

interface FieldState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const CC_VisibilitySettings = ({
  userId,
  initial,
}: {
  userId: string;
  initial: {
    address_visible: boolean;
    unit_or_street_visible: boolean;
    phone_visible: boolean;
    email_visible: boolean;
    photo_visible: boolean;
    display_name_mode: string;
  };
}) => {
  const [values, setValues] = useState(initial);
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>({});
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null);

  const setFieldState = (field: string, s: Partial<FieldState>) => {
    setFieldStates((prev) => ({
      ...prev,
      [field]: {
        loading: false,
        error: null,
        success: false,
        ...prev[field],
        ...s,
      },
    }));
  };

  const callUpdate = async (field: VisibilityField, newValue: boolean | string) => {
    setFieldState(field, { loading: true, error: null, success: false });
    const result = await updateVisibility({
      user_id: userId,
      field,
      new_value: newValue,
    });

    if (!result.ok) {
      setFieldState(field, {
        loading: false,
        error:
          typeof result.error === "string" ? result.error : "Failed to update visibility setting.",
        success: false,
      });
      // revert local value
      setValues((v) => ({ ...v, [field]: initial[field] }));
      return;
    }

    setFieldState(field, { loading: false, error: null, success: true });
    // clear success after a moment
    setTimeout(() => setFieldState(field, { success: false }), 2500);
  };

  const handleToggle = (field: VisibilityField, next: boolean) => {
    // If turning ON a confirm-required field, show the modal first.
    if (next && CONFIRM_FIELDS.includes(field)) {
      setPendingConfirm({ field });
      return;
    }
    // Otherwise (turning OFF, or non-confirm field) update immediately.
    setValues((v) => ({ ...v, [field]: next }));
    void callUpdate(field, next);
  };

  const confirmPending = () => {
    if (!pendingConfirm) return;
    const { field } = pendingConfirm;
    setValues((v) => ({ ...v, [field]: true }));
    void callUpdate(field, true);
    setPendingConfirm(null);
  };

  const cancelPending = () => {
    setPendingConfirm(null);
  };

  const handleDisplayNameChange = (value: string) => {
    setValues((v) => ({ ...v, display_name_mode: value }));
    void callUpdate("display_name_mode", value);
  };

  const booleanFields: VisibilityField[] = [
    "address_visible",
    "unit_or_street_visible",
    "phone_visible",
    "email_visible",
    "photo_visible",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-bold text-xl text-bark mb-2">Privacy & Visibility</h3>
        <p className="font-body text-sm text-text-light mb-6">
          Control what other verified residents in Country Close can see on your profile. Hidden
          fields won't appear at all — not even as blank.
        </p>
      </div>

      {/* Display Name Mode dropdown */}
      <div className="space-y-2">
        <label htmlFor="display_name_mode" className="font-body font-bold text-text">
          Display Name
        </label>
        <p className="font-body text-xs text-text-light mb-2">
          How your name appears to other residents
        </p>
        <select
          id="display_name_mode"
          value={values.display_name_mode}
          onChange={(e) => handleDisplayNameChange(e.target.value)}
          disabled={fieldStates["display_name_mode"]?.loading}
          className="w-full max-w-md p-3 rounded-lg border border-border bg-cream font-body text-text focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        >
          {DISPLAY_NAME_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {fieldStates["display_name_mode"]?.error && (
          <p className="font-body text-xs text-[#C0392B] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {fieldStates["display_name_mode"].error}
          </p>
        )}
        {fieldStates["display_name_mode"]?.success && (
          <p className="font-body text-xs text-primary flex items-center gap-1">
            <Check className="w-3 h-3" />
            Saved
          </p>
        )}
      </div>

      <div className="border-t border-border pt-6 space-y-1">
        {booleanFields.map((field) => {
          const fs = fieldStates[field];
          const isConfirm = CONFIRM_FIELDS.includes(field);
          return (
            <div
              key={field}
              className="flex items-start justify-between py-4 border-b border-border/60 last:border-0"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-body font-bold text-text">{FIELD_LABELS[field]}</h4>
                  {isConfirm && <ShieldAlert className="w-4 h-4 text-accent" />}
                </div>
                <p className="font-body text-sm text-text-light">
                  {values[field] ? "Visible to other residents" : "Hidden from other residents"}
                </p>
                {fs?.error && (
                  <p className="font-body text-xs text-[#C0392B] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {fs.error}
                  </p>
                )}
                {fs?.success && (
                  <p className="font-body text-xs text-primary flex items-center gap-1 mt-1">
                    <Check className="w-3 h-3" />
                    Updated
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {fs?.loading && <Loader2 className="w-4 h-4 animate-spin text-text-light" />}
                <Switch
                  checked={Boolean(values[field])}
                  onCheckedChange={(next) => handleToggle(field, next)}
                  disabled={fs?.loading}
                  aria-label={`Toggle ${FIELD_LABELS[field]} visibility`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {pendingConfirm && (
        <div
          className="fixed inset-0 z-2000 flex items-center justify-center p-4"
          style={{ background: "rgba(45,80,22,0.4)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 id="confirm-title" className="font-display font-bold text-xl text-bark mb-2">
                  Share your {FIELD_LABELS[pendingConfirm.field].toLowerCase()}?
                </h3>
                <p className="font-body text-sm text-text-light leading-relaxed">
                  You are about to make your{" "}
                  <span className="font-bold text-text">
                    {FIELD_LABELS[pendingConfirm.field].toLowerCase()}
                  </span>{" "}
                  visible to other verified residents in this community. CountryClose does not share
                  or sell your personal information without your express permission. This setting
                  controls visibility to other residents only, and you may disable it at any time.
                  Once shared, CountryClose cannot retrieve or delete copies other residents may
                  have already saved.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelPending}
                className="px-6 py-2.5 rounded-full border border-border font-body font-bold text-sm text-text-light hover:bg-light-gray transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPending}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-body font-bold text-sm hover:bg-primary-light transition-colors"
              >
                Confirm — Share my{" "}
                {FIELD_LABELS[pendingConfirm.field].toLowerCase().replace(" / ", "-")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CC_VisibilitySettings;
