import express from "express";
import authRoutes from "./routes/auth.routes.js";
import resourseRoutes from './routes/resource.routes.js';
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use('/api/resource',resourseRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
