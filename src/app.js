import express from "express";
import dataRoutes from "./routes/data.routes.js";
import aaRoutes from "./routes/aa.routes.js";

const app = express();

app.use(express.json({ limit: "10mb" }));

//this is the latest route include both student & earner
app.use("/api/aa", aaRoutes);

//this is old route for only student transaction. dont use this.
app.use("/api/data", dataRoutes);

export default app;
