import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';


import productRoutes from './routes/productRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';
dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// Middleware to parse URL-encoded bodies
//app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

app.get("/*", (req, res) => {
    res.redirect("/");
  });
 
  mongoose.connect(process.env.ATLAS_URI)
   .then(() => console.log('MongoDB connected')) 
   .catch(err => console.log(err));


   app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  const logRequestMethod = (req, res, next) => {
    console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
    next();
  };
  app.use(logRequestMethod);