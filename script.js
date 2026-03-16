/**
 * XOP Trade Robot Rankings — script.js
 * Full functionality: rankings, filters, compare, charts,
 * modals, watchlist, dashboard, live feed, keyboard shortcuts
 */

'use strict';

/* =============================================
   1. DATA — 20 robots with all metrics
============================================= */
const ROBOTS = [
  {
    id: 1, name: "XOP Alpha Pro", tag: "TREND·MOMENTUM", emoji: "🤖", color: "#00d2ff",
    backtested: true, forwardTested: true, isNew: false, isHot: true,
    winRate: 87, profitFactor: 2.4, totalReturn: 156, risk: "Low",
    sharpe: 2.1, drawdown: 8, users: 12400, rating: 4.9,
    strategy: "Multi-timeframe trend following with dynamic position sizing",
    minDeposit: 500, currency: "USD", since: "Jan 2022",
    sparkData: [2,4,3,7,6,9,8,11,10,14,13,16,15,18,20],
    monthlyPerf: [3.2,4.1,2.8,5.6,3.9,4.8,6.1,3.7,5.2,4.4,6.8,5.9],
    reviews: [
      { user: "TradingHawk", rating: 5, text: "Best robot I've ever used. Consistent gains every month.", verified: true, date: "Mar 10, 2026" },
      { user: "FXMaster99", rating: 5, text: "Incredible results. My portfolio grew 34% in 3 months.", verified: true, date: "Feb 28, 2026" },
      { user: "CryptoWhale", rating: 4, text: "Very solid performance. Slightly slow during volatile markets.", verified: false, date: "Feb 14, 2026" },
    ]
  },
  {
    id: 2, name: "Quantum Bot X", tag: "ML·SCALPER", emoji: "⚡", color: "#a78bfa",
    backtested: true, forwardTested: true, isNew: false, isHot: true,
    winRate: 92, profitFactor: 3.1, totalReturn: 234, risk: "Medium",
    sharpe: 2.8, drawdown: 15, users: 8700, rating: 4.8,
    strategy: "Machine learning-based tick scalping with neural net signals",
    minDeposit: 1000, currency: "USD", since: "Apr 2022",
    sparkData: [3,5,4,8,7,11,9,13,12,16,14,18,17,21,23],
    monthlyPerf: [4.1,5.8,3.9,6.7,5.2,7.1,5.8,6.9,7.4,5.6,8.2,7.1],
    reviews: [
      { user: "AlgoTrader", rating: 5, text: "Machine learning edge is real. Outstanding win rate.", verified: true, date: "Mar 12, 2026" },
      { user: "JaneW", rating: 5, text: "Has been in my portfolio for 8 months, never disappointed.", verified: true, date: "Mar 1, 2026" },
    ]
  },
  {
    id: 3, name: "Forex Master Elite", tag: "FX·MULTI-PAIR", emoji: "💱", color: "#fbbf24",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 78, profitFactor: 1.8, totalReturn: 98, risk: "Low",
    sharpe: 1.6, drawdown: 5, users: 15200, rating: 4.7,
    strategy: "Multi-currency trend following on major forex pairs",
    minDeposit: 250, currency: "USD", since: "Oct 2021",
    sparkData: [2,3,3,5,4,6,5,7,7,9,8,10,9,11,12],
    monthlyPerf: [1.9,2.6,1.8,3.2,2.4,2.9,3.1,2.2,3.8,2.7,4.1,3.3],
    reviews: [
      { user: "RetailTrader", rating: 5, text: "Low drawdown is exactly what I needed. Very safe bot.", verified: true, date: "Mar 8, 2026" },
      { user: "Lisa_FX", rating: 4, text: "Solid but not yet forward tested. Would rate higher when it is.", verified: false, date: "Feb 20, 2026" },
    ]
  },
  {
    id: 4, name: "Crypto Pulse AI", tag: "CRYPTO·AI", emoji: "🔮", color: "#f472b6",
    backtested: true, forwardTested: true, isNew: false, isHot: true,
    winRate: 94, profitFactor: 3.5, totalReturn: 312, risk: "High",
    sharpe: 3.2, drawdown: 25, users: 5300, rating: 4.9,
    strategy: "AI-driven crypto momentum with sentiment analysis signals",
    minDeposit: 2000, currency: "USD", since: "Jun 2022",
    sparkData: [5,8,6,12,10,16,13,20,17,24,21,28,25,32,35],
    monthlyPerf: [6.1,8.4,5.2,10.1,7.8,9.6,11.2,8.3,12.1,9.4,13.5,11.8],
    reviews: [
      { user: "CryptoKing", rating: 5, text: "Absolutely insane returns. High risk is worth it.", verified: true, date: "Mar 14, 2026" },
      { user: "RiskTaker77", rating: 5, text: "312% return verified. Life changing bot.", verified: true, date: "Mar 5, 2026" },
    ]
  },
  {
    id: 5, name: "Trend Surfer Pro", tag: "SWING·STRATEGY", emoji: "🌊", color: "#34d399",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 82, profitFactor: 2.1, totalReturn: 145, risk: "Medium",
    sharpe: 1.9, drawdown: 12, users: 9100, rating: 4.6,
    strategy: "Swing trading with RSI divergence and volume confirmation",
    minDeposit: 500, currency: "USD", since: "Jan 2023",
    sparkData: [2,4,3,6,5,8,7,10,9,12,11,14,13,16,17],
    monthlyPerf: [2.8,3.9,2.5,5.1,4.0,4.7,5.4,3.8,5.9,4.5,6.3,5.5],
    reviews: [
      { user: "SwingMaster", rating: 5, text: "Really catches the big swings. Very smooth equity curve.", verified: true, date: "Mar 9, 2026" },
    ]
  },
  {
    id: 6, name: "Neural Trader 3.0", tag: "DEEP·LEARNING", emoji: "🧠", color: "#60a5fa",
    backtested: true, forwardTested: true, isNew: true, isHot: false,
    winRate: 85, profitFactor: 2.7, totalReturn: 189, risk: "Medium",
    sharpe: 2.4, drawdown: 11, users: 3200, rating: 4.8,
    strategy: "Deep learning LSTM model trained on 10 years of price data",
    minDeposit: 1500, currency: "USD", since: "Dec 2023",
    sparkData: [3,5,4,7,6,9,8,12,11,15,13,17,16,20,22],
    monthlyPerf: [3.8,5.1,4.2,6.3,5.5,6.8,5.9,7.4,6.2,8.1,7.3,8.9],
    reviews: [
      { user: "AIEnthusiast", rating: 5, text: "Deep learning is the future. This bot proves it.", verified: true, date: "Mar 11, 2026" },
      { user: "TechTrader", rating: 5, text: "Very impressed with consistency over 90 days.", verified: true, date: "Feb 25, 2026" },
    ]
  },
  {
    id: 7, name: "Alpha Strike V2", tag: "BREAKOUT·SYSTEM", emoji: "🎯", color: "#fb923c",
    backtested: true, forwardTested: true, isNew: false, isHot: false,
    winRate: 76, profitFactor: 2.2, totalReturn: 132, risk: "Medium",
    sharpe: 1.8, drawdown: 14, users: 6800, rating: 4.5,
    strategy: "Dynamic breakout system with ATR-based stop placement",
    minDeposit: 750, currency: "USD", since: "Mar 2022",
    sparkData: [2,3,3,5,5,7,6,9,8,11,10,13,12,15,16],
    monthlyPerf: [2.5,3.4,2.2,4.6,3.7,4.1,4.8,3.2,5.4,4.0,5.8,5.1],
    reviews: [
      { user: "BreakoutKing", rating: 5, text: "Excellent at catching breakouts. V2 is much better than V1.", verified: false, date: "Mar 7, 2026" },
    ]
  },
  {
    id: 8, name: "StealthBot Pro", tag: "MEAN·REVERSION", emoji: "🕵️", color: "#94a3b8",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 80, profitFactor: 1.9, totalReturn: 110, risk: "Low",
    sharpe: 1.7, drawdown: 7, users: 11000, rating: 4.4,
    strategy: "Mean reversion on overbought/oversold conditions with Bollinger Bands",
    minDeposit: 300, currency: "USD", since: "Sep 2021",
    sparkData: [1,2,2,4,3,5,5,7,6,8,8,10,9,12,13],
    monthlyPerf: [1.8,2.4,1.6,3.1,2.3,2.7,3.4,2.1,3.7,2.8,4.0,3.6],
    reviews: [
      { user: "ConservTrader", rating: 5, text: "Perfect for conservative investors. Low drawdown is key.", verified: true, date: "Mar 6, 2026" },
      { user: "SafePlayer", rating: 4, text: "Good steady returns. Not a moonshot but reliable.", verified: false, date: "Feb 18, 2026" },
    ]
  },
  {
    id: 9, name: "Vortex Scalper", tag: "M1·SCALP", emoji: "🌀", color: "#818cf8",
    backtested: true, forwardTested: true, isNew: true, isHot: true,
    winRate: 91, profitFactor: 2.9, totalReturn: 208, risk: "High",
    sharpe: 2.6, drawdown: 22, users: 4100, rating: 4.7,
    strategy: "High-frequency M1 scalping with proprietary entry algorithm",
    minDeposit: 2000, currency: "USD", since: "Nov 2023",
    sparkData: [4,6,5,9,7,12,10,15,13,18,16,21,19,25,27],
    monthlyPerf: [4.8,6.9,4.1,8.5,6.7,8.1,9.4,7.2,10.1,8.6,11.3,9.8],
    reviews: [
      { user: "ScalpGod", rating: 5, text: "91% win rate on live account, verified. Unbelievable.", verified: true, date: "Mar 13, 2026" },
    ]
  },
  {
    id: 10, name: "Iron Grid Bot", tag: "GRID·SYSTEM", emoji: "⚙️", color: "#6b7280",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 72, profitFactor: 1.6, totalReturn: 87, risk: "Medium",
    sharpe: 1.4, drawdown: 18, users: 7300, rating: 4.2,
    strategy: "Dynamic grid trading with smart gap detection and range optimization",
    minDeposit: 1000, currency: "USD", since: "Jul 2021",
    sparkData: [1,2,2,3,3,4,4,6,5,7,7,9,8,10,11],
    monthlyPerf: [1.4,2.0,1.2,2.8,1.9,2.3,3.1,1.8,3.4,2.4,3.7,3.2],
    reviews: [
      { user: "GridMaster", rating: 4, text: "Grid bots need patience. This one is well-built.", verified: true, date: "Mar 4, 2026" },
    ]
  },
  {
    id: 11, name: "PrismBot Elite", tag: "MULTI·TF", emoji: "💎", color: "#2dd4bf",
    backtested: true, forwardTested: true, isNew: false, isHot: false,
    winRate: 79, profitFactor: 2.0, totalReturn: 124, risk: "Low",
    sharpe: 1.8, drawdown: 9, users: 5600, rating: 4.5,
    strategy: "Multi-timeframe confluence system with adaptive filters",
    minDeposit: 500, currency: "USD", since: "Feb 2023",
    sparkData: [2,3,3,5,4,7,6,8,8,11,10,12,12,14,15],
    monthlyPerf: [2.3,3.0,2.1,4.2,3.3,3.8,4.5,3.1,4.8,3.7,5.2,4.7],
    reviews: []
  },
  {
    id: 12, name: "Echo Wave FX", tag: "COPY·TRADE", emoji: "〰️", color: "#e879f9",
    backtested: false, forwardTested: false, isNew: true, isHot: false,
    winRate: 74, profitFactor: 1.7, totalReturn: 95, risk: "Low",
    sharpe: 1.5, drawdown: 6, users: 4900, rating: 4.3,
    strategy: "Mirror trading of top 10 verified signal providers",
    minDeposit: 200, currency: "USD", since: "Jan 2026",
    sparkData: [1,2,2,3,3,5,4,6,6,8,7,9,9,11,12],
    monthlyPerf: [1.5,2.2,1.4,3.0,2.2,2.6,3.3,2.0,3.6,2.5,3.9,3.4],
    reviews: []
  },
  {
    id: 13, name: "Apex Momentum", tag: "MOMENTUM·V3", emoji: "🚀", color: "#f59e0b",
    backtested: true, forwardTested: true, isNew: false, isHot: true,
    winRate: 83, profitFactor: 2.3, totalReturn: 165, risk: "Medium",
    sharpe: 2.0, drawdown: 13, users: 7100, rating: 4.6,
    strategy: "Momentum burst detection with volume-weighted entry signals",
    minDeposit: 750, currency: "USD", since: "May 2022",
    sparkData: [3,4,4,6,6,8,7,10,9,13,12,15,14,17,19],
    monthlyPerf: [3.1,4.2,2.9,5.4,4.3,5.0,5.8,4.1,6.2,5.0,6.9,6.1],
    reviews: [
      { user: "MomoTrader", rating: 5, text: "V3 completely reimagined. Blows V2 out of the water.", verified: true, date: "Mar 10, 2026" },
    ]
  },
  {
    id: 14, name: "Sentinel Risk Guard", tag: "HEDGE·SYSTEM", emoji: "🛡️", color: "#10b981",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 68, profitFactor: 1.5, totalReturn: 76, risk: "Low",
    sharpe: 1.3, drawdown: 4, users: 8400, rating: 4.1,
    strategy: "Hedging system with correlated pairs and drawdown protection",
    minDeposit: 300, currency: "USD", since: "Mar 2021",
    sparkData: [1,1,2,2,3,3,4,4,5,6,6,7,7,9,9],
    monthlyPerf: [1.1,1.7,1.0,2.3,1.7,2.0,2.6,1.5,2.9,2.0,3.2,2.8],
    reviews: []
  },
  {
    id: 15, name: "Blaze Arb Engine", tag: "ARBITRAGE·AI", emoji: "🔥", color: "#ef4444",
    backtested: true, forwardTested: true, isNew: true, isHot: true,
    winRate: 96, profitFactor: 4.1, totalReturn: 287, risk: "High",
    sharpe: 3.5, drawdown: 19, users: 2800, rating: 4.8,
    strategy: "Latency arbitrage with cross-broker price discrepancy detection",
    minDeposit: 5000, currency: "USD", since: "Oct 2025",
    sparkData: [5,9,7,13,11,18,14,22,19,27,23,31,28,36,39],
    monthlyPerf: [7.2,10.1,6.4,12.3,9.4,11.8,13.6,10.0,14.9,11.2,16.1,13.4],
    reviews: [
      { user: "ArbKing", rating: 5, text: "96% win rate is not a typo. Arbitrage works.", verified: true, date: "Mar 15, 2026" },
    ]
  },
  {
    id: 16, name: "Titan Carry Bot", tag: "CARRY·TRADE", emoji: "⚓", color: "#0ea5e9",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 71, profitFactor: 1.6, totalReturn: 82, risk: "Low",
    sharpe: 1.4, drawdown: 5, users: 6200, rating: 4.0,
    strategy: "Interest rate differential exploitation on high-yield currency pairs",
    minDeposit: 500, currency: "USD", since: "Jun 2021",
    sparkData: [1,2,2,3,3,4,5,5,6,7,7,8,9,10,11],
    monthlyPerf: [1.3,1.9,1.1,2.5,1.8,2.2,2.8,1.6,3.1,2.2,3.5,3.0],
    reviews: []
  },
  {
    id: 17, name: "Oracle Signal Bot", tag: "SIGNAL·COPY", emoji: "🔭", color: "#7c3aed",
    backtested: false, forwardTested: true, isNew: false, isHot: false,
    winRate: 77, profitFactor: 1.9, totalReturn: 118, risk: "Medium",
    sharpe: 1.7, drawdown: 11, users: 4500, rating: 4.3,
    strategy: "Aggregates signals from 50+ verified professional traders",
    minDeposit: 500, currency: "USD", since: "Sep 2022",
    sparkData: [2,3,3,5,4,6,6,8,7,10,9,11,11,13,14],
    monthlyPerf: [2.0,2.9,1.8,3.9,3.0,3.5,4.2,2.8,4.6,3.4,4.9,4.3],
    reviews: []
  },
  {
    id: 18, name: "FusionBot Ultra", tag: "HYBRID·AI", emoji: "⚗️", color: "#d946ef",
    backtested: true, forwardTested: true, isNew: true, isHot: false,
    winRate: 88, profitFactor: 2.6, totalReturn: 178, risk: "Medium",
    sharpe: 2.3, drawdown: 10, users: 2100, rating: 4.7,
    strategy: "Hybrid AI combining neural networks, rule-based systems, and sentiment",
    minDeposit: 1000, currency: "USD", since: "Feb 2026",
    sparkData: [3,5,4,7,6,10,8,12,11,15,13,17,16,20,22],
    monthlyPerf: [3.6,4.9,3.4,6.1,5.0,6.4,5.7,7.1,6.0,7.8,7.0,8.5],
    reviews: [
      { user: "NewestFan", rating: 5, text: "Brand new but already killing it. Excited to see where it goes.", verified: false, date: "Mar 14, 2026" },
    ]
  },
  {
    id: 19, name: "Zenith Position Bot", tag: "POSITION·TRADE", emoji: "🏔️", color: "#84cc16",
    backtested: true, forwardTested: false, isNew: false, isHot: false,
    winRate: 65, profitFactor: 1.4, totalReturn: 68, risk: "Low",
    sharpe: 1.2, drawdown: 7, users: 5800, rating: 3.9,
    strategy: "Long-term position trading using weekly and monthly chart signals",
    minDeposit: 250, currency: "USD", since: "Jan 2020",
    sparkData: [1,1,2,2,2,3,3,4,4,5,5,6,7,8,8],
    monthlyPerf: [0.9,1.4,0.8,1.9,1.4,1.7,2.1,1.3,2.4,1.7,2.7,2.3],
    reviews: []
  },
  {
    id: 20, name: "Phantom Night Bot", tag: "OVERNIGHT·HOLD", emoji: "🌙", color: "#6366f1",
    backtested: true, forwardTested: true, isNew: false, isHot: false,
    winRate: 73, profitFactor: 1.8, totalReturn: 102, risk: "Medium",
    sharpe: 1.6, drawdown: 16, users: 3700, rating: 4.1,
    strategy: "Overnight gap trading on index CFDs with defined risk parameters",
    minDeposit: 750, currency: "USD", since: "Apr 2023",
    sparkData: [2,3,3,4,4,6,5,7,7,9,8,11,10,12,13],
    monthlyPerf: [1.8,2.5,1.6,3.4,2.6,3.0,3.7,2.4,4.0,2.9,4.4,3.8],
    reviews: []
  },
];

