import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from './inngest/index.js';
import {serve} from "inngest/express"

dotenv.config();

const app = express();
const port = 3000;

await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());


// API Routes
app.get("/", (req, res) => 
    res.send("Server is live")
);
app.use('/api/inngest', serve({client: inngest, functions}));


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})