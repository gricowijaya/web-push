// create the event listener in the worder
self.addEventListener('push', (event) => { 
    const data = event.data.json();
    // get the title and the body from the endpoint "/subscribe" 
    self.registration.showNotification(
        data.title,
        { body: data.body },
    );
});