/* =============================================
   2. STATE
============================================= */
const STATE = {
  theme: 'dark',
  watchlist: [],
  recentlyViewed: [],
  alerts: [],
  compareSlots: [null, null, null],
  currentPage: 1,
  perPage: 10,
  autoRefresh: true,
  refreshTimer: null,
  filtered: [...ROBOTS],
};

/* =============================================
   3. LOCALSTORAGE HELPERS
============================================= */
function saveLS(key, val) { try { localStorage.setItem('xop_' + key, JSON.stringify(val)); } catch(e){} }
function loadLS(key, def) { try { const v = localStorage.getItem('xop_' + key); return v ? JSON.parse(v) : def; } catch(e){ return def; } }

function loadUserData() {
  STATE.theme = loadLS('theme', 'dark');
  STATE.watchlist = loadLS('watchlist', []);
  STATE.recentlyViewed = loadLS('recentlyViewed', []);
  STATE.alerts = loadLS('alerts', []);
}

function saveUserData() {
  saveLS('theme', STATE.theme);
  saveLS('watchlist', STATE.watchlist);
  saveLS('recentlyViewed', STATE.recentlyViewed);
  saveLS('alerts', STATE.alerts);
}

/* =============================================
   4. THEME
============================================= */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', STATE.theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = STATE.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  if (typeof updateChartThemes === 'function') updateChartThemes();
}

