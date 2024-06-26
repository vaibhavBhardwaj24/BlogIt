import dotenv from "dotenv";
// import { default as connectDB } from "";
import { default as connectDB } from "./src/utils/db.js";
// import { app } from "./app.js";
// import { app } from "./app.js";
import express from "express";
const app=express()
import serverless from "serverless-http";
dotenv.config({ path: "src/.env" });
console.log("starting");
// const handler = async (req, res) => {
  connectDB().then(() => {
    app.listen(3000, () => {
      console.log("listening");
    });
  });
  
// };
// import dotenv from "dotenv";

// dotenv.config({ path: "src/.env" });

// let isConnected = false;

// const handler = async (req, res) => {
//   if (!isConnected) {
//     await connectDB();
//     isConnected = true;
//   }
//   return serverless(app)(req, res);
// };

// export default handler;
