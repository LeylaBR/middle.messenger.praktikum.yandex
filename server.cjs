const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile('src/pages/registration/registration.html', { root: path.join(__dirname, 'dist') });
});

app.get('/chat', (req, res) => {
    res.sendFile('src/pages/chatWindow/chatWindow.html', { root: path.join(__dirname, 'dist') });
});

app.get('/settings', (req, res) => {
    res.sendFile('src/pages/settingsPage/settingsPage.html', { root: path.join(__dirname, 'dist') });
});

app.get('/500', (req, res) => {
    res.sendFile('src/pages/500Page/500Page.html', { root: path.join(__dirname, 'dist') });
});

app.get('/404', (req, res) => {
    res.sendFile('src/pages/404Page/404Page.html', { root: path.join(__dirname, 'dist') });
});

app.listen(port, () => {
    console.log(`Listening ${port}`);
});