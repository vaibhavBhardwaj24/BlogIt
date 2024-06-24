import { asyncHandler } from "../utils/asyncHandle.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.header("Authorization"));
    // const authHeader = req.headers["Authorization"];
    const { accToken } = req.body;
    // console.log(accToken);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    // console.log("header or cookie",req.headers);
    if (!accToken) {
      console.error("no token");
    }

    const decodedToken = jwt.decode(accToken, process.env.ACCESS_TOKEN_SECRET);
    const specificUser = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    // console.log(specificUse/r);
    if (!specificUser) {
      console.error("user not found verify");
    }
    req.user = specificUser;
    next();
  } catch (error) {
    console.error("verification error", error);
  }
});