function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  saveUserData();
  showToast(STATE.theme === 'dark' ? '🌙 Dark mode on' : '☀️ Light mode on');
}

/* =============================================
   5. TOAST
============================================= */
let toastTimer;
function showToast(msg, duration = 2800) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

/* =============================================
   6. ANIMATED COUNTERS
============================================= */
function animateCounters(container = document) {
  container.querySelectorAll('[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimal = parseInt(el.dataset.decimal || 0);
    const div = parseFloat(el.dataset.div || 1);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const prog = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      const val = (target * ease) / div;
      el.textContent = prefix + (decimal > 0 ? val.toFixed(decimal) : Math.floor(val)) + suffix;
      if (prog < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* =============================================
   7. LIVE COUNTER SIMULATION
============================================= */
function simulateLiveCounter() {
  const el = document.getElementById('liveCounter');
  if (!el) return;
  let base = 124853;
  setInterval(() => {
    base += Math.floor(Math.random() * 5) - 2;
    el.textContent = base.toLocaleString();
  }, 3000);
}

/* =============================================
   8. TRENDING SECTION
============================================= */
function renderTrending() {
  const list = document.getElementById('trendingList');
  if (!list) return;
  const sorted = [...ROBOTS].sort((a,b) => b.users - a.users).slice(0, 8);
  list.innerHTML = sorted.map((r, i) => `
    <div class="trending-item" onclick="openModal(${r.id})" title="View ${r.name}">
      <span class="trend-rank">#${i+1}</span>
      <span>${r.emoji}</span>
      <span>${r.name}</span>
      <span class="trend-arrow ${i < 3 ? 'up' : 'down'}">${i < 3 ? '▲' : '▼'}</span>
    </div>`).join('');
}

/* =============================================
   9. ACTIVITY FEED
============================================= */
const ACTIVITY_NAMES = ['Alex', 'Maria', 'Chen', 'Amir', 'Sofia', 'Lucas', 'Priya', 'Johan', 'Amira', 'David'];
const ACTIVITY_COUNTRIES = ['USA 🇺🇸', 'Germany 🇩🇪', 'Japan 🇯🇵', 'UAE 🇦🇪', 'Brazil 🇧🇷', 'UK 🇬🇧', 'India 🇮🇳', 'Canada 🇨🇦'];
const ACTIVITY_ACTIONS = ['just added', 'started using', 'reviewed', 'added to watchlist', 'downloaded'];

function spawnActivity() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  const robot = ROBOTS[Math.floor(Math.random() * ROBOTS.length)];
  const name = ACTIVITY_NAMES[Math.floor(Math.random() * ACTIVITY_NAMES.length)];
  const country = ACTIVITY_COUNTRIES[Math.floor(Math.random() * ACTIVITY_COUNTRIES.length)];
  const action = ACTIVITY_ACTIONS[Math.floor(Math.random() * ACTIVITY_ACTIONS.length)];
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `<strong>${name}</strong> from ${country} ${action} <strong>${robot.name}</strong>`;
  feed.appendChild(item);
  // Remove after animation
  setTimeout(() => { if (item.parentNode) item.parentNode.removeChild(item); }, 4100);
  // Limit to 3 items
  while (feed.children.length > 3) feed.removeChild(feed.firstChild);
}

/* =============================================
   10. STARS RENDERER
============================================= */
function renderStars(rating, size = 'sm') {
  let html = '<div class="stars-wrap">';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<i class="fa-solid fa-star"></i>';
    else if (rating >= i - 0.5) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    else html += '<i class="fa-regular fa-star empty"></i>';
  }
  html += `<span class="stars-val">${rating.toFixed(1)}</span></div>`;
  return html;
}

/* =============================================
   11. SPARKLINE
============================================= */
function drawSparkline(canvas, data, color) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = 90;
  const h = canvas.height = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  ctx.clearRect(0, 0, w, h);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 4) - 2
  }));
  // Fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '55');
  grad.addColorStop(1, color + '00');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, h);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.stroke();
}

