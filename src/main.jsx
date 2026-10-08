import './style.css';

const root = document.getElementById('root');
let loading = false;

function applySavedPalette() {
  const theme = localStorage.getItem('blocksmith-theme') === 'dark' ? 'dark' : 'light';
  const savedAccent = localStorage.getItem('blocksmith-accent');
  const accents = theme === 'dark' ? ['green', 'white', 'blue'] : ['green', 'orange', 'blue'];
  const compatibleAccent = theme === 'dark' && savedAccent === 'orange'
    ? 'white'
    : theme === 'light' && savedAccent === 'white'
      ? 'orange'
      : savedAccent;
  const accent = accents.includes(compatibleAccent) ? compatibleAccent : 'green';
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.accent = accent;
}

function renderBoot(state) {
  const error = state === 'error';
  root.innerHTML = `<main class="app-boot ${error ? 'app-boot-error' : 'app-boot-loading'}" role="${error ? 'alert' : 'status'}"><div class="app-boot-card"><div class="app-boot-brand"><span class="logo">⌘</span><span>blocksmith<small>CPP STUDIO</small></span></div>${error ? '<p>編輯器載入失敗，請確認連線後重試。</p><button type="button">重新載入</button>' : '<span class="app-boot-spinner" aria-hidden="true"></span><p>正在載入編輯器…</p>'}</div></main>`;
  if (error) root.querySelector('button').addEventListener('click', loadApp, { once: true });
}

applySavedPalette();
renderBoot('loading');

async function loadApp() {
  if (loading) return;
  loading = true;
  applySavedPalette();
  renderBoot('loading');
  performance.mark('blocksmith-app-load-start');
  try {
    const [{ default: App }, React, { createRoot }] = await Promise.all([
      import('./App.jsx'),
      import('react'),
      import('react-dom/client'),
    ]);
    createRoot(root).render(React.createElement(React.StrictMode, null, React.createElement(App)));
  } catch {
    loading = false;
    renderBoot('error');
  }
}

function scheduleAppLoad() {
  requestAnimationFrame(() => {
    if (window.requestIdleCallback) window.requestIdleCallback(loadApp, { timeout: 300 });
    else window.setTimeout(loadApp, 80);
  });
}

scheduleAppLoad();
