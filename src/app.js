import express from "express";
import weatherRoutes from "./routes/weatherRoutes";

const app = express();

app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.use("*", (req, res) => {
    res.status(404).json({error: "Route not found"});
});

export default app;