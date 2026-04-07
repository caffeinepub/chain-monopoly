import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          "rounded-full border-border border-t-primary animate-spin",
          sizeMap[size],
        )}
        aria-hidden="true"
      />
      {label && (
        <p className="text-sm text-muted-foreground font-body">{label}</p>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
