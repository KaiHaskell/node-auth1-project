const express = require("express");
const authRouter = require("./routers/auth-router/auth-router.js");
const server = express();

server.use(express.json());

server.use("/api/auth", authRouter);

module.exports = server;
