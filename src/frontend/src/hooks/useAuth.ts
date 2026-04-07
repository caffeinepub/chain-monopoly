import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";

export interface AuthState {
  isAuthenticated: boolean;
  principal: Principal | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  const { identity, login, clear, loginStatus, isInitializing } =
    useInternetIdentity();

  const isLoading = isInitializing || loginStatus === "logging-in";
  const isAuthenticated = loginStatus === "success" && identity != null;
  const principal = isAuthenticated ? identity!.getPrincipal() : null;

  return {
    isAuthenticated,
    principal,
    login,
    logout: clear,
    isLoading,
  };
}
