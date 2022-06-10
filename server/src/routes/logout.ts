import {Router} from "express"
import { handleLogout } from "../controllers/logout.controller";


const router = Router();


router.post("/",handleLogout)

export default router