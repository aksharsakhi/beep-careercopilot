import React, { useState } from 'react';
import { Sparkles, Mic, Code2, Send, BarChart2, Key, HelpCircle, CheckCircle2 } from 'lucide-react';

export function Header({ activeTab, setActiveTab, isHinglish, setIsHinglish, apiKey, setApiKey }) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <header className="header-container" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(9, 10, 17, 0.85)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top Banner: Shark Tank & Tier 2/3 Mission */}
      <div style={{ background: 'linear-gradient(90deg, #312e81 0%, #1e1b4b 50%, #083344 100%)', padding: '6px 16px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c7d2fe', fontWeight: 500 }}>
          <span className="dot-pulse"></span>
          <span><strong>Beep CareerCopilot</strong> — Engineered for Saurabh Mangrulkar & Founder’s Office</span>
          <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>Shark Tank India Backed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>1M+ Students • 450+ Tier-2/3 Colleges</span>
          <button 
            onClick={() => setShowKeyModal(true)}
            style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#e0e7ff', padding: '3px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}
          >
            <Key size={12} />
            <span>{apiKey ? 'API Key Active' : 'Custom AI Key (Optional)'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}>
            <span style={{ color: '#ffffff', fontWeight: '900', fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>B</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>beep</span>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>CareerCopilot AI</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Turning MCQ Test Badges into Verified Proof-of-Work & Job Offers</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('interview')}
            className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'interview' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeTab === 'interview' ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'interview' ? '0 2px 10px rgba(99, 102, 241, 0.4)' : 'none'
            }}
          >
            <Mic size={16} />
            <span>AI Mock Interviewer</span>
          </button>

          <button
            onClick={() => setActiveTab('proof')}
            className={`tab-btn ${activeTab === 'proof' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'proof' ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'transparent',
              color: activeTab === 'proof' ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'proof' ? '0 2px 10px rgba(6, 182, 212, 0.4)' : 'none'
            }}
          >
            <Code2 size={16} />
            <span>Proof-of-Work Architect</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`tab-btn ${activeTab === 'pitch' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'pitch' ? 'linear-gradient(135deg, #ec4899, #db2777)' : 'transparent',
              color: activeTab === 'pitch' ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'pitch' ? '0 2px 10px rgba(236, 72, 153, 0.4)' : 'none'
            }}
          >
            <Send size={16} />
            <span>Founder Cold Pitch</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'audit' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: activeTab === 'audit' ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'audit' ? '0 2px 10px rgba(16, 185, 129, 0.4)' : 'none'
            }}
          >
            <BarChart2 size={16} />
            <span>Beep Audit & 7-Day Metric</span>
          </button>
        </nav>

        {/* Vernacular / Hinglish Mode Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            onClick={() => setIsHinglish(!isHinglish)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isHinglish ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: isHinglish ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🇮🇳</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isHinglish ? '#fdba74' : 'var(--text-muted)' }}>
              Hinglish Coach: {isHinglish ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      {/* Modal for Custom API Key */}
      {showKeyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ maxWidth: '480px', width: '100%', padding: '28px', background: '#111422', border: '1px solid var(--border-highlight)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color="#818cf8" />
              <span>Configure Gemini / LLM Key</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              The tool includes a built-in intelligent evaluation engine that works 100% out-of-the-box with zero setup! You can optionally provide your own Google Gemini API key to run live cloud inferences.
            </p>
            <input 
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setShowKeyModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveKey}>Save Key</button>
            </div>
          </div>
        </div>
      )}

      {savedNotice && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#10b981', color: '#fff', padding: '10px 18px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <CheckCircle2 size={16} />
          <span>API Key updated successfully</span>
        </div>
      )}
    </header>
  );
}
