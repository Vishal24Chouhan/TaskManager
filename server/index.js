import express, { urlencoded } from "express";
import cors from "cors";
import { } from "dotenv/config";
import mongoose from "mongoose";

import taskRouter from "./routes/tasks.js";

const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.use('/api/v1/tasks', taskRouter);

const Connection = async () => {
    try {
         await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true
        });
        console.log("Connected to DB");
        app.listen(process.env.PORT, () => {
            console.log(`Server Up and Running at ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

Connection();

