navigator.serviceWorker.register('/pwa/sw.js').then((reg) => {
  console.log('Successfully registered service worker', reg);
});

let promptEvent;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  promptEvent = e;
  document.getElementById('add_btn').style.display = 'block';
});

document.getElementById('add_btn').addEventListener('click', () => {
  promptEvent.prompt();
});
