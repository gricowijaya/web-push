const PUBLIC_VAPID_KEY = 'BGACNPKpSjqsw4e5-gWcNodhm0Y3cfkTflGe0d3to2PA5dSBGVdL-UNgBBMkzAWA-kC7tgeAHIzUckEYLGun810'

// request to allow notification
const notifPermission = async() => {
    return await Notification.requestPermission();
}

// check the service worker
const serviceWorkerCheck = async() => { 
    if ('serviceWorker' in navigator) return true; 
    return false;
}

// register the service worker
const registerServiceWorker = async() => {

    await notifPermission(); // request allow notification
    if (serviceWorkerCheck) {
        let permission = Notification.permission; // return granted or deny or default  
        if (permission === 'default') permission = await notifPermission();
        if (permission === 'denied') return console.error("Notification Denied");
        // create the register using the event listener from the worker
        const register = await navigator.serviceWorker.register('./worker.js', { scope: '/' });
        // subscription register configuration
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_VAPID_KEY
        });
        
        // save subscription in server.

        // fetch the subscribe API from the backend server 
        // and save the subscription
        await fetch('/subscribe', {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            }
        });
    } else {
        return alert('Push Notification not suported')
    }

}

registerServiceWorker();
