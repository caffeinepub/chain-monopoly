import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AuthGuard } from "./components/AuthGuard";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

// Lazy-load pages
const LobbyPage = lazy(() => import("./pages/LobbyPage"));
const GamePage = lazy(() => import("./pages/GamePage"));

const PageFallback = () => (
  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="lg" label="Loading…" />
  </div>
);

// Root route — wraps all pages in Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Lobby route — public
const lobbyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LobbyPage />
    </Suspense>
  ),
});

// Game route — protected
const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game/$gameId",
  component: () => (
    <AuthGuard>
      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <GamePage />
        </Suspense>
      </ErrorBoundary>
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([lobbyRoute, gameRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
