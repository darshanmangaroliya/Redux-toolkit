import {Router} from "express"
import verifyJWT from "../../middleware/veryfyJwt";
import { getAllproduct, handleAddproduct } from "../../controllers/productcontroller/product.controller";


const router = Router();


router.route("/").post( verifyJWT,handleAddproduct).get(getAllproduct)

export default router