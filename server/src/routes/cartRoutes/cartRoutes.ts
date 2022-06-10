import { Router } from "express";
import {
  addItemToCart1,
  getcart,
  handleRemoveiteam,
} from "../../controllers/cartController/cart.controller";

const router = Router();

router.post("/addIteam", addItemToCart1);
// router.post("/user/getCartItems", getCartItems);
// //new update
router.post("/removeItem", handleRemoveiteam);
router.get("/",getcart)
export default router;
