import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Cpu,
  Database,
  Globe,
  Sparkles,
  Loader2,
  ChevronRight,
  Code,
  User,
  Menu,
  X
} from 'lucide-react';

// --- Configuration ---
const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
const GEN_MODEL = process.env.REACT_APP_GEMINI_MODEL || "gemini-1.5-flash";
const USER_EMAIL = "eakuma519@gmail.com";
const GITHUB_URL = "https://github.com/maxxii22";
const LINKEDIN_URL = "https://www.linkedin.com/in/emmanuel-akuma-31a922350/";

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // AI States
  const [explanation, setExplanation] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);

  const pythonSnippet = `class SystemsEngineer:
    def __init__(self):
        self.name = "Emmanuel Akuma"
        self.expertise = ["CPython", "Distributed Systems"]

    def optimize_concurrency(self, task_load):
        # Bypassing the GIL with multiprocessing 
        # for CPU-bound efficiency
        import multiprocessing
        with multiprocessing.Pool() as pool:
            return pool.map(self.process, task_load)`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const callGemini = async (prompt) => {
    if (!apiKey) {
      throw new Error('Missing API key. Set REACT_APP_GEMINI_API_KEY in your environment.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEN_MODEL}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: "You are a senior technical architect explaining low-level Python concepts to a recruiter." }] }
    };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'unknown error');
          throw new Error(`API error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (e) {
        clearTimeout(timeoutId);
        if (i === 4) throw e;
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  };

  const explainLogic = async () => {
    setIsExplaining(true);
    setExplanation("");
    try {
      const result = await callGemini(`Explain this code and the significance of bypassing the GIL: \n${pythonSnippet}`);
      setExplanation(result || "No explanation returned. Please try again.");
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setExplanation(`API connection failed: ${message}`);
    } finally {
      setIsExplaining(false);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Advanced Python Interpreter Analysis",
      desc: "A deep-dive tool analyzing CPython's Global Interpreter Lock (GIL) behavior and memory interning.",
      tech: ["Python", "C++", "Memory Profilers"]
    },
    {
      id: 2,
      title: "Automated Study Systems",
      desc: "AI-powered application generating structured study guides and active-recall flashcards from docs.",
      tech: ["React", "Node.js", "Gemini API"]
    },
    {
      id: 3,
      title: "Distributed Task Queue",
      desc: "High-concurrency system designed to bypass standard performance bottlenecks using multiprocessing.",
      tech: ["Python", "Redis", "Docker"]
    }
  ];

  const SectionHeading = ({ children }) => (
    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
      <span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>
      {children}
    </h2>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4' : 'py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-blue-500">E.AKUMA</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['home', 'projects', 'about', 'contact'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  const el = document.getElementById(tab);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white capitalize transition-colors"
              >
                {tab}
              </button>
            ))}
          </div>
          <button aria-label="Toggle mobile navigation menu" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-sm py-4">
          <div className="max-w-6xl mx-auto px-6 flex flex-col gap-3">
            {['home', 'projects', 'about', 'contact'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  const el = document.getElementById(tab);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="text-left text-slate-300 hover:text-white capitalize text-base font-medium"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="home" className="pt-32 pb-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
            <Cpu size={14} /> SYSTEMS ARCHITECT
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            Emmanuel <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">Akuma</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-lg mb-8 leading-relaxed">
            Engineering high-performance distributed systems and full-stack applications with a focus on CPython internals and AI integration.
          </p>
          <div className="flex gap-4">
            <a href={GITHUB_URL} aria-label="GitHub profile" className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all">
              <Github />
            </a>
            <a href={LINKEDIN_URL} aria-label="LinkedIn profile" className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all">
              <Linkedin />
            </a>
            <a href={`mailto:${USER_EMAIL}`} aria-label="Email contact" className="px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <button
                onClick={explainLogic}
                disabled={isExplaining}
                aria-label="Explain Python logic with AI"
                className="flex items-center gap-2 text-xs font-bold bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all disabled:opacity-50"
              >
                {isExplaining ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                Explain Code
              </button>
            </div>
            <pre className="text-sm font-mono text-blue-300 leading-relaxed overflow-x-auto">
              <code>{pythonSnippet}</code>
            </pre>
            {explanation && (
              <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-blue-500/30 text-xs text-slate-300 leading-relaxed animate-in fade-in slide-in-from-top-2">
                <div className="text-blue-400 font-bold mb-2 uppercase tracking-widest">AI Technical Breakdown:</div>
                {explanation}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading>Featured Projects</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.id} className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group">
              <div className="mb-6 w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-slate-800 text-[10px] font-bold text-slate-300 rounded uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading>Technical Expertise</SectionHeading>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I specialize in bridging the gap between high-level application logic and low-level system performance. My work often involves optimizing Python environments where standard threading isn't enough.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Code />, text: "React & Next.js" },
                { icon: <Database />, text: "Redis & PostgreSQL" },
                { icon: <Terminal />, text: "CPython Internals" },
                { icon: <Globe />, text: "Distributed Systems" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                  <span className="text-blue-500">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center">
              <User size={120} className="text-slate-600" role="img" aria-label="User avatar placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to build something <span className="text-blue-500 underline decoration-2 underline-offset-8">scalable?</span></h2>
          <div className="flex justify-center gap-6 mb-12">
            <a href={GITHUB_URL} aria-label="GitHub profile" className="text-slate-400 hover:text-white transition-colors"><Github size={28} /></a>
            <a href={LINKEDIN_URL} aria-label="LinkedIn profile" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={28} /></a>
            <a href={`mailto:${USER_EMAIL}`} aria-label="Send email" className="text-slate-400 hover:text-white transition-colors"><Mail size={28} /></a>
          </div>
          <p className="text-slate-600 text-sm font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} EMMANUEL AKUMA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;