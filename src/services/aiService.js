// AI Service for Beep CareerCopilot
// Provides live evaluation, STAR breakdown, filler detection, and Hinglish coaching

export async function evaluateInterviewAnswer({ role, question, answer, isHinglish, apiKey }) {
  // If an external Gemini API key is provided, use it
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an elite startup CTO and hiring coach at Beep India, training ambitious college students from Tier 2 and Tier 3 Indian colleges.
Analyze this interview response:
Role: ${role.title}
Question: ${question.question}
Candidate's Answer: "${answer}"
Coaching Language Preference: ${isHinglish ? 'Hinglish (Hindi + English mix, friendly, relatable, motivational Indian startup tone)' : 'English'}

Provide a JSON output with the exact following schema (do not wrap in markdown quotes, output pure JSON):
{
  "overallScore": number (0 to 100),
  "verdict": string ("Ready for Startup Interview", "Strong Potential - Needs STAR Polish", "Needs Re-structuring"),
  "starBreakdown": {
    "situation": { "score": number (0-25), "comment": string },
    "task": { "score": number (0-25), "comment": string },
    "action": { "score": number (0-30), "comment": string },
    "result": { "score": number (0-20), "comment": string }
  },
  "communication": {
    "confidenceScore": number (0-100),
    "fillerWordsDetected": string[],
    "clarityNotes": string
  },
  "hinglishCoachTip": string (motivational advice in ${isHinglish ? 'warm Hinglish' : 'clear English'}),
  "exemplarAnswer": string (how a top 1% candidate answers this question with metrics and technical precision)
}`
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
          return JSON.parse(cleaned);
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local evaluation engine:', err);
    }
  }

  // Built-in intelligent evaluation engine
  return evaluateLocally(question, answer, isHinglish);
}

function evaluateLocally(question, answer, isHinglish) {
  const text = (answer || '').trim();
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Detect filler words
  const fillers = ['basically', 'actually', 'like', 'um', 'uh', 'you know', 'sort of', 'kind of', 'yaani', 'matlab'];
  const detectedFillers = fillers.filter(f => {
    const regex = new RegExp(`\\b${f}\\b`, 'gi');
    return regex.test(lower);
  });

  // Check metrics / numbers
  const hasNumbers = /\d+%?|\d+\s*(ms|users|requests|kb|mb|gb|lpa|k)/i.test(text);
  
  // Check action verbs
  const actionVerbs = ['built', 'architected', 'debugged', 'implemented', 'optimized', 'reduced', 'scaled', 'analyzed', 'isolated', 'deployed'];
  const actionsFound = actionVerbs.filter(v => lower.includes(v));

  // Compute STAR scores
  let situationScore = Math.min(25, Math.max(8, Math.round(wordCount * 0.2)));
  let taskScore = Math.min(25, Math.max(10, lower.includes('problem') || lower.includes('issue') || lower.includes('task') || lower.includes('needed') ? 22 : 14));
  let actionScore = Math.min(30, Math.max(10, actionsFound.length * 7 + 10));
  let resultScore = Math.min(20, hasNumbers ? 18 : 8);

  let totalScore = situationScore + taskScore + actionScore + resultScore;
  if (wordCount < 20) {
    totalScore = Math.min(totalScore, 42);
  } else if (wordCount > 60 && hasNumbers && actionsFound.length >= 2) {
    totalScore = Math.min(94, Math.max(76, totalScore));
  }

  let verdict = 'Needs Re-structuring';
  if (totalScore >= 80) verdict = '🚀 Tier-1 Ready (Top 10% Candidate)';
  else if (totalScore >= 60) verdict = '⚡ Strong Foundation — Polish STAR & Metrics';

  const hinglishTip = isHinglish
    ? (totalScore >= 80
        ? 'Shaandar answer bhai! Bilkul clear technical depth aur numbers diye hain. Bas delivery me pause lena seekho taaki confident sound karo.'
        : `Answer me effort dikh raha hai dost, lekin thoda "Hawa me baat" ho gaya. Situation aur Task to bata diya, lekin actual numbers kahan hain? (Jaise "latency 40% kam hui" ya "500 users handle kiye"). Interviewer ko proof chahiye!`)
    : (totalScore >= 80
        ? 'Excellent answer structure. You cleanly separated your specific actions from team efforts and backed your claims with measurable impact.'
        : 'Good initial direction, but your response lacks quantifiable metrics. Recruiters want to know: What was the measurable delta after your contribution?');

  return {
    overallScore: totalScore,
    verdict,
    starBreakdown: {
      situation: {
        score: situationScore,
        comment: situationScore > 18 ? 'Clear context established without excessive rambling.' : 'Context is too brief or lacks clarity on the project scale.'
      },
      task: {
        score: taskScore,
        comment: taskScore > 18 ? 'The technical challenge and constraints were well articulated.' : 'Make sure to explicitly state what the high-stakes goal was.'
      },
      action: {
        score: actionScore,
        comment: actionsFound.length >= 2
          ? `Strong technical action verbs identified (${actionsFound.slice(0, 3).join(', ')}).`
          : 'Focus more on what YOU personally coded or designed, rather than "we did this".'
      },
      result: {
        score: resultScore,
        comment: hasNumbers
          ? 'Great inclusion of metrics and performance gains.'
          : 'Missing concrete numbers! Mention % speedup, error rate drop, or concurrent users handled.'
      }
    },
    communication: {
      confidenceScore: Math.max(45, 95 - detectedFillers.length * 8),
      fillerWordsDetected: detectedFillers,
      clarityNotes: detectedFillers.length > 0
        ? `Try eliminating filler words (${detectedFillers.join(', ')}). Take a 1-second breath instead of saying fillers.`
        : 'Smooth delivery flow with zero disruptive filler words.'
    },
    hinglishCoachTip: hinglishTip,
    exemplarAnswer: question.idealAnswer
  };
}
