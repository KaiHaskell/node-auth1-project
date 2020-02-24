const express = require("express");
const authRouter = require("./routers/auth-router/auth-router");
const server = express();

server.use("/api/auth", authRouter);
server.use(express.json());

module.exports = server;
