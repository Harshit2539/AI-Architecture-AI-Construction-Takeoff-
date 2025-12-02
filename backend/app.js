// // require('dotenv').config();
// import dotenv from 'dotenv';
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const authMiddleware = require('./middleware/authMiddleware');
// import boqRoutes from "./routes/boqRoutes.js";
// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/uploaded', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/companies', require('./routes/companyRoutes'));
// app.use('/api/users', authMiddleware, require('./routes/userRoutes'));
// app.use('/api/teams', require('./routes/teamRoutes'));
// app.use("/api/projects", require('./routes/projectRoutes'));
// // app.use("/api/boq", require("./routes/boqRoutes"));
// app.use("/api/boq", boqRoutes);
// const mongoUri = process.env.MONGO_URI;
// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = 3008;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import authMiddleware from './middleware/authMiddleware.js';
import boqRoutes from './routes/boqRoutes.js';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploaded', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/teams', teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/boq", boqRoutes);

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
