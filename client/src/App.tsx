import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalBackground } from "@/components/global-background";
import { lazy, Suspense, memo } from "react";

const Home = lazy(() => import("@/pages/home"));
const ServicePage = lazy(() => import("@/pages/service"));
const NotFound = lazy(() => import("@/pages/not-found"));

const PageLoader = memo(function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" data-testid="page-loader">
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-12 h-12 rounded-xl animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            boxShadow: '0 0 30px rgba(255, 200, 0, 0.5)'
          }}
        />
        <div className="text-white/60 text-sm">Carregando...</div>
      </div>
    </div>
  );
});

const Router = memo(function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/servico/:id" component={ServicePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

const MemoizedGlobalBackground = memo(GlobalBackground);
const MemoizedToaster = memo(Toaster);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MemoizedGlobalBackground />
        <MemoizedToaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;