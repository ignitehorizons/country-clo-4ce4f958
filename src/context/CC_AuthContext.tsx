import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import {
  getSession,
  signOut as serverSignOut,
  type AuthUser,
  type UserRole,
} from "../lib/auth.functions";

export type { UserRole } from "../lib/auth.functions";

// Keep the same shape the rest of the app already consumes (CC_PortalGuard,
// CC_PortalLayout, CC_FeatureGuard, CC_ApprovalQueue): isReady, user,
// isLoggedIn, userRole, login, logout. The values now come from the real
// Supabase session, not localStorage.

export interface User {
  role: UserRole;
  firstName: string;
  lastName: string;
  initials: string;
}

interface AuthContextType {
  isReady: boolean;
  user: User | null;
  isLoggedIn: boolean;
  userRole: UserRole;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isReady: false,
  user: null,
  isLoggedIn: false,
  userRole: "loggedOut",
  login: () => {},
  logout: () => {},
});

const DEV_CYCLE_ROLES: UserRole[] = [
  "loggedOut",
  "resident",
  "admin",
  "boardMember",
  "developerBuyer",
];

export const CC_AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const restore = useCallback(async () => {
    try {
      const { user } = await getSession();
      setAuthUser(user);
    } catch {
      setAuthUser(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    restore();
  }, [restore]);

  // DEV-only role override so the existing role-cycle button still works in
  // the dev preview. In production this branch is dead code (import.meta.env
  // .DEV is false), so the role always comes from the real session.
  const [devRoleOverride, setDevRoleOverride] = useState<UserRole | null>(null);

  const effectiveRole: UserRole = devRoleOverride ?? authUser?.role ?? "loggedOut";
  const user: User | null = authUser
    ? {
        role: effectiveRole,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        initials: authUser.initials,
      }
    : null;

  const isLoggedIn = !!authUser;
  const userRole: UserRole = user?.role ?? "loggedOut";

  const login = () => {
    // No-op placeholder; real sign-in is handled by the sign-in form in
    // CC_PortalGuard which calls the signIn server function directly.
  };

  const logout = useCallback(async () => {
    await serverSignOut();
    setAuthUser(null);
    setDevRoleOverride(null);
    await restore();
  }, [restore]);

  const cycleRole = () => {
    const base = userRole;
    const idx = DEV_CYCLE_ROLES.indexOf(base);
    const next = DEV_CYCLE_ROLES[(idx + 1) % DEV_CYCLE_ROLES.length] ?? "loggedOut";
    if (next === "loggedOut") {
      setDevRoleOverride(null);
      void logout();
    } else {
      setDevRoleOverride(next);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isReady,
        user,
        isLoggedIn,
        userRole,
        login,
        logout,
      }}
    >
      {children}
      {/* DEV-only role cycle. Hidden in production (import.meta.env.DEV is
          false). Lets QA preview every role without a real account. */}
      {import.meta.env.DEV && (
        <button
          onClick={cycleRole}
          className="opacity-70 hover:opacity-100 transition-opacity"
          style={{
            position: "fixed",
            bottom: "16px",
            left: "16px",
            background: "#4A3728",
            color: "white",
            borderRadius: "4px",
            padding: "6px 12px",
            fontFamily: "Lato, sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
            border: "none",
            cursor: "pointer",
          }}
        >
          DEV: {userRole} {user ? `(${user.firstName})` : ""}
        </button>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
