navigator.serviceWorker.register('/pwa/sw.js').then((reg) => {
  console.log('Successfully registered service worker', reg);
});
