import React, { useState } from 'react';
import { Send, Copy, Check, MessageSquare, Mail, Sparkles, Globe, Share2 } from 'lucide-react';

export function FounderPitchGenerator() {
  const [founderName, setFounderName] = useState('Saurabh');
  const [companyName, setCompanyName] = useState('Beep');
  const [targetRole, setTargetRole] = useState("Founder's Office Intern (AI & Product)");
  const [proofLink, setProofLink] = useState('github.com/my-beep-proof-of-work');
  const [copiedFormat, setCopiedFormat] = useState(null);

  const pitches = {
    linkedin: `Hi ${founderName},

Loved how ${companyName} is bringing Tier-1 opportunities to Tier-2/3 Indian colleges on Shark Tank.

Instead of sending an empty resume, I built a working prototype solving ${companyName}'s student interview freeze problem:
👉 Live Demo & Proof-of-Work: https://${proofLink}

I would love to join your ${targetRole} team and ship this live. Can I send a 90-second Loom showing the metrics?`,

    twitter: `Hey ${founderName}! Huge fan of what you're building at @${companyName}. Built an AI CareerCopilot prototype directly targeting Tier-2/3 student retention & interview prep. 

Check out the live build here: https://${proofLink}

Would love to contribute to ${companyName}'s Founder's Office. DMs open?`,

    email: `Subject: Built a working AI prototype for ${companyName}'s Tier-2/3 student retention (${targetRole})

Hi ${founderName},

I know you receive thousands of applications daily, so I didn't want to just send another generic resume.

I spent the last 48 hours auditing student reviews on Beep and built a live AI CareerCopilot addressing the 3 biggest student drop-off points (MCQ certificate disconnect, interview freeze, and cold outreach).

👉 Live Working App: https://${proofLink}
👉 Metric Hypothesis: Moving Day-7 active job application retention from 4.2% to 14.8%.

I would love to work with you on Product & Growth. Are you open to a 5-minute call or live build session this week?

Best regards,
A high-hustle student`
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(type);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Intro Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-pink" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.3)' }}>Feature 3 of 3</span>
          <span className="badge badge-purple">High-Conversion Outreach</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Founder & Recruiter Cold Outreach Studio</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
          Solving <strong>Problem #3 (Application Black Hole & Recruiter Ghosting)</strong>. Tier-2 and Tier-3 students get ghosted because they send generic "Respected Sir, please find attached resume" messages. This tool generates high-status, proof-of-work pitches that founders and hiring managers actually reply to.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '24px' }}>
        {/* Input Parameters */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '4px' }}>Outreach Parameters</h3>
          
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Founder / Hiring Manager Name:</label>
            <input 
              type="text" 
              value={founderName} 
              onChange={(e) => setFounderName(e.target.value)} 
              placeholder="e.g. Saurabh"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Target Company:</label>
            <input 
              type="text" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              placeholder="e.g. Beep"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Target Role:</label>
            <input 
              type="text" 
              value={targetRole} 
              onChange={(e) => setTargetRole(e.target.value)} 
              placeholder="e.g. Founder's Office Intern"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Proof of Work / Live Link:</label>
            <input 
              type="text" 
              value={proofLink} 
              onChange={(e) => setProofLink(e.target.value)} 
              placeholder="e.g. your-app.vercel.app"
            />
          </div>

          <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)', borderRadius: 'var(--radius-md)', padding: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#f472b6', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              🎯 The "Value-First Pitch" Rule:
            </span>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              Never ask for a job in the first line. Give upfront value, link working proof, and ask for a painless low-commitment next step ("90-sec video").
            </p>
          </div>
        </div>

        {/* Pitch Formats Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* LinkedIn DM */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Share2 size={18} color="#818cf8" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>LinkedIn InMail / DM Format</span>
              </div>
              <button
                onClick={() => handleCopy(pitches.linkedin, 'linkedin')}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {copiedFormat === 'linkedin' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedFormat === 'linkedin' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre style={{ background: '#090a10', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', whiteSpace: 'pre-wrap', color: '#e2e8f0', fontFamily: 'var(--font-sans)', border: '1px solid var(--border-subtle)' }}>
              {pitches.linkedin}
            </pre>
          </div>

          {/* Cold Email */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} color="#ea4335" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Direct Founder Cold Email</span>
              </div>
              <button
                onClick={() => handleCopy(pitches.email, 'email')}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {copiedFormat === 'email' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedFormat === 'email' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre style={{ background: '#090a10', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', whiteSpace: 'pre-wrap', color: '#e2e8f0', fontFamily: 'var(--font-sans)', border: '1px solid var(--border-subtle)' }}>
              {pitches.email}
            </pre>
          </div>

          {/* Twitter / X DM */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="#38bdf8" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Twitter / X Direct Message</span>
              </div>
              <button
                onClick={() => handleCopy(pitches.twitter, 'twitter')}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {copiedFormat === 'twitter' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedFormat === 'twitter' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre style={{ background: '#090a10', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', whiteSpace: 'pre-wrap', color: '#e2e8f0', fontFamily: 'var(--font-sans)', border: '1px solid var(--border-subtle)' }}>
              {pitches.twitter}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
