import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, FileText, ArrowLeft, ArrowRight } from "lucide-react";

import navConfigRaw from "./nav-config.json";
import { MarkdownViewer } from "./components/MarkdownViewer";

// Define the shape of our config
type NavItem = {
  path: string;
  title: string;
  parent: string;
  nav_order: number;
};
const navConfig = navConfigRaw as Record<string, NavItem[]>;

// Flatten into a sequential list for prev/next buttons
const allPages = Object.values(navConfig).flat();

const Sidebar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) => {
  const sections = Object.keys(navConfig);

  return (
    <aside className="w-64 border-r border-border h-screen sticky top-0 overflow-y-auto p-8 hidden md:block">
      <nav>
        {sections.map(section => (
          <div key={section}>
            <div className="section-header">{section}</div>
            <ul className="space-y-1 mb-6">
              {navConfig[section].map(link => (
                <li key={link.path}>
                  <button
                    onClick={() => setCurrentPage(link.path)}
                    className={`sidebar-link w-full text-left ${currentPage === link.path ? "active" : ""}`}
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-brand text-bg w-8 h-8 flex items-center justify-center font-bold rounded">A</div>
        <span className="font-display font-bold tracking-tighter text-lg">ADTYA_DASH</span>
      </div>

      <div className="flex items-center gap-8">
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#" className="text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors">Gallery</a>
          <a href="#" className="text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors">Workspace</a>
          <a href="#" className="text-xs uppercase tracking-widest text-white">Docs</a>
          <a href="#" className="text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors">Contact</a>
        </nav>
        <div className="h-4 w-[1px] bg-border hidden lg:block" />
        <button className="flex items-center gap-2 border border-border px-4 py-1.5 rounded text-xs uppercase tracking-widest hover:bg-white hover:text-bg transition-all">
          <Lock size={14} />
          Login
        </button>
      </div>
    </header>
  );
};

export default function App() {
  // Try to load /docs/index.md primarily, fallback to first page
  const defaultPage = allPages.find(p => p.path === '/docs/index.md')?.path || allPages[0]?.path || "";
  const [currentPage, setCurrentPage] = useState<string>(defaultPage);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Find prev/next
  const currentIndex = allPages.findIndex(p => p.path === currentPage);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-hidden flex flex-col">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {currentPage ? (
                <MarkdownViewer path={currentPage} />
              ) : (
                <div className="glass-card text-center p-12">No documentation files found. Run the generator script.</div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Footer */}
          {currentPage && (
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm font-mono uppercase tracking-widest">
              {prevPage ? (
                <button onClick={() => setCurrentPage(prevPage.path)} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-left max-w-[45%]">
                  <ArrowLeft size={16} />
                  <span className="truncate">{prevPage.title}</span>
                </button>
              ) : <div />}

              {nextPage ? (
                <button onClick={() => setCurrentPage(nextPage.path)} className="flex items-center gap-2 text-brand hover:text-brand/80 transition-colors text-right max-w-[45%]">
                  <span className="truncate">{nextPage.title}</span>
                  <ArrowRight size={16} />
                </button>
              ) : <div />}
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-border py-8 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-widest">
            <span className="font-bold text-white">ADTYA_DASH</span>
            <span>© 2026</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-white text-xs uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-text-muted hover:text-white text-xs uppercase tracking-widest transition-colors">Terms</a>
            <a href="#" className="text-text-muted hover:text-white text-xs uppercase tracking-widest transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
