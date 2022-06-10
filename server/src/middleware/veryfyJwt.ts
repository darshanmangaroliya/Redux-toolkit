import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";



const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader =
    (req.headers.authorization as string) ||
    (req.headers.Authorization as string);
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded: any) => {
    if (err) return res.sendStatus(403); //invalid token
    let userId = decoded?.user;
    req.body.userId =userId
    // console.log(userId)
    next();
  });
};

export default verifyJWT;
