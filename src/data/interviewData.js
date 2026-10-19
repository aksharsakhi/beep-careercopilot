export const ROLES = [
  {
    id: 'fullstack',
    title: 'Full-Stack Developer (MERN / Next.js)',
    icon: 'Code2',
    color: '#6366f1',
    description: 'Frontend, Backend, APIs, Databases & System Design for early-stage startups',
    questions: [
      {
        id: 'fs-1',
        category: 'Behavioral & Background',
        question: 'Tell me about a complex bug or deployment failure you encountered in a project, and how you diagnosed and resolved it.',
        hinglishHint: 'Bhai, theoretical answer mat dena! Real experience batao: console me kya error aaya, log kaise check kiye, aur fix hone ke baad system me kya improvement aayi (metrics batao).',
        idealAnswer: 'In my distributed notification project, we faced a memory leak under 500 concurrent WebSocket connections where Node.js heap peaked at 1.4GB. I used Chrome DevTools memory profiler and heap snapshots, isolated an unclosed event listener inside the socket disconnect handler, and patched it. This reduced memory usage by 78% and sustained 2,500 simultaneous users at 45ms latency.',
        rubric: ['STAR structure followed', 'Root cause analysis demonstrated', 'Specific tools named (profiler, logs)', 'Quantifiable result']
      },
      {
        id: 'fs-2',
        category: 'Technical Architecture',
        question: 'How does React 19 reconciliation and the Virtual DOM work under the hood, and how do you prevent unnecessary re-renders in a high-traffic dashboard?',
        hinglishHint: 'Diffing algorithm aur fiber tree ke baare me batao. React.memo, useMemo, useCallback kab use karna chahiye aur keys ka importance kya hai.',
        idealAnswer: 'React maintains a Fiber tree representing the virtual DOM. When state changes, the reconciler generates a work-in-progress tree and runs the diffing algorithm in the render phase, comparing element types and unique keys. To optimize dashboards, I co-locate state to avoid top-level re-renders, use useMemo for expensive data transformations (>10ms), memoize stable callbacks with useCallback, and split monolithic contexts into granular slices or lightweight atomic state like Zustand.',
        rubric: ['Fiber architecture & diffing concept', 'State co-location principle', 'Granular state management', 'Practical performance metrics']
      },
      {
        id: 'fs-3',
        category: 'System Design & Tier-2 Scale',
        question: 'How would you architect a rate-limiter for Beep’s daily assessment API so students cannot script bots or spam test submissions?',
        hinglishHint: 'Redis Token Bucket ya Sliding Window algorithm ka reference do. IP address + User ID combine karo aur 429 Too Many Requests status code mention karo.',
        idealAnswer: 'I would implement a Redis-backed Sliding Window Log algorithm at the API gateway layer (e.g. Express/Fastify middleware). Each incoming request checks a Redis sorted set keyed by user_id:ip. Requests outside the current 60-second window are pruned via ZREMRANGEBYSCORE. If ZCARD exceeds 10 req/min, we reject with HTTP 429 and Retry-After header. For burst protection, we add Cloudflare Turnstile CAPTCHA on suspicious IP clusters.',
        rubric: ['Algorithm choice (Sliding Window/Token Bucket)', 'Redis data structure (Sorted Sets)', 'HTTP status codes & headers', 'Edge/DDoS defense']
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Analyst & Python Specialist',
    icon: 'BarChart3',
    color: '#06b6d4',
    description: 'SQL queries, Python ETL, Pandas, PowerBI & Business Retention Metrics',
    questions: [
      {
        id: 'da-1',
        category: 'Business Analytics & Growth',
        question: 'If Beep’s Day-7 student retention suddenly drops by 20% week-over-week, walk me through your step-by-step diagnostic framework.',
        hinglishHint: 'Panic mat hona! Funnel breakdown karo: Kya koi specific college cohort drop hua? App update me bug tha? Ya test completion page pe drop-off badh gaya?',
        idealAnswer: 'I would dissect the drop across 4 dimensions: 1) Segmentation by Cohort: Isolate by college tier (Tier 2 vs Tier 3), acquisition channel, and OS version (Android build bugs). 2) Funnel Drop-off: Check where the friction occurred—Signup -> Assessment Start -> Assessment Finish -> Job Apply. 3) Technical Telemetry: Verify crash rates (Sentry/Crashlytics) on the latest release. 4) Qualitative Student Feedback: Review 1-star Play Store reviews and Discord/WhatsApp community complaints over the same 7-day period.',
        rubric: ['Structured diagnostic framework', 'Cohort & demographic segmentation', 'Technical vs behavioral causes', 'Actionable next steps']
      },
      {
        id: 'da-2',
        category: 'SQL & Data Engineering',
        question: 'Write or explain a SQL query using Window Functions to calculate month-over-month user growth and the 7-day rolling average of completed skill tests.',
        hinglishHint: 'LAG() window function for MoM growth, aur AVG() OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) rolling average ke liye.',
        idealAnswer: 'To compute the 7-day rolling average: SELECT test_date, COUNT(*) as daily_tests, AVG(COUNT(*)) OVER (ORDER BY test_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as rolling_7d_avg FROM completed_tests GROUP BY test_date. For MoM growth, I aggregate monthly totals and use LAG(monthly_active, 1) OVER (ORDER BY month) to calculate ((current - previous) / previous) * 100.',
        rubric: ['Correct Window syntax (OVER, PRECEDING)', 'LAG() function usage', 'Group by mechanics', 'Clear business interpretation']
      }
    ]
  },
  {
    id: 'product',
    title: 'Product & Growth Intern (Founder’s Office)',
    icon: 'Rocket',
    color: '#ec4899',
    description: 'Product teardowns, growth loops, viral mechanics & Tier 2/3 student psychology',
    questions: [
      {
        id: 'pm-1',
        category: 'Product Strategy & Tier 2/3 Psychology',
        question: 'Tier-2 and Tier-3 Indian college students have unique anxieties and aspirations. What is the single biggest psychological barrier they face when looking for jobs, and how should Beep productize the solution?',
        hinglishHint: 'English hesitation, lack of alumni network, aur "mujhe koi referral nahi dega" wala fear. Beep kaise community ya AI se unko confidence de sakta hai?',
        idealAnswer: 'The core psychological barrier is "Imposter Syndrome fueled by Zero Social Proof". Tier 1 students have senior alumni at Google/Zomato giving referrals and mock interview drills. Tier 2/3 students feel invisible because their resumes have no brand names. Beep should productize "Proof-of-Work Sprints" — converting MCQ test badges into 48-hour live micro-projects hosted with public URLs, accompanied by AI mock interview scorecards verified by Beep. This replaces pedigree with verifiable code.',
        rubric: ['Deep empathy for Tier-2/3 student context', 'Concrete product feature proposal', 'Differentiation from generic cert platforms', 'Growth/Retention hook']
      },
      {
        id: 'pm-2',
        category: 'Growth & North Star Metrics',
        question: 'If you joined Beep’s Founder’s Office tomorrow, what would you pick as our North Star Metric, and how would you run a 7-day experiment to move it?',
        hinglishHint: 'App downloads vanity metric hai. North Star should be "Qualified Interviews Unlocked" ya "Day-7 Active Job Seekers". 7-day A/B test split explain karo.',
        idealAnswer: 'Our North Star Metric should not be certificates issued or signups; it must be "Weekly Qualified Interview Opportunities Generated per Active Student". To move this in 7 days, I would run a 50/50 A/B test on 5,000 active students: The control receives the standard digital certificate. The variant gets an automated "Proof-of-Work + AI Interview Readiness Scorecard" with a 1-click tailored founder outreach pitch. We measure 7-day recruiter response rate and Day-7 student DAU/MAU.',
        rubric: ['Value-aligned North Star (not vanity)', 'Rigorous 7-day experiment design', 'Control vs Variant split', 'Clear hypothesis and leading indicators']
      }
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX & Product Designer',
    icon: 'Palette',
    color: '#f59e0b',
    description: 'Design systems, mobile-first heuristics, Tier 2/3 UX accessibility & Figma to code',
    questions: [
      {
        id: 'ux-1',
        category: 'Mobile UX & Vernacular Heuristics',
        question: 'Many Tier 2/3 students use budget Android smartphones (sub-₹12,000) with smaller screens and intermittent 4G connectivity. How do you design for this constraint?',
        hinglishHint: 'Data consumption, tap targets, offline caching, simple language, and visual feedback over heavy animation.',
        idealAnswer: 'I design with three principles: 1) Performance Budget & Lightweight Assets: SVG icons over heavy PNGs, minimal lottie animations, and aggressive local storage caching for offline quiz taking. 2) Ergonomic Mobile UX: Minimum 48x48dp touch targets, bottom-anchored navigation for single-thumb reachability on 6.5-inch screens. 3) Vernacular & Plain Microcopy: Zero corporate jargon; use clear bilingual tooltips and immediate visual positive reinforcement (haptic feedback, celebratory badges) to sustain engagement.',
        rubric: ['Hardware & network constraints', 'Touch target ergonomics', 'Offline-first UX', 'Microcopy clarity for vernacular users']
      }
    ]
  }
];

export const GENERAL_EVALUATION_CRITERIA = {
  starScores: [
    { label: 'Situation (Context & Setting)', weight: '25%' },
    { label: 'Task (Clear Objective & Stakes)', weight: '25%' },
    { label: 'Action (Your Specific Technical Contribution)', weight: '30%' },
    { label: 'Result (Quantified Outcome & Metrics)', weight: '20%' }
  ],
  fillerWords: ['basically', 'actually', 'like', 'um', 'uh', 'you know', 'sort of', 'kind of', 'yaani', 'matlab']
};
