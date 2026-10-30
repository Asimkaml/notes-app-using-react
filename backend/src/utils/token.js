import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const COOKIE_NAME = "token";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: config.isProd,
};

export const signToken = (userId) => {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
}

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret)
}

export const setAuthCookie = (res, token) => {
    res.cookie(
        COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
}

export const clearAuthCookie = (res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);
};
