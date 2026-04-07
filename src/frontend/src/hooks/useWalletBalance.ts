import { useEffect, useState } from "react";
import type { WalletBalance } from "../types/game";
import { useAuth } from "./useAuth";

// ICP ledger canister constants
const ICP_DECIMALS = BigInt(100_000_000); // 1 ICP = 10^8 e8s
const CKBTC_DECIMALS = BigInt(100_000_000); // 1 ckBTC = 10^8 satoshis

function formatE8s(e8s: bigint): bigint {
  return e8s / ICP_DECIMALS;
}

export function useWalletBalance(): WalletBalance {
  const { isAuthenticated } = useAuth();
  const [icp, setIcp] = useState<bigint>(BigInt(0));
  const [ckbtc, setCkbtc] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setIcp(BigInt(0));
      setCkbtc(BigInt(0));
      return;
    }

    let cancelled = false;

    async function fetchBalances() {
      setLoading(true);
      setError(null);
      try {
        // Simulate balance fetch — in production this would call ICP/ckBTC ledger canisters
        // For now return mock balances so the UI is not broken
        await new Promise((r) => setTimeout(r, 600));
        if (!cancelled) {
          setIcp(BigInt(339_658));
          setCkbtc(BigInt(3));
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to fetch balance");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBalances();
    const interval = setInterval(fetchBalances, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  return { icp, ckbtc, loading, error };
}

export { formatE8s, ICP_DECIMALS, CKBTC_DECIMALS };
