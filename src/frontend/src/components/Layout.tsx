import { Link } from "@tanstack/react-router";
import { Coins, LogIn, LogOut, Wifi } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { Button } from "./ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, principal, login, logout, isLoading } = useAuth();
  const { icp, ckbtc, loading: balanceLoading } = useWalletBalance();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
        data-ocid="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span
              className="text-[oklch(var(--mono-yellow))] text-xl"
              aria-hidden="true"
            >
              ⬡
            </span>
            <span className="font-display font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              Chain Monopoly
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div
                className="hidden sm:flex items-center gap-3 text-xs font-mono"
                data-ocid="wallet-balance"
              >
                {balanceLoading ? (
                  <span className="text-muted-foreground animate-pulse">
                    Loading balances…
                  </span>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Coins className="w-3.5 h-3.5 text-[oklch(var(--mono-yellow))]" />
                      <span className="text-foreground font-semibold">
                        {icp.toString()}
                      </span>
                      <span>ICP</span>
                    </span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="w-3.5 h-3.5 rounded-full bg-[oklch(var(--mono-orange))] inline-flex items-center justify-center text-[8px] font-bold text-background leading-none">
                        ₿
                      </span>
                      <span className="text-foreground font-semibold">
                        {ckbtc.toString()}
                      </span>
                      <span>ckBTC</span>
                    </span>
                  </>
                )}
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Wifi className="w-3 h-3 text-[oklch(var(--mono-green))]" />
                  <span className="max-w-[100px] truncate">
                    {principal?.toText().slice(0, 8)}…
                  </span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  aria-label="Log out"
                  data-ocid="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Log out</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="gold"
                size="sm"
                onClick={login}
                loading={isLoading}
                data-ocid="login-btn"
              >
                <LogIn className="w-4 h-4" />
                Log in
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
          <span>
            © {new Date().getFullYear()} Chain Monopoly. All rights reserved.
          </span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