/* =============================================
   12. RANKINGS TABLE — FILTER & SORT
============================================= */
function getFilters() {
  const q = (document.getElementById('tableSearch') || document.getElementById('heroSearch'))?.value?.toLowerCase().trim() || '';
  const heroQ = document.getElementById('heroSearch')?.value?.toLowerCase().trim() || '';
  const searchQ = q || heroQ;
  const btOnly = document.getElementById('filterBt')?.checked;
  const ftOnly = document.getElementById('filterFt')?.checked;
  const risks = [...document.querySelectorAll('.risk-cb:checked')].map(cb => cb.value);
  const wr = parseInt(document.getElementById('wrSlider')?.value || 0);
  const pf = parseInt(document.getElementById('pfSlider')?.value || 0) / 10;
  const dd = parseInt(document.getElementById('ddSlider')?.value || 50);
  const sort = document.getElementById('sortSelect')?.value || 'rank';
  return { searchQ, btOnly, ftOnly, risks, wr, pf, dd, sort };
}

function applyFilters() {
  const f = getFilters();
  let data = ROBOTS.filter(r => {
    if (f.searchQ && !r.name.toLowerCase().includes(f.searchQ) && !r.tag.toLowerCase().includes(f.searchQ)) return false;
    if (f.btOnly && !r.backtested) return false;
    if (f.ftOnly && !r.forwardTested) return false;
    if (f.risks.length && !f.risks.includes(r.risk)) return false;
    if (r.winRate < f.wr) return false;
    if (r.profitFactor < f.pf) return false;
    if (r.drawdown > f.dd) return false;
    return true;
  });
  // Sort
  if (f.sort === 'winRate') data.sort((a,b) => b.winRate - a.winRate);
  else if (f.sort === 'totalReturn') data.sort((a,b) => b.totalReturn - a.totalReturn);
  else if (f.sort === 'users') data.sort((a,b) => b.users - a.users);
  else if (f.sort === 'rating') data.sort((a,b) => b.rating - a.rating);
  else if (f.sort === 'sharpe') data.sort((a,b) => b.sharpe - a.sharpe);
  // Default: original rank order
  STATE.filtered = data;
  STATE.currentPage = 1;
  renderTable();
  renderCards();
}

function resetFilters() {
  document.getElementById('tableSearch').value = '';
  document.getElementById('heroSearch').value = '';
  document.getElementById('filterBt').checked = true;
  document.getElementById('filterFt').checked = true;
  document.querySelectorAll('.risk-cb').forEach(cb => cb.checked = true);
  document.getElementById('wrSlider').value = 0;
  document.getElementById('pfSlider').value = 0;
  document.getElementById('ddSlider').value = 50;
  document.getElementById('sortSelect').value = 'rank';
  updateSliderLabels();
  applyFilters();
}

function updateSliderLabels() {
  const wr = document.getElementById('wrSlider');
  const pf = document.getElementById('pfSlider');
  const dd = document.getElementById('ddSlider');
  if (wr) document.getElementById('wrVal').textContent = wr.value;
  if (pf) document.getElementById('pfVal').textContent = (pf.value / 10).toFixed(1);
  if (dd) document.getElementById('ddVal').textContent = dd.value;
}

/* =============================================
   13. RENDER TABLE ROWS
============================================= */
function getRankBadge(globalRank) {
  if (globalRank === 0) return '<span class="rank-badge rank-gold" title="👑 #1 Champion">1</span>';
  if (globalRank === 1) return '<span class="rank-badge rank-silver" title="🥈 #2">2</span>';
  if (globalRank === 2) return '<span class="rank-badge rank-bronze" title="🥉 #3">3</span>';
  return `<span class="rank-badge rank-plain">${globalRank + 1}</span>`;
}

function getPageData() {
  const start = (STATE.currentPage - 1) * STATE.perPage;
  return STATE.filtered.slice(start, start + STATE.perPage);
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  const table = document.getElementById('rankTable');
  const skeleton = document.getElementById('skeletonWrap');
  const empty = document.getElementById('emptyState');
  if (!tbody) return;

  if (STATE.filtered.length === 0) {
    table.style.display = 'none';
    if (skeleton) skeleton.style.display = 'none';
    empty.style.display = 'block';
    renderPagination();
    return;
  }
  table.style.display = 'table';
  if (skeleton) skeleton.style.display = 'none';
  empty.style.display = 'none';

  const pageData = getPageData();
  tbody.innerHTML = pageData.map(r => {
    const globalRank = ROBOTS.findIndex(x => x.id === r.id);
    const pfClass = r.profitFactor >= 2 ? 'pf-green' : r.profitFactor >= 1 ? 'pf-yellow' : 'pf-red';
    const inWatchlist = STATE.watchlist.includes(r.id);
    const badges = [
      r.backtested && r.forwardTested ? `<span class="badge badge-audited"><i class="fa-solid fa-shield-check"></i> Audited</span>` : '',
      r.isNew ? `<span class="badge badge-new">New</span>` : '',
      r.isHot ? `<span class="badge badge-hot"><i class="fa-solid fa-fire"></i> Hot</span>` : '',
    ].join('');
    return `
      <tr style="animation: fadeUp 0.4s ${(pageData.indexOf(r) * 0.04).toFixed(2)}s ease both">
        <td>${getRankBadge(globalRank)}</td>
        <td>
          <div class="robot-cell">
            <div class="robot-avatar" style="background:${r.color}22;border:1px solid ${r.color}44">${r.emoji}</div>
            <div class="robot-name-wrap">
              <div class="robot-name">${r.name} ${badges}</div>
              <div class="robot-tag">${r.tag}</div>
            </div>
          </div>
        </td>
        <td>${r.backtested ? '<i class="fa-solid fa-circle-check check-yes" title="Backtested"></i>' : '<i class="fa-solid fa-circle-minus check-no" title="Not backtested"></i>'}</td>
        <td>${r.forwardTested ? '<i class="fa-solid fa-circle-check check-yes" title="Forward Tested"></i>' : '<i class="fa-solid fa-circle-minus check-no" title="Not forward tested"></i>'}</td>
        <td>
          <div class="wr-cell">
            <div class="wr-bar-wrap"><div class="wr-bar" style="width:${r.winRate}%"></div></div>
            <span class="wr-val">${r.winRate}%</span>
          </div>
        </td>
        <td><span class="${pfClass}">${r.profitFactor.toFixed(1)}x</span></td>
        <td><span class="${r.totalReturn >= 0 ? 'ret-pos' : 'ret-neg'}">${r.totalReturn >= 0 ? '+' : ''}${r.totalReturn}%</span></td>
        <td><span class="risk-badge risk-${r.risk}"><i class="fa-solid fa-${r.risk==='Low'?'shield':'circle-'+' '}"></i>${r.risk}</span></td>
        <td><span class="wr-val">${r.sharpe.toFixed(1)}</span></td>
        <td><span class="${r.drawdown <= 10 ? 'ret-pos' : r.drawdown <= 20 ? '' : 'ret-neg'}">${r.drawdown}%</span></td>
        <td><span class="wr-val">${(r.users / 1000).toFixed(1)}K</span></td>
        <td>${renderStars(r.rating)}</td>
        <td><canvas class="sparkline" data-id="${r.id}" width="90" height="32"></canvas></td>
        <td>
          <div class="action-btns">
            <button class="action-btn" data-tip="View Details" onclick="openModal(${r.id})" aria-label="View ${r.name}"><i class="fa-solid fa-eye"></i></button>
            <button class="action-btn ${inWatchlist ? 'active' : ''}" data-tip="${inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}" onclick="toggleWatchlist(${r.id})" aria-label="Watchlist"><i class="fa-${inWatchlist ? 'solid' : 'regular'} fa-star"></i></button>
            <button class="action-btn" data-tip="Add to Compare" onclick="addToCompare(${r.id})" aria-label="Compare"><i class="fa-solid fa-scale-balanced"></i></button>
            <button class="action-btn" data-tip="Copy Link" onclick="copyRobotLink(${r.id})" aria-label="Copy link"><i class="fa-solid fa-link"></i></button>
          </div>
        </td>
      </tr>`;
  }).join('');

  // Draw sparklines after DOM update
  requestAnimationFrame(() => {
    document.querySelectorAll('.sparkline[data-id]').forEach(canvas => {
      const robot = ROBOTS.find(r => r.id === parseInt(canvas.dataset.id));
      if (robot) drawSparkline(canvas, robot.sparkData, robot.color);
    });
  });

  renderPagination();
}

