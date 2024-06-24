import dotenv from "dotenv";
import { default as connectDB } from "./utils/db.js";
import { app } from "./app.js";
dotenv.config({ path: "src/.env" });
console.log("starting");
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("listening");
  });
});