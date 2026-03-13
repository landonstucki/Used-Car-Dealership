// Imports
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

// Variable Declaration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

// Setup Express Server
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Live Reload Server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch([
    path.join(__dirname, 'public'),
    path.join(__dirname, 'src/views')
]);

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

// Middleware
app.use(connectLivereload());
app.use(express.static(path.join(__dirname, 'public')));

// Route Declaration
app.get('/', (req, res) => {
    res.render('home', { title: "Home"});
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About"});
});

app.get('/vehicles', (req, res) => {
    res.render('vehicles', { title: "Vehicles"});
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: "Contact"});
});

// Server Start and Listen
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});