import React, { useState } from 'react';
import { Header } from './components/Header';
import { MockInterviewer } from './components/MockInterviewer';
import { ProofOfWorkArchitect } from './components/ProofOfWorkArchitect';
import { FounderPitchGenerator } from './components/FounderPitchGenerator';
import { AppReviewAndMetrics } from './components/AppReviewAndMetrics';
import { Sparkles, Mic, Code2, Send, BarChart2, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('interview'); // interview | proof | pitch | audit
  const [isHinglish, setIsHinglish] = useState(true);
  const [apiKey, setApiKey] = useState('');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHinglish={isHinglish}
        setIsHinglish={setIsHinglish}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        {activeTab === 'interview' && (
          <MockInterviewer isHinglish={isHinglish} apiKey={apiKey} />
        )}

        {activeTab === 'proof' && (
          <ProofOfWorkArchitect />
        )}

        {activeTab === 'pitch' && (
          <FounderPitchGenerator />
        )}

        {activeTab === 'audit' && (
          <AppReviewAndMetrics />
        )}
      </main>

      {/* Floating Bottom Quick-Switcher for Mobile / Tablet Viewports */}
      <div style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 18, 30, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-highlight)',
        borderRadius: 'var(--radius-full)',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        zIndex: 40
      }}>
        <button
          onClick={() => setActiveTab('interview')}
          style={{
            background: activeTab === 'interview' ? 'var(--primary)' : 'transparent',
            border: 'none',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Mic size={13} />
          <span>Mock AI</span>
        </button>

        <button
          onClick={() => setActiveTab('proof')}
          style={{
            background: activeTab === 'proof' ? 'var(--secondary)' : 'transparent',
            border: 'none',
            color: activeTab === 'proof' ? '#04202c' : '#ffffff',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Code2 size={13} />
          <span>Proof-of-Work</span>
        </button>

        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            background: activeTab === 'pitch' ? '#ec4899' : 'transparent',
            border: 'none',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Send size={13} />
          <span>Pitcher</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          style={{
            background: activeTab === 'audit' ? '#10b981' : 'transparent',
            border: 'none',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <BarChart2 size={13} />
          <span>Audit & Metrics</span>
        </button>
      </div>

      {/* Global Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(9, 10, 16, 0.95)', padding: '24px 20px', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>Beep CareerCopilot</span> — Built for Saurabh Mangrulkar & Beep Founder's Office Selection.
            <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '2px' }}>Empowering 1M+ Tier 2 & Tier 3 students to build real proof-of-work and crack high-paying tech careers.</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a 
              href="https://play.google.com/store/apps/details?id=com.eventbeep.android" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#818cf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Smartphone size={14} />
              <span>Android App</span>
            </a>
            <a 
              href="https://apps.apple.com/app/id1476715510" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#818cf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Smartphone size={14} />
              <span>iOS App</span>
            </a>
            <span style={{ color: 'var(--text-muted)' }}>Deadline: Sun, 25 Oct 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
