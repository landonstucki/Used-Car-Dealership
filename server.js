// Imports
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

// Variable Declaration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

// Setup Express Server
const app = express();


// Middleware
app.use(express.static(path.join(__dirname, 'public')));


// Route Declaration
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/about.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/products.html'));
});

// Server Start and Listen
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});