const webpush = require('web-push');
module.exports = { 
    subscribe: (req, res, next) => {
        try { 
            const subcription = req.body;
            res.status(200).json({
                status: true,
                message: "Already Create a subcription"
            });
            const payload = JSON.stringify({
                title: "Notification",
                body: "Push Notification using the Service Worker"
            });
            // here we send the notification of the payload if the promise is resolved 
            webpush.sendNotification(subcription, payload).catch(console.log);
        } catch(err) { 
            next(err);
        }
    }
}
