import { logEvents } from "./logevent";
import { Request ,Response,NextFunction} from "express";


export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    // console.error(err.stack)
    res.status(500).send(err.message);
}
