const express = require("express");
const UserAccountService = require("../services/UserAccountService");
const AbstractController = require("./AbstractController");
const { ApiResponse } = require("../../models/ApiResponse");
const { HttpStatus } = require("../utils/HttpStatus");

class UserController extends AbstractController {
  constructor() {
    super();
    this.router = express.Router();
    this.router.post("/user-info", this.getUserInfo.bind(this));
  }

  async getUserInfo(req, res) {
    const userDto = req.body;
    try {
      const userInfo = await UserAccountService.getUserInfo(userDto);
      res.status(HttpStatus.OK).json(ApiResponse.success(userInfo));
    } catch (error) {
      console.error("Error in getUserInfo:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ApiResponse.failure("Error in fetching user info"));
    }
  }
}

module.exports = new UserController().router;
