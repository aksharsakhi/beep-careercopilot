export const GENERIC_COLLEGE_PROJECTS = [
  {
    id: 'bookstore',
    name: 'Online Book Store / Library Management System in Java/PHP',
    category: 'Full-Stack / Backend',
    description: 'Basic CRUD app with MySQL and forms. Seen on 80% of Tier-3 B.Tech resumes.',
    transformedTitle: 'Distributed Microservices Book Lending & Reservation Engine with Redis Queue',
    techStack: ['Node.js / Express', 'Redis Sorted Sets', 'PostgreSQL', 'Docker', 'Stripe/Razorpay Webhooks'],
    architectureSummary: 'An event-driven reservation system that handles high-traffic book drops with zero overselling using Redis atomic locks and idempotent payment webhooks.',
    sprintRoadmap: [
      { day: 'Day 1: Architecture & DB', task: 'Design normalized Postgres schema, set up Docker container, build JWT auth with refresh tokens' },
      { day: 'Day 2: High Concurrency Queue', task: 'Implement Redis atomic decrement for inventory checkout to prevent race conditions during book drops' },
      { day: 'Day 3: Webhooks & Stress Test', task: 'Add Razorpay mock payment webhook handler with idempotency keys; run k6 load test simulating 1,000 req/sec' }
    ],
    atsBullets: [
      'Architected a fault-tolerant book reservation microservice handling 1,200 requests/sec with p99 latency < 65ms using Redis atomic counters and Node.js.',
      'Eliminated inventory race conditions by deploying distributed locks (Redlock) and ACID transactions in PostgreSQL, achieving 100% data consistency across 5,000 simulated checkouts.',
      'Engineered idempotent payment processing pipeline supporting Razorpay webhooks with SHA-256 signature verification and automated replay protection.'
    ],
    starterSnippet: `// High-concurrency atomic checkout with Redis & PostgreSQL
import Redis from 'ioredis';
import { pool } from './db.js';

const redis = new Redis(process.env.REDIS_URL);

export async function reserveBookAtomic(userId, bookId) {
  const lockKey = \`lock:book:\${bookId}\`;
  const inventoryKey = \`inventory:book:\${bookId}\`;
  
  // Acquire distributed lock for 2000ms
  const acquired = await redis.set(lockKey, userId, 'NX', 'PX', 2000);
  if (!acquired) {
    throw new Error('Lock contention: High checkout volume, please retry');
  }

  try {
    const stock = await redis.decr(inventoryKey);
    if (stock < 0) {
      await redis.incr(inventoryKey); // rollback
      return { success: false, reason: 'Out of Stock' };
    }

    // Persist pending reservation in PostgreSQL with idempotency
    const result = await pool.query(
      'INSERT INTO reservations (user_id, book_id, status) VALUES ($1, $2, $3) RETURNING id',
      [userId, bookId, 'PENDING_PAYMENT']
    );

    return { success: true, reservationId: result.rows[0].id };
  } finally {
    // Release lock safely via Lua script
    const luaRelease = \`
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    \`;
    await redis.eval(luaRelease, 1, lockKey, userId);
  }
}`
  },
  {
    id: 'attendance',
    name: 'Face Recognition Student Attendance System using OpenCV',
    category: 'AI / Computer Vision',
    description: 'Basic Jupyter notebook script running haarcascade locally without backend or deployment.',
    transformedTitle: 'Edge-Optimized Real-Time Face Biometrics Attendance API with Anti-Spoofing & WebSocket Stream',
    techStack: ['FastAPI (Python)', 'ONNX Runtime', 'InsightFace', 'WebSockets', 'Supabase Vector'],
    architectureSummary: 'Production edge-inference pipeline capable of identifying 30 students simultaneously in a CCTV video stream in <200ms with liveness detection to block photo spoofing.',
    sprintRoadmap: [
      { day: 'Day 1: Lightweight Embeddings', task: 'Convert facial embedding model to ONNX format with FP16 quantization for 3.4x faster CPU inference' },
      { day: 'Day 2: Liveness & Anti-Spoofing', task: 'Add blink detection and eye-aspect-ratio (EAR) liveness checks to prevent static photo attacks' },
      { day: 'Day 3: Stream & Dashboard', task: 'Build FastAPI WebSocket endpoint streaming live bounding boxes to a React client with zero lag' }
    ],
    atsBullets: [
      'Built a low-latency face recognition engine with FastAPI & ONNX Runtime, achieving 180ms identification latency across a 2,000-student database.',
      'Implemented anti-spoofing liveness detection using Eye-Aspect Ratio (EAR) and facial texture analysis, eliminating 99.2% of static photo injection bypasses.',
      'Integrated Supabase Vector cosine-similarity indexing to perform sub-10ms biometric search at scale with zero server GPU requirement.'
    ],
    starterSnippet: `from fastapi import FastAPI, WebSocket
import cv2
import numpy as np
import onnxruntime as ort

app = FastAPI(title="Edge Biometrics API")
session = ort.InferenceSession("models/insightface_fp16.onnx", providers=['CPUExecutionProvider'])

def compute_liveness(landmarks):
    # Eye Aspect Ratio calculation
    left_ear = (np.linalg.norm(landmarks[37] - landmarks[41]) + np.linalg.norm(landmarks[38] - landmarks[40])) / (2.0 * np.linalg.norm(landmarks[36] - landmarks[39]))
    return left_ear > 0.22

@app.websocket("/ws/stream")
async def process_stream(websocket: WebSocket):
    await websocket.accept()
    while True:
        bytes_data = await websocket.receive_bytes()
        nparr = np.frombuffer(bytes_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Fast inference with ONNX
        # Return bounding box + verified student identity
        await websocket.send_json({"status": "verified", "studentId": "BE-2024-042", "confidence": 0.984})`
  },
  {
    id: 'weather',
    name: 'Simple Weather App in React / JS',
    category: 'Frontend / Full-Stack',
    description: 'Fetch OpenWeatherMap API and displays temperature. Common beginner project.',
    transformedTitle: 'Real-Time Hyperlocal Agro-Climatic Intelligence Dashboard with PWA Offline Caching & Alerts',
    techStack: ['Next.js 14', 'IndexedDB / PWA', 'Mapbox GL', 'Web Workers', 'Web Push Notifications'],
    architectureSummary: 'An offline-capable progressive web application providing Indian farmers with sub-kilometer weather alerts, soil moisture indices, and crop frost warnings.',
    sprintRoadmap: [
      { day: 'Day 1: GeoJSON & Mapbox', task: 'Set up Mapbox heatmaps rendering weather radar layers with sub-second polygon queries' },
      { day: 'Day 2: Offline First Architecture', task: 'Implement Service Worker + IndexedDB caching strategy enabling full offline usability in rural connectivity' },
      { day: 'Day 3: Push Notifications', task: 'Integrate Web Push API for extreme weather microburst alerts triggered by automated background workers' }
    ],
    atsBullets: [
      'Engineered an offline-first PWA dashboard serving 15-day hyperlocal precipitation forecasts with zero UI freeze using Web Workers for data processing.',
      'Optimized Mapbox geospatial polygon rendering from 450ms down to 60ms through spatial indexing (RBush) and vector tile compression.',
      'Implemented Web Push API background service workers delivering frost alerts to 1,500 test users with 94% delivery rate on low-bandwidth 2G/3G connections.'
    ],
    starterSnippet: `// Service Worker Offline-First Agro-Weather Cache Strategy
const CACHE_NAME = 'beep-agro-weather-v2';
const WEATHER_API_PATTERN = /api\\.weather\\.com\\/hyperlocal/;

self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (WEATHER_API_PATTERN.test(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Rural fallback when 4G drops
          const cachedResponse = await cache.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response(JSON.stringify({ offline: true, cachedForecastAvailable: false }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })
    );
  }
});`
  }
];
