import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const httpServer = createServer(app);

const io = new Server(httpServer);

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "server is healthy",
    success: true,
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
