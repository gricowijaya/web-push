require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const webpush = require('web-push');
const router = require('./routes')
const path = require('path');
const app = express();
const { PORT } = process.env

const PUBLIC_VAPID_KEY="BGACNPKpSjqsw4e5-gWcNodhm0Y3cfkTflGe0d3to2PA5dSBGVdL-UNgBBMkzAWA-kC7tgeAHIzUckEYLGun810"
const PRIVATE_VAPID_KEY="BiZjU4x-HgPQYl_qp6oApzC3PNjZOw6v43dAbCtsTyo"

app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, "public")));

// here we set the public and private vapid key with the subject  
webpush.setVapidDetails("mailto:gricowijaya@gmail.com", PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

// use the router  
// app.use(router)
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    webpush.sendNotification(subscription, payload).catch(console.log);
});

// listen to the port express
app.listen(PORT, () => { console.log(`listen in ${PORT}`); });

