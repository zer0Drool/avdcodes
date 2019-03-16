const express = require('express');
const app = express();

const device = require('express-device');
app.use(device.capture());

const compression = require('compression');
app.use(compression());

app.use(express.static('./public'));

app.get('/', (req, res) => {
    req.device.type === 'phone' || req.device.type === 'tablet' ? res.sendFile(__dirname + '/mobile.html') : res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 8080, () => console.log(`initializing avd.codes__`));
