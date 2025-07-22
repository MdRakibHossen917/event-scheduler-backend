import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes";

const app = express();
const PORT = 5000;

app.use(cors());           
app.use(express.json());  

app.use("/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
