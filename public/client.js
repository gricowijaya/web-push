
const PUBLIC_VAPID_KEY="BGACNPKpSjqsw4e5-gWcNodhm0Y3cfkTflGe0d3to2PA5dSBGVdL-UNgBBMkzAWA-kC7tgeAHIzUckEYLGun810"

// register the service worker
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) { 
        send().catch(console.log)
    }
    // check the service worker in the browser web
    // if('serviceWorker' in navigator) send().catch(console.log);
    // create the register using the event listener from the worker
    const register = await navigator.serviceWorker.register('./worker.js', { scope: '/' });
    // subscription register configuration
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY
    });

    // fetch the subscribe API from the backend server
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        }
    });
}
