import React, { useState, useEffect, useRef } from 'react';
import { ROLES } from '../data/interviewData';
import { evaluateInterviewAnswer } from '../services/aiService';
import confetti from 'canvas-confetti';
import { 
  Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertTriangle, 
  RefreshCw, ArrowRight, Award, MessageSquare, Lightbulb, Zap, HelpCircle 
} from 'lucide-react';

export function MockInterviewer({ isHinglish, apiKey }) {
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);

  const currentQuestion = selectedRole.questions[questionIndex] || selectedRole.questions[0];

  // Set up Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English accent tuning

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(prev => {
          // If fresh recording or continuation
          return prev ? `${prev} ${transcript}` : transcript;
        });
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!speechSupported) {
      alert('Speech recognition is not natively supported in this browser window. Please type your response directly!');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Could not start microphone:', err);
      }
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) {
      alert('Please provide an answer first by speaking into your mic or typing!');
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const result = await evaluateInterviewAnswer({
        role: selectedRole,
        question: currentQuestion,
        answer: userAnswer,
        isHinglish,
        apiKey
      });

      setEvaluation(result);

      if (result.overallScore >= 75) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Evaluation failed:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const loadSampleAnswer = (type) => {
    if (type === 'fresher') {
      setUserAnswer("Basically in my final year project we made a web application. Actually there was a bug where the website was crashing. So I talked with my team and we restarted the server and checked the database connection. Then it started working properly. So we learned a lot.");
    } else {
      setUserAnswer("When deploying our WebSocket microservice, Node.js memory spiked to 1.4GB under 500 concurrent connections due to unclosed event listeners in socket disconnects. I analyzed heap snapshots via Chrome DevTools, isolated the detached DOM/listener references, and patched the cleanup lifecycle. This cut memory footprint by 78% and allowed the service to sustain 2,500 active users at 45ms latency.");
    }
  };

  const nextQuestion = () => {
    setEvaluation(null);
    setUserAnswer('');
    setQuestionIndex((prev) => (prev + 1) % selectedRole.questions.length);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Intro Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-purple">Feature 1 of 3</span>
            <span className="badge badge-cyan">Vernacular & Spoken AI</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Interactive AI Mock Interviewer & Confidence Coach</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px' }}>
            Built specifically to solve <strong>Problem #2 (Tier 2/3 English Anxiety & The 5-Minute Screening Freeze)</strong>. Practice with real Indian startup technical & HR rounds, get real-time STAR evaluation, and receive culturally relatable coaching tips.
          </p>
        </div>

        {/* Quick Role Select */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedRole(r);
                setQuestionIndex(0);
                setEvaluation(null);
                setUserAnswer('');
              }}
              style={{
                background: selectedRole.id === r.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedRole.id === r.id ? '1px solid var(--primary-light)' : '1px solid var(--border-subtle)',
                color: selectedRole.id === r.id ? '#ffffff' : 'var(--text-muted)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {r.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '24px' }}>
        
        {/* Left Column: Question, Recording, Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Question Card */}
          <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                {currentQuestion.category}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                Question {questionIndex + 1} of {selectedRole.questions.length}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.5', color: '#f8fafc', marginBottom: '16px' }}>
              "{currentQuestion.question}"
            </h3>

            {/* Hinglish Coach Hint Card */}
            <div style={{
              background: 'rgba(249, 115, 22, 0.08)',
              border: '1px solid rgba(249, 115, 22, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <Lightbulb size={20} color="#fb923c" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#fed7aa', display: 'block', marginBottom: '3px' }}>
                  {isHinglish ? '🇮🇳 Beep Coach Ka Guiding Hint (Hinglish):' : '💡 Interview Strategy Tip:'}
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#ffedd5', lineHeight: '1.45' }}>
                  {isHinglish ? currentQuestion.hinglishHint : 'Structure your response with STAR (Situation, Task, Action, Result). State the conflict or problem clearly, highlight your exact engineering/product contribution, and cite measurable numbers.'}
                </p>
              </div>
            </div>

            {/* Rubric Points */}
            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentQuestion.rubric?.map((item, idx) => (
                <span key={idx} style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.04)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Response Input Area */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Your Spoken / Written Response:</span>
                {isRecording && (
                  <div className="audio-wave">
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                    <div className="audio-bar"></div>
                  </div>
                )}
              </div>

              {/* Sample Answers for Fast Evaluation Testing */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  onClick={() => loadSampleAnswer('fresher')}
                  style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-dim)', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
                  title="Loads a typical weak Tier 2/3 answer full of fillers to see AI feedback"
                >
                  Load Basic Answer
                </button>
                <button 
                  onClick={() => loadSampleAnswer('tier1')}
                  style={{ background: 'transparent', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
                  title="Loads a STAR-optimized 10x candidate answer"
                >
                  Load Top-1% Answer
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={isRecording ? "Listening to your microphone in real-time... Speak naturally..." : "Type your answer here or tap 'Start Speaking' to test your real verbal interview readiness..."}
              style={{
                width: '100%',
                lineHeight: '1.6',
                resize: 'vertical',
                background: isRecording ? 'rgba(99, 102, 241, 0.05)' : 'rgba(14, 16, 26, 0.85)',
                borderColor: isRecording ? 'var(--primary)' : 'var(--border-subtle)'
              }}
            />

            {/* Actions Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={toggleRecording}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    background: isRecording ? '#ef4444' : 'rgba(99, 102, 241, 0.15)',
                    color: isRecording ? '#ffffff' : '#a5b4fc',
                    border: isRecording ? 'none' : '1px solid rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.2s ease',
                    boxShadow: isRecording ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none'
                  }}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  <span>{isRecording ? 'Stop Recording' : 'Start Speaking (Mic)'}</span>
                </button>

                {userAnswer && (
                  <button
                    onClick={() => setUserAnswer('')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn-primary"
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  style={{ opacity: isEvaluating ? 0.7 : 1 }}
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw size={16} className="spin" />
                      <span>Analyzing with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Evaluate My Answer</span>
                    </>
                  )}
                </button>

                <button
                  className="btn-secondary"
                  onClick={nextQuestion}
                  title="Next question in this domain"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Feedback Report */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {evaluation ? (
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-highlight)' }}>
              {/* Score Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <span className="badge badge-purple" style={{ fontSize: '0.72rem', marginBottom: '4px' }}>
                    AI Interview Evaluation
                  </span>
                  <h4 style={{ fontSize: '1.2rem', color: '#ffffff' }}>{evaluation.verdict}</h4>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: evaluation.overallScore >= 75 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: evaluation.overallScore >= 75 ? '2px solid #10b981' : '2px solid #f87171'
                }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: evaluation.overallScore >= 75 ? '#34d399' : '#f87171' }}>
                    {evaluation.overallScore}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>/ 100</span>
                </div>
              </div>

              {/* Hinglish Takeaway Quote */}
              <div style={{
                background: 'rgba(99, 102, 241, 0.08)',
                borderLeft: '4px solid #6366f1',
                padding: '12px 16px',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Zap size={14} color="#818cf8" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>
                    Founder Coach Feedback
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#e0e7ff', fontStyle: 'italic', lineHeight: '1.5' }}>
                  "{evaluation.hinglishCoachTip}"
                </p>
              </div>

              {/* STAR Framework Breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  STAR Structural Breakdown
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {Object.entries(evaluation.starBreakdown).map(([key, data]) => (
                    <div key={key} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'capitalize', color: '#cbd5e1' }}>
                          {key}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 700 }}>
                          {data.score} pts
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                        {data.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Diagnostics */}
              <div style={{ marginBottom: '20px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>Communication & Fluency:</span>
                  <span style={{ fontSize: '0.8rem', color: evaluation.communication.fillerWordsDetected.length > 0 ? '#fb923c' : '#34d399', fontWeight: 700 }}>
                    Confidence: {evaluation.communication.confidenceScore}%
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {evaluation.communication.clarityNotes}
                </p>
                {evaluation.communication.fillerWordsDetected.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', color: '#f87171' }}>Fillers Found:</span>
                    {evaluation.communication.fillerWordsDetected.map((f, idx) => (
                      <span key={idx} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px' }}>
                        "{f}"
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Top 1% Exemplar Answer */}
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Award size={15} color="#34d399" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
                    How a Top 1% (Tier-1) Candidate Answers This:
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#d1fae5', lineHeight: '1.5' }}>
                  "{evaluation.exemplarAnswer}"
                </p>
              </div>
            </div>
          ) : (
            /* Empty State / Welcome Guide */
            <div className="glass-panel" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '400px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Mic size={28} color="#818cf8" />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your AI Interview Scorecard</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '340px', marginBottom: '20px' }}>
                Start speaking into your mic or click <strong>"Load Basic Answer"</strong> on the left to see our real-time STAR evaluation in action!
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '340px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Real-time Indian accent speech transcription</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Instant STAR methodology grading (0-100)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Filler word detection ("basically", "actually")</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Tier-1 Exemplar benchmark rewrites</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
