import {Router} from "express"
import { handleLogin } from "../controllers/auth.controller";


const router = Router();


router.post("/",handleLogin)

export default router