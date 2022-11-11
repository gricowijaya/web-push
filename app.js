require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const webpush = require('web-push');
const router = require('./routes')
const path = require('path');
const cors = require('cors');
const app = express();
const { PORT, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env

// middleware
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// here we set the public and private vapid key with the subject  
webpush.setVapidDetails("mailto:gricowijaya@gmail.com", PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

// use the router  
app.use(router)

// listen to the port express
app.listen(PORT, () => { console.log(`listen in ${PORT}`); });

