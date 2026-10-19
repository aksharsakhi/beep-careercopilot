import React, { useState } from 'react';
import { GENERIC_COLLEGE_PROJECTS } from '../data/projectTemplates';
import { Code2, Sparkles, Copy, Check, Terminal, Layers, Calendar, FileText, ArrowRight, ExternalLink } from 'lucide-react';

export function ProofOfWorkArchitect() {
  const [selectedTemplate, setSelectedTemplate] = useState(GENERIC_COLLEGE_PROJECTS[0]);
  const [customProjectName, setCustomProjectName] = useState('');
  const [customRole, setCustomRole] = useState('Full-Stack Engineer');
  const [copiedBullet, setCopiedBullet] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview | code | bullets | roadmap

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(idx);
    setTimeout(() => setCopiedBullet(null), 2500);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Intro Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-cyan">Feature 2 of 3</span>
          <span className="badge badge-purple">Zero Resume Rejections</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Proof-of-Work (PoW) Project Architect</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
          Directly solving <strong>Problem #1 (The MCQ Certificate vs Employability Disconnect)</strong>. Recruiters reject 96% of Tier 2/3 applicants because their resumes list generic classroom projects ("Library Management", "ToDo App"). This tool transforms academic projects into production-grade GitHub repositories with measurable scale metrics.
        </p>
      </div>

      {/* Select Pre-loaded Classic Project or Input Custom */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '12px' }}>
          Select a Classic Tier 2/3 College Project to 10x-Transform:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {GENERIC_COLLEGE_PROJECTS.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedTemplate(p)}
              style={{
                background: selectedTemplate.id === p.id ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: selectedTemplate.id === p.id ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', color: '#94a3b8' }}>
                  {p.category}
                </span>
                {selectedTemplate.id === p.id && <span style={{ color: '#06b6d4', fontSize: '0.8rem', fontWeight: 700 }}>Active</span>}
              </div>
              <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', marginBottom: '4px' }}>{p.name}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transformation Result Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          {/* Header comparison */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: '#f87171', textDecoration: 'line-through' }}>
                  Before: {selectedTemplate.name.split('in')[0]}
                </span>
                <ArrowRight size={14} color="#06b6d4" />
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>10x Production Upgrade</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '6px' }}>
                {selectedTemplate.transformedTitle}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '850px' }}>
                {selectedTemplate.architectureSummary}
              </p>
            </div>

            {/* Quick Tech Stack Badges */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', maxWidth: '380px' }}>
              {selectedTemplate.techStack.map((tech, idx) => (
                <span key={idx} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Sub Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                background: activeTab === 'overview' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: 'none',
                color: activeTab === 'overview' ? '#67e8f9' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Resume ATS Bullets
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              style={{
                background: activeTab === 'roadmap' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: 'none',
                color: activeTab === 'roadmap' ? '#67e8f9' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              48-Hour Sprint Roadmap
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                background: activeTab === 'code' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                border: 'none',
                color: activeTab === 'code' ? '#67e8f9' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Production Code Boilerplate
            </button>
          </div>

          {/* Tab 1: Resume ATS Bullets */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                  3 High-Impact Resume Bullets (Formulated with Google X-Y-Z Method):
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Click any bullet to copy directly into your resume
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedTemplate.atsBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopyBullet(bullet, idx)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#06b6d4'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                  >
                    <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                      • {bullet}
                    </p>
                    <div style={{ flexShrink: 0, color: copiedBullet === idx ? '#10b981' : 'var(--text-dim)' }}>
                      {copiedBullet === idx ? <Check size={18} /> : <Copy size={18} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: 48-Hour Roadmap */}
          {activeTab === 'roadmap' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {selectedTemplate.sprintRoadmap.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Calendar size={16} color="#06b6d4" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#67e8f9' }}>{item.day}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {item.task}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Starter Code */}
          {activeTab === 'code' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Core Implementation File
                </span>
                <button
                  onClick={() => handleCopyCode(selectedTemplate.starterSnippet)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: copiedCode ? '#34d399' : '#cbd5e1',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre style={{
                background: '#090a10',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                overflowX: 'auto',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: '#e2e8f0',
                lineHeight: '1.5'
              }}>
                <code>{selectedTemplate.starterSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
