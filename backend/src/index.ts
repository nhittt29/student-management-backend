import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'; // 👈 Import hàm connectDB

// Load biến môi trường
dotenv.config();

// Tạo app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Gọi hàm kết nối DB
connectDB();

// Biến môi trường
const PORT = process.env.PORT || 3000;

// Test route
app.get('/', (_req, res) => {
  res.send('🎓 Ứng dụng Quản lý Học sinh đang chạy...');
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
