// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import routes from "./routes";
// import { initData } from "./utils/generateData";
// import { startMongo } from "./utils/mongoSetup";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", routes);

// const PORT = process.env.PORT || 4000;

// const startServer = async () => {
//   try {
//     await initData();
//     await startMongo();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to initialize data or start server:", error);
//     process.exit(1);
//   }
// };

// startServer();


import express from 'express';
import dotenv from 'dotenv';
import { startMongo } from './utils/mongoSetup';
// import routes from "./routes";
import productsRouter from './routes/productsRoutes';      // adjust the path if yours differs
import { initData } from './utils/generateData';

dotenv.config();

const app  = express();
const PORT = Number(process.env.PORT ?? 4000);
const USE_MONGODB = process.env.USE_MONGODB === 'true';

app.use(express.json());
app.use('/api/products', productsRouter);

/**
 * If we’re running in “file-mode” (USE_MONGODB = false)
 * make sure the JSON files exist so the handlers don’t blow up.
 */
if (!USE_MONGODB) {
  initData().catch(err =>
    console.error('❌  JSON data initialisation failed:', err)
  );
}

/**
 * Kick everything off:
 *   • connect to Mongo when requested
 *   • start the HTTP server
 */
(async () => {
  try {
    if (USE_MONGODB) {
      await startMongo();                       // ⬅️  new in Step 5
    }

    app.listen(PORT, () => {
      console.log(`🚀  Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌  Failed to start server:', err);
    process.exit(1);
  }
})();
