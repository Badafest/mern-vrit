import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/vars";

export const generateAToken = (data: Record<string, string>, expiry: string) =>
  new Promise((resolve: (token: string) => void, reject) => {
    try {
      const token = jwt.sign(data, ENVIRONMENT.JWT_SECRET, {
        expiresIn: expiry,
      });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });

export const verifyAToken = (token: string) =>
  new Promise((resolve, reject) => {
    try {
      const data = jwt.verify(token, ENVIRONMENT.JWT_SECRET);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