/* =============================================
   14. MOBILE CARDS
============================================= */
function renderCards() {
  const list = document.getElementById('cardList');
  if (!list) return;
  const pageData = getPageData();
  if (pageData.length === 0) { list.innerHTML = ''; return; }
  list.innerHTML = pageData.map(r => {
    const globalRank = ROBOTS.findIndex(x => x.id === r.id);
    const inWatchlist = STATE.watchlist.includes(r.id);
    return `
      <div class="robot-card" style="animation-delay:${ROBOTS.indexOf(r) * 0.04}s">
        <div class="robot-card-header">
          <div class="robot-cell">
            ${getRankBadge(globalRank)}
            <div class="robot-avatar" style="background:${r.color}22;border:1px solid ${r.color}44;margin-left:8px">${r.emoji}</div>
            <div class="robot-name-wrap" style="margin-left:8px">
              <div class="robot-name">${r.name}</div>
              <div class="robot-tag">${r.tag}</div>
            </div>
          </div>
          <div style="display:flex;gap:5px">
            ${r.backtested ? '<i class="fa-solid fa-circle-check check-yes" title="Backtested"></i>' : ''}
            ${r.forwardTested ? '<i class="fa-solid fa-circle-check check-yes" title="Forward Tested"></i>' : ''}
          </div>
        </div>
        <div class="robot-card-metrics">
          <div class="card-metric"><div class="card-metric-label">Win Rate</div><div class="card-metric-val wr-val">${r.winRate}%</div></div>
          <div class="card-metric"><div class="card-metric-label">Return</div><div class="card-metric-val ret-pos">+${r.totalReturn}%</div></div>
          <div class="card-metric"><div class="card-metric-label">Risk</div><div class="card-metric-val"><span class="risk-badge risk-${r.risk}" style="padding:2px 7px;font-size:0.65rem">${r.risk}</span></div></div>
          <div class="card-metric"><div class="card-metric-label">Sharpe</div><div class="card-metric-val wr-val">${r.sharpe.toFixed(1)}</div></div>
          <div class="card-metric"><div class="card-metric-label">Drawdown</div><div class="card-metric-val">${r.drawdown}%</div></div>
          <div class="card-metric"><div class="card-metric-label">Rating</div><div class="card-metric-val wr-val">${r.rating}</div></div>
        </div>
        <div class="robot-card-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal(${r.id})"><i class="fa-solid fa-eye"></i> Details</button>
          <button class="btn btn-ghost btn-sm ${inWatchlist ? 'active' : ''}" onclick="toggleWatchlist(${r.id})"><i class="fa-${inWatchlist ? 'solid' : 'regular'} fa-star"></i></button>
          <button class="btn btn-ghost btn-sm" onclick="addToCompare(${r.id})"><i class="fa-solid fa-scale-balanced"></i></button>
        </div>
      </div>`;
  }).join('');
}

/* =============================================
   15. PAGINATION
============================================= */
function renderPagination() {
  const total = STATE.filtered.length;
  const pages = Math.ceil(total / STATE.perPage);
  const pg = document.getElementById('pagination');
  if (!pg) return;
  if (pages <= 1) { pg.innerHTML = ''; return; }
  let html = `<button class="page-btn" onclick="goPage(${STATE.currentPage - 1})" ${STATE.currentPage === 1 ? 'disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - STATE.currentPage) <= 1) {
      html += `<button class="page-btn ${i === STATE.currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - STATE.currentPage) === 2) {
      html += `<span style="color:var(--text-muted);padding:0 4px">…</span>`;
    }
  }
  html += `<button class="page-btn" onclick="goPage(${STATE.currentPage + 1})" ${STATE.currentPage === pages ? 'disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>`;
  pg.innerHTML = html;
}

function goPage(p) {
  const pages = Math.ceil(STATE.filtered.length / STATE.perPage);
  if (p < 1 || p > pages) return;
  STATE.currentPage = p;
  renderTable();
  renderCards();
  document.getElementById('rankings').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* =============================================
   16. WATCHLIST
============================================= */
function toggleWatchlist(id) {
  const idx = STATE.watchlist.indexOf(id);
  if (idx === -1) {
    STATE.watchlist.push(id);
    showToast('⭐ Added to watchlist');
  } else {
    STATE.watchlist.splice(idx, 1);
    showToast('Removed from watchlist');
  }
  saveUserData();
  renderTable();
  renderCards();
  renderDashboard();
}

function renderDashboard() {
  // Watchlist
  const wc = document.getElementById('watchlistContainer');
  if (wc) {
    if (STATE.watchlist.length === 0) {
      wc.innerHTML = '<p class="empty-msg">No robots saved yet. Click ⭐ to add.</p>';
    } else {
      wc.innerHTML = STATE.watchlist.map(id => {
        const r = ROBOTS.find(x => x.id === id);
        if (!r) return '';
        return `<div class="watchlist-item">
          <span>${r.emoji} <strong>${r.name}</strong></span>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="ret-pos" style="font-family:var(--mono);font-size:0.82rem">+${r.totalReturn}%</span>
            <button class="btn-icon" onclick="toggleWatchlist(${r.id})" title="Remove"><i class="fa-solid fa-trash" style="color:var(--red)"></i></button>
          </div>
        </div>`;
      }).join('');
    }
  }

  // Recently Viewed
  const rv = document.getElementById('recentlyViewedContainer');
  if (rv) {
    if (STATE.recentlyViewed.length === 0) {
      rv.innerHTML = '<p class="empty-msg">No robots viewed yet.</p>';
    } else {
      rv.innerHTML = STATE.recentlyViewed.slice(0, 5).map(id => {
        const r = ROBOTS.find(x => x.id === id);
        if (!r) return '';
        return `<div class="watchlist-item">
          <span style="cursor:pointer" onclick="openModal(${r.id})">${r.emoji} <strong>${r.name}</strong></span>
          <span class="risk-badge risk-${r.risk}" style="font-size:0.65rem;padding:2px 7px">${r.risk}</span>
        </div>`;
      }).join('');
    }
  }

  // Alerts list
  renderAlerts();

  // Populate alert robot select
  const alertSel = document.getElementById('alertRobot');
  if (alertSel && alertSel.options.length <= 1) {
    ROBOTS.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = r.emoji + ' ' + r.name;
      alertSel.appendChild(opt);
    });
  }
}

