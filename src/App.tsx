import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import PDFLibrary from "./pages/PDFLibrary";
import StudySession from "./pages/StudySession";
import { EnhancedNotesPage } from "./components/notes/EnhancedNotesPage";
import Exercises from "./pages/Exercises";
import EnhancedGoals from "./pages/EnhancedGoals";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="topics" element={<Topics />} />
            <Route path="pdfs" element={<PDFLibrary />} />
            <Route path="study" element={<StudySession />} />
            <Route path="goals" element={<EnhancedGoals />} />
            <Route path="notes" element={<EnhancedNotesPage />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
