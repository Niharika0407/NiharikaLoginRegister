import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from 'cors';

import userRoutes from "./routes/users.js";

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/user", userRoutes);

mongoose.connect("mongodb://localhost:27017/fccdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});