function renderAlerts() {
  const al = document.getElementById('alertsList');
  if (!al) return;
  if (STATE.alerts.length === 0) {
    al.innerHTML = '<p class="empty-msg">No alerts set.</p>';
    return;
  }
  al.innerHTML = STATE.alerts.map((a, i) => {
    const r = ROBOTS.find(x => x.id === a.robotId);
    return `<div class="alert-item">
      <span>${r ? r.emoji + ' ' + r.name : '?'} — ${a.type === 'above' ? 'Win Rate >' : 'Drawdown <'} ${a.val}%</span>
      <button class="btn-icon" onclick="removeAlert(${i})"><i class="fa-solid fa-xmark"></i></button>
    </div>`;
  }).join('');
}

function addAlert() {
  const robotId = parseInt(document.getElementById('alertRobot').value);
  const type = document.getElementById('alertType').value;
  const val = parseFloat(document.getElementById('alertVal').value);
  if (!robotId || isNaN(val)) { showToast('Please fill all alert fields'); return; }
  STATE.alerts.push({ robotId, type, val });
  saveUserData();
  renderAlerts();
  showToast('🔔 Alert set!');
  document.getElementById('alertVal').value = '';
}

function removeAlert(i) {
  STATE.alerts.splice(i, 1);
  saveUserData();
  renderAlerts();
}

/* =============================================
   17. RECENTLY VIEWED
============================================= */
function trackView(id) {
  STATE.recentlyViewed = [id, ...STATE.recentlyViewed.filter(x => x !== id)].slice(0, 10);
  saveUserData();
  renderDashboard();
}

/* =============================================
   18. MODAL
============================================= */
let modalChart = null;

