// Vercel Web Analytics - Inline injection
// This script will automatically work when deployed to Vercel

(function() {
  // Check if we're in a browser
  if (typeof window === 'undefined') return;
  
  // Detect environment
  function detectEnvironment() {
    try {
      const env = typeof process !== 'undefined' && process.env && process.env.NODE_ENV;
      if (env === 'development' || env === 'test') {
        return 'development';
      }
    } catch (e) {}
    return 'production';
  }
  
  // Initialize queue
  if (!window.va) {
    window.va = function(...params) {
      (window.vaq = window.vaq || []).push(params);
    };
  }
  
  // Set mode
  const mode = detectEnvironment();
  window.vam = mode;
  
  // Determine script source
  const isDev = mode === 'development';
  const src = isDev 
    ? 'https://va.vercel-scripts.com/v1/script.debug.js'
    : '/_vercel/insights/script.js';
  
  // Check if script already exists
  if (document.head.querySelector(`script[src*="${src}"]`)) return;
  
  // Create and inject script
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = '@vercel/analytics';
  script.dataset.sdkv = '1.6.1';
  
  script.onerror = function() {
    const errorMessage = isDev 
      ? 'Please check if any ad blockers are enabled and try again.'
      : 'Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.';
    console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
  };
  
  document.head.appendChild(script);
})();
