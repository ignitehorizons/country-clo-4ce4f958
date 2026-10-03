import React, { createContext, useState, useContext, useEffect } from "react";

export type UserRole =
  "loggedOut" | "resident" | "admin" | "boardMember" | "blockCaptain" | "developerBuyer" | "vendor";

export interface User {
  role: UserRole;
  firstName: string;
  lastName: string;
  initials: string;
}

const mockUsers: Record<string, User> = {
  resident: {
    firstName: "Jeremy",
    lastName: "Sidlauskas",
    initials: "JS",
    role: "resident",
  },
  admin: {
    firstName: "Jeremy",
    lastName: "Sidlauskas",
    initials: "JS",
    role: "admin",
  },
  boardMember: {
    firstName: "Jeremy",
    lastName: "Sidlauskas",
    initials: "JS",
    role: "boardMember",
  },
  developerBuyer: {
    firstName: "Jeremy",
    lastName: "Sidlauskas",
    initials: "JS",
    role: "developerBuyer",
  },
  blockCaptain: {
    firstName: "Jeremy",
    lastName: "Sidlauskas",
    initials: "JS",
    role: "blockCaptain",
  },
  vendor: {
    firstName: "Jeremy",
    lastName: "Sidlauskas",
    initials: "JS",
    role: "vendor",
  },
};

const CYCLE_ROLES: UserRole[] = ["loggedOut", "resident", "admin", "boardMember", "developerBuyer"];

interface AuthContextType {
  isReady: boolean;
  user: User | null;
  isLoggedIn: boolean;
  userRole: UserRole;
  login: (role?: UserRole) => void;
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

export const CC_AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Starts logged out on the server and on first client render (so the
  // server HTML and hydration match), then restores the saved session.
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("loggedOut");

  useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem("cc_dev_logged_in") === "true");
      setUserRole((localStorage.getItem("cc_dev_role") as UserRole | null) ?? "loggedOut");
    } catch {
      // Storage blocked (private mode) — stay logged out.
    }
    setIsReady(true);
  }, []);

  const login = (role: UserRole = "resident") => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("cc_dev_logged_in", "true");
    localStorage.setItem("cc_dev_role", role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole("loggedOut");
    localStorage.setItem("cc_dev_logged_in", "false");
    localStorage.setItem("cc_dev_role", "loggedOut");
  };

  const cycleRole = () => {
    const idx = CYCLE_ROLES.indexOf(userRole);
    const nextRole = CYCLE_ROLES[(idx + 1) % CYCLE_ROLES.length] || "loggedOut";
    if (nextRole === "loggedOut") {
      logout();
    } else {
      login(nextRole);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isReady,
        user: isLoggedIn && userRole !== "loggedOut" ? (mockUsers[userRole] ?? null) : null,
        isLoggedIn,
        userRole,
        login,
        logout,
      }}
    >
      {children}
      {/* TODO: Remove DEV toggle before production deployment */}
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
          DEV: {userRole}{" "}
          {isLoggedIn && userRole !== "loggedOut"
            ? `(${mockUsers[userRole]?.firstName || "Jeremy"})`
            : ""}
        </button>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