function openModal(id) {
  const r = ROBOTS.find(x => x.id === id);
  if (!r) return;
  trackView(id);
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const globalRank = ROBOTS.findIndex(x => x.id === id) + 1;
  const inWatchlist = STATE.watchlist.includes(id);
  const pfClass = r.profitFactor >= 2 ? 'pf-green' : r.profitFactor >= 1 ? 'pf-yellow' : 'pf-red';

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-robot-avatar" style="background:${r.color}22;border:2px solid ${r.color}55">${r.emoji}</div>
      <div>
        <div class="modal-title">${r.name}</div>
        <div style="color:var(--text-secondary);font-size:0.82rem;margin-top:3px">${r.tag} · Rank #${globalRank} · Since ${r.since}</div>
        <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">
          ${r.backtested ? `<span class="badge badge-verified"><i class="fa-solid fa-check"></i> Backtested</span>` : ''}
          ${r.forwardTested ? `<span class="badge badge-new"><i class="fa-solid fa-check"></i> Forward Tested</span>` : ''}
          ${r.isHot ? `<span class="badge badge-hot"><i class="fa-solid fa-fire"></i> Trending</span>` : ''}
          ${r.isNew ? `<span class="badge badge-new">New</span>` : ''}
        </div>
      </div>
    </div>
    <div class="modal-metrics">
      <div class="modal-metric"><div class="modal-metric-label">Win Rate</div><div class="modal-metric-val wr-val">${r.winRate}%</div></div>
      <div class="modal-metric"><div class="modal-metric-label">Total Return</div><div class="modal-metric-val ret-pos">+${r.totalReturn}%</div></div>
      <div class="modal-metric"><div class="modal-metric-label">Profit Factor</div><div class="modal-metric-val ${pfClass}">${r.profitFactor.toFixed(1)}x</div></div>
      <div class="modal-metric"><div class="modal-metric-label">Sharpe Ratio</div><div class="modal-metric-val wr-val">${r.sharpe.toFixed(1)}</div></div>
      <div class="modal-metric"><div class="modal-metric-label">Max Drawdown</div><div class="modal-metric-val">${r.drawdown}%</div></div>
      <div class="modal-metric"><div class="modal-metric-label">Risk Level</div><div class="modal-metric-val"><span class="risk-badge risk-${r.risk}">${r.risk}</span></div></div>
      <div class="modal-metric"><div class="modal-metric-label">Users</div><div class="modal-metric-val wr-val">${(r.users/1000).toFixed(1)}K</div></div>
      <div class="modal-metric"><div class="modal-metric-label">Min Deposit</div><div class="modal-metric-val wr-val">$${r.minDeposit}</div></div>
    </div>
    <div style="background:var(--bg2);border-radius:var(--radius-sm);padding:14px 16px;margin-bottom:22px;font-size:0.875rem;color:var(--text-secondary);line-height:1.65">
      <strong style="color:var(--text)">Strategy:</strong> ${r.strategy}
    </div>
    <div class="modal-chart-wrap">
      <h4>6-Month Monthly Performance</h4>
      <canvas id="modalPerfChart" height="160"></canvas>
    </div>
    <div class="reviews-section">
      <h4>${renderStars(r.rating)} (${r.reviews.length} reviews)</h4>
      ${r.reviews.length === 0 ? '<p class="empty-msg">No reviews yet. Be the first!</p>' :
        r.reviews.map(rev => `
          <div class="review-item">
            <div class="review-header">
              <div class="review-user">
                <i class="fa-solid fa-user-circle"></i> ${rev.user}
                ${rev.verified ? '<span class="review-verified">✓ Verified</span>' : ''}
              </div>
              <div style="display:flex;align-items:center;gap:10px">
                ${renderStars(rev.rating)}
                <span style="font-size:0.72rem;color:var(--text-muted);font-family:var(--mono)">${rev.date}</span>
              </div>
            </div>
            <div class="review-text">${rev.text}</div>
          </div>`).join('')
      }
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary btn-sm" onclick="toggleWatchlist(${id});document.getElementById('modal').querySelector('.action-btn-watch').classList.toggle('active')">
        <i class="fa-${inWatchlist ? 'solid' : 'regular'} fa-star"></i> ${inWatchlist ? 'Remove Watchlist' : 'Add to Watchlist'}
      </button>
      <button class="btn btn-ghost btn-sm" onclick="addToCompare(${id});closeModal()"><i class="fa-solid fa-scale-balanced"></i> Compare</button>
      <button class="btn btn-ghost btn-sm" onclick="copyRobotLink(${id})"><i class="fa-solid fa-link"></i> Copy Link</button>
      <button class="btn btn-ghost btn-sm" onclick="showToast('Share feature coming soon!')"><i class="fa-brands fa-twitter"></i> Share</button>
    </div>`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Modal performance chart
  requestAnimationFrame(() => {
    const canvas = document.getElementById('modalPerfChart');
    if (!canvas) return;
    if (modalChart) { modalChart.destroy(); modalChart = null; }
    const labels = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].slice(0, r.monthlyPerf.length);
    modalChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Monthly Return %',
          data: r.monthlyPerf,
          backgroundColor: r.monthlyPerf.map(v => v >= 0 ? r.color + 'cc' : '#ff4c4c88'),
          borderColor: r.monthlyPerf.map(v => v >= 0 ? r.color : '#ff4c4c'),
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { color: '#7a9cc4', font: { family: 'DM Mono', size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
          x: { ticks: { color: '#7a9cc4', font: { family: 'DM Mono', size: 10 } }, grid: { display: false } }
        }
      }
    });
  });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  if (modalChart) { modalChart.destroy(); modalChart = null; }
}

/* =============================================
   19. COMPARE TOOL
============================================= */
function initCompareSlots() {
  const wrap = document.getElementById('compareSelectors');
  if (!wrap) return;
  wrap.innerHTML = [0, 1, 2].map(i => `
    <div class="compare-slot">
      <label>Robot ${i + 1}</label>
      <select class="filter-select" id="compareSlot${i}" onchange="setCompareSlot(${i}, this.value)">
        <option value="">-- Select robot --</option>
        ${ROBOTS.map(r => `<option value="${r.id}">${r.emoji} ${r.name}</option>`).join('')}
      </select>
    </div>`).join('');
}

function setCompareSlot(i, val) {
  STATE.compareSlots[i] = val ? parseInt(val) : null;
  renderCompareTable();
}

function addToCompare(id) {
  const empty = STATE.compareSlots.findIndex(x => x === null);
  if (empty === -1) { showToast('Compare slots full. Clear one first.'); return; }
  STATE.compareSlots[empty] = id;
  const sel = document.getElementById('compareSlot' + empty);
  if (sel) sel.value = id;
  renderCompareTable();
  document.getElementById('compare-section').scrollIntoView({ behavior: 'smooth' });
  showToast('Added to compare!');
}

function renderCompareTable() {
  const robots = STATE.compareSlots.map(id => ROBOTS.find(r => r.id === id)).filter(Boolean);
  const wrap = document.getElementById('compareTableWrap');
  const container = document.getElementById('compareTableContainer');
  const rec = document.getElementById('compareRecommendation');
  if (!wrap || !container) return;
  if (robots.length < 2) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';

  const metrics = [
    { key: 'winRate', label: 'Win Rate', fmt: v => v + '%', higher: true },
    { key: 'profitFactor', label: 'Profit Factor', fmt: v => v.toFixed(1) + 'x', higher: true },
    { key: 'totalReturn', label: 'Total Return', fmt: v => '+' + v + '%', higher: true },
    { key: 'sharpe', label: 'Sharpe Ratio', fmt: v => v.toFixed(1), higher: true },
    { key: 'drawdown', label: 'Max Drawdown', fmt: v => v + '%', higher: false },
    { key: 'users', label: 'Users', fmt: v => (v/1000).toFixed(1) + 'K', higher: true },
    { key: 'rating', label: 'User Rating', fmt: v => '⭐ ' + v.toFixed(1), higher: true },
    { key: 'risk', label: 'Risk Level', fmt: v => v, higher: false },
  ];

  container.innerHTML = `<table class="compare-table">
    <thead><tr>
      <th class="compare-metric">Metric</th>
      ${robots.map(r => `<th><div class="robot-cell" style="gap:8px">${r.emoji} <span>${r.name}</span></div></th>`).join('')}
    </tr></thead>
    <tbody>
      ${metrics.map(m => {
        const vals = robots.map(r => r[m.key]);
        const numVals = vals.map(v => typeof v === 'number' ? v : 0);
        const best = m.higher ? Math.max(...numVals) : Math.min(...numVals);
        return `<tr>
          <td class="compare-metric">${m.label}</td>
          ${robots.map((r, i) => {
            const isBest = numVals[i] === best && (m.key !== 'risk');
            return `<td class="${isBest ? 'compare-best' : ''}">${m.fmt(r[m.key])}</td>`;
          }).join('')}
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;

  // Simple recommendation
  const scores = robots.map(r => r.winRate * 0.3 + r.profitFactor * 10 + r.totalReturn * 0.1 + r.sharpe * 5 - r.drawdown * 0.5 + r.rating * 5);
  const bestIdx = scores.indexOf(Math.max(...scores));
  rec.innerHTML = `<strong><i class="fa-solid fa-lightbulb" style="color:var(--yellow)"></i> Recommendation:</strong>
    Based on composite scoring (win rate, return, risk, sharpe), <strong>${robots[bestIdx].emoji} ${robots[bestIdx].name}</strong> leads with the best overall performance profile.`;
}

function clearCompare() {
  STATE.compareSlots = [null, null, null];
  [0,1,2].forEach(i => { const s = document.getElementById('compareSlot'+i); if (s) s.value = ''; });
  document.getElementById('compareTableWrap').style.display = 'none';
  showToast('Comparison cleared');
}

/* =============================================
   20. CHARTS
============================================= */
let charts = {};

function initCharts() {
  const isDark = STATE.theme === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const tickColor = isDark ? '#7a9cc4' : '#3d5f84';
  const textColor = isDark ? '#e4edf8' : '#0f1e33';

  Chart.defaults.font.family = 'DM Mono';
  Chart.defaults.color = tickColor;

  // 1. Win Rate Bar
  const top10 = [...ROBOTS].sort((a,b) => b.winRate - a.winRate).slice(0, 10);
  const wr = document.getElementById('winRateChart');
  if (wr) {
    if (charts.wr) charts.wr.destroy();
    charts.wr = new Chart(wr, {
      type: 'bar',
      data: {
        labels: top10.map(r => r.name.split(' ').slice(0,2).join(' ')),
        datasets: [{
          data: top10.map(r => r.winRate),
          backgroundColor: top10.map(r => r.color + 'bb'),
          borderColor: top10.map(r => r.color),
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 50, max: 100, ticks: { callback: v => v + '%', color: tickColor, font:{size:10} }, grid: { color: gridColor } },
          y: { ticks: { color: tickColor, font:{size:10} }, grid: { display: false } }
        }
      }
    });
  }

  // 2. Risk Pie
  const riskCounts = { Low: 0, Medium: 0, High: 0 };
  ROBOTS.forEach(r => riskCounts[r.risk]++);
  const riskC = document.getElementById('riskChart');
  if (riskC) {
    if (charts.risk) charts.risk.destroy();
    charts.risk = new Chart(riskC, {
      type: 'doughnut',
      data: {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
          data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
          backgroundColor: ['rgba(0,230,118,0.8)', 'rgba(255,215,0,0.8)', 'rgba(255,76,76,0.8)'],
          borderColor: ['#00e676','#ffd700','#ff4c4c'],
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: tickColor, font:{family:'DM Mono',size:11}, padding: 12 } }
        }
      }
    });
  }

  // 3. Performance trend
  const perfSel = document.getElementById('perfChartSelect');
  if (perfSel && perfSel.options.length === 0) {
    ROBOTS.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = r.emoji + ' ' + r.name;
      perfSel.appendChild(opt);
    });
    perfSel.addEventListener('change', () => updatePerfChart(parseInt(perfSel.value)));
  }
  updatePerfChart(1);

  // 4. Scatter
  const sc = document.getElementById('scatterChart');
  if (sc) {
    if (charts.scatter) charts.scatter.destroy();
    charts.scatter = new Chart(sc, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Robots',
          data: ROBOTS.map(r => ({ x: r.drawdown, y: r.totalReturn, label: r.name })),
          backgroundColor: ROBOTS.map(r => r.color + 'bb'),
          borderColor: ROBOTS.map(r => r.color),
          pointRadius: 7,
          pointHoverRadius: 10,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => {
                const r = ROBOTS[ctx.dataIndex];
                return `${r.name}: Return +${ctx.parsed.y}%, DD ${ctx.parsed.x}%`;
              }
            }
          }
        },
        scales: {
          x: { title: { display: true, text: 'Max Drawdown %', color: tickColor, font:{size:11} }, ticks: { color: tickColor, font:{size:10} }, grid: { color: gridColor } },
          y: { title: { display: true, text: 'Total Return %', color: tickColor, font:{size:11} }, ticks: { color: tickColor, font:{size:10} }, grid: { color: gridColor } }
        }
      }
    });
  }
}

function updatePerfChart(robotId) {
  const r = ROBOTS.find(x => x.id === robotId);
  if (!r) return;
  const perf = document.getElementById('perfChart');
  if (!perf) return;
  const isDark = STATE.theme === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
  const tickColor = isDark ? '#7a9cc4' : '#3d5f84';
  const labels = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].slice(0, r.monthlyPerf.length);
  if (charts.perf) charts.perf.destroy();
  charts.perf = new Chart(perf, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: r.name + ' Monthly %',
        data: r.monthlyPerf,
        borderColor: r.color,
        backgroundColor: r.color + '22',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: r.color,
        pointRadius: 4,
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: v => v + '%', color: tickColor, font:{size:10} }, grid: { color: gridColor } },
        x: { ticks: { color: tickColor, font:{size:10} }, grid: { display: false } }
      }
    }
  });
}

function updateChartThemes() {
  // Reinit all charts when theme changes
  setTimeout(initCharts, 100);
}

/* =============================================
   21. GLOBE DOTS
============================================= */
function initGlobe() {
  const container = document.getElementById('globeDots');
  if (!container) return;
  const positions = [
    {top:'25%',left:'30%',delay:'0s'},{top:'40%',left:'70%',delay:'0.5s'},
    {top:'60%',left:'25%',delay:'1s'},{top:'30%',left:'55%',delay:'1.5s'},
    {top:'55%',left:'60%',delay:'0.3s'},{top:'20%',left:'45%',delay:'0.8s'},
    {top:'70%',left:'45%',delay:'1.2s'},{top:'45%',left:'35%',delay:'0.6s'},
  ];
  container.innerHTML = positions.map(p =>
    `<div class="globe-dot" style="top:${p.top};left:${p.left};animation-delay:${p.delay}"></div>`
  ).join('');
}

/* =============================================
   22. SCROLL REVEAL
============================================= */
function initScrollReveal() {
  document.querySelectorAll('.chart-card, .dash-card, .compare-slot, .map-stat, .section-title').forEach(el => {
    el.classList.add('reveal');
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* =============================================
   23. EXPORT CSV
============================================= */
function exportCSV() {
  const headers = ['Rank','Name','Backtested','Forward Tested','Win Rate','Profit Factor','Total Return','Risk','Sharpe','Drawdown','Users','Rating'];
  const rows = STATE.filtered.map((r, i) => [
    i+1, r.name, r.backtested ? 'Yes' : 'No', r.forwardTested ? 'Yes' : 'No',
    r.winRate + '%', r.profitFactor, '+' + r.totalReturn + '%', r.risk,
    r.sharpe, r.drawdown + '%', r.users, r.rating
  ]);
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'xop-trade-rankings.csv'; a.click();
  URL.revokeObjectURL(url);
  showToast('📊 CSV exported!');
}

/* =============================================
   24. COPY ROBOT LINK
============================================= */
function copyRobotLink(id) {
  const r = ROBOTS.find(x => x.id === id);
  const url = `${location.origin}${location.pathname}?robot=${id}`;
  navigator.clipboard?.writeText(url).catch(() => {});
  showToast(`🔗 Link copied for ${r?.name || 'robot'}`);
}

/* =============================================
   25. NEWSLETTER
============================================= */
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail')?.value;
  if (!email || !email.includes('@')) { showToast('Please enter a valid email'); return; }
  showToast('🎉 Subscribed! Welcome to XOP Trade.');
  document.getElementById('newsletterEmail').value = '';
}

/* =============================================
   26. KEYBOARD SHORTCUTS
============================================= */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (['INPUT','SELECT','TEXTAREA'].includes(tag)) return;
    switch (e.key) {
      case '/':
        e.preventDefault();
        document.getElementById('heroSearch')?.focus();
        break;
      case 'f': case 'F':
        document.getElementById('filterToggleBtn')?.click();
        break;
      case 'd': case 'D':
        toggleTheme();
        break;
      case 'Escape':
        if (document.getElementById('modalOverlay').classList.contains('open')) closeModal();
        if (document.getElementById('mobileNav').classList.contains('open')) closeMobileNav();
        break;
    }
  });
}

/* =============================================
   27. AUTO-REFRESH
============================================= */
function startAutoRefresh() {
  STATE.refreshTimer = setInterval(() => {
    if (!STATE.autoRefresh) return;
    // Simulate minor data changes
    ROBOTS.forEach(r => {
      r.users += Math.floor(Math.random() * 3);
    });
    renderTable();
    renderCards();
  }, 30000);
}

/* =============================================
   28. MOBILE NAV
============================================= */
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

/* =============================================
   29. INIT — bind events and render everything
============================================= */
function init() {
  loadUserData();
  applyTheme();

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

  // Hamburger
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('open');
  });

  // Filter toggle
  document.getElementById('filterToggleBtn')?.addEventListener('click', () => {
    document.getElementById('filterPanel').classList.toggle('open');
    showToast(document.getElementById('filterPanel').classList.contains('open') ? 'Filters open (press F to close)' : 'Filters closed');
  });

  // Search (debounced)
  let searchTimer;
  ['heroSearch', 'tableSearch'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 300);
    });
  });

  // Filter controls
  ['filterBt','filterFt'].forEach(id => document.getElementById(id)?.addEventListener('change', applyFilters));
  document.querySelectorAll('.risk-cb').forEach(cb => cb.addEventListener('change', applyFilters));
  document.getElementById('sortSelect')?.addEventListener('change', applyFilters);

  // Sliders
  ['wrSlider','pfSlider','ddSlider'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => { updateSliderLabels(); applyFilters(); });
  });

  // Reset filters
  document.getElementById('resetFilters')?.addEventListener('click', resetFilters);

  // Export CSV
  document.getElementById('exportCsvBtn')?.addEventListener('click', exportCSV);

  // Print
  document.getElementById('printBtn')?.addEventListener('click', () => window.print());

  // Modal close
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Compare clear
  document.getElementById('clearCompare')?.addEventListener('click', clearCompare);

  // Alert add
  document.getElementById('addAlertBtn')?.addEventListener('click', addAlert);

  // Auto-refresh toggle
  document.getElementById('autoRefresh')?.addEventListener('change', e => {
    STATE.autoRefresh = e.target.checked;
    showToast(STATE.autoRefresh ? '⟳ Auto-refresh on' : 'Auto-refresh off');
  });

  // Performance chart selector
  document.getElementById('perfChartSelect')?.addEventListener('change', e => {
    updatePerfChart(parseInt(e.target.value));
  });

  // RENDER EVERYTHING
  applyFilters(); // sets STATE.filtered and calls renderTable/renderCards
  renderTrending();
  renderDashboard();
  initCompareSlots();
  initGlobe();
  initKeyboard();
  initScrollReveal();
  simulateLiveCounter();

  // Counters after short delay
  setTimeout(() => {
    animateCounters();
  }, 400);

  // Charts after DOM settles
  setTimeout(initCharts, 600);

  // Show table (was hidden during skeleton)
  setTimeout(() => {
    const sk = document.getElementById('skeletonWrap');
    const tbl = document.getElementById('rankTable');
    if (sk) sk.style.display = 'none';
    if (tbl && STATE.filtered.length > 0) tbl.style.display = 'table';
  }, 800);

  // Activity feed
  setTimeout(() => {
    spawnActivity();
    setInterval(spawnActivity, 5500);
  }, 2000);

  // Auto-refresh
  startAutoRefresh();

  // Handle ?robot= URL param
  const params = new URLSearchParams(location.search);
  const robotParam = params.get('robot');
  if (robotParam) {
    setTimeout(() => {
      openModal(parseInt(robotParam));
      document.getElementById('rankings').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  // Nav active link on scroll
  const sections = ['home','rankings','compare-section','charts-section','about'];
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = [...navLinks].find(l => l.getAttribute('href') === '#' + entry.target.id || (entry.target.id === 'home' && l.getAttribute('href') === '#'));
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) scrollSpy.observe(el);
  });
}

/* =============================================
   BOOT
============================================= */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
