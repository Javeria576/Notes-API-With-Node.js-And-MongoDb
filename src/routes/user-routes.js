const express = require("express");

const {signup, signin} = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.post("/sign-up", signup);

userRoutes.post("/sign-in", signin);

module.exports = userRoutes