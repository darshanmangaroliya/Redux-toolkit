import {Router} from "express"
import { handleNewUser } from "../controllers/register.controller";


const router = Router();


router.post("/",handleNewUser)

export default router