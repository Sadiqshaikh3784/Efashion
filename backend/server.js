import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productsRoutes.js'
import cartRoutes from './routes/cart.js'
import addressRoutes from './routes/address.js'
import orderRoutes from './routes/order.js'
import adminRoutes from "./routes/admin.js";
import newsletterRoutes from "./routes/newsletter.js";

dotenv.config();

const app = express();
console.log("CORS ENABLED");

// ✅ SIMPLE (NO CONFIG)
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.get('/check', (req, res) => {
  res.send("api is running....");
});

connectDB();

app.listen(8000, () => {
  console.log('server is running on port 8000');
});