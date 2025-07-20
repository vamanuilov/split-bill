import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(process.cwd(), 'dist')));

// Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Authentication routes (placeholder for future implementation)
app.post('/api/auth/login', (_req, res) => {
  // To be implemented
  res.status(501).json({ message: 'Not implemented yet' });
});

app.post('/api/auth/register', (_req, res) => {
  // To be implemented
  res.status(501).json({ message: 'Not implemented yet' });
});

// User data routes (placeholder for future implementation)
app.get('/api/user/settings', (_req, res) => {
  // To be implemented
  res.status(501).json({ message: 'Not implemented yet' });
});

app.put('/api/user/settings', (_req, res) => {
  // To be implemented
  res.status(501).json({ message: 'Not implemented yet' });
});

// 404 handler for undefined API routes
app.all('/api*', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve React app for all other routes (SPA fallback)
app.get('*', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});
