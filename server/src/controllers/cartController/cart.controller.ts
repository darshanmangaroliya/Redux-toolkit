import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../../models/product.model";
import Cart from "../../models/cart";

type productitem = {
  productId: mongoose.Schema.Types.ObjectId;
  name:string
  quantity: number;
  price: number;
  total: number;
  description:string;
  productPictures:[{img:string}]

};

export const addItemToCart1 = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  let data = null;
  try {
    // Get users Cart
    let cart = await Cart.findOne({
      userId,
    });

    //Get Selected Product Details
    const productDetails = await Product.findById(productId);
    // Check if cart Exists and Check the quantity
    if (cart) {
      let indexFound = cart.items.findIndex(
        (p: productitem) => p.productId == productId
      );
      // console.log("Index", indexFound);
      //check if product exist,just add the previous quantity with the new quantity and update the total price
      if (indexFound !== -1) {
        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item: productitem) => item.total)
          .reduce((acc: number, curr: number) => acc + curr);
      }
      //Check if Quantity is Greater than 0 then add item to items Array
      else if (quantity > 0) {
        cart.items.push({
          productId,
          name:productDetails.name,
          quantity,
          price: productDetails.price,
          description:productDetails.description,
          productPictures:[...productDetails.productPictures],
          total: productDetails.price * quantity,
        });
        cart.subTotal = cart.items
          .map((item: productitem) => item.total)
          .reduce((acc: number, curr: number) => acc + curr);
      }
      //if quantity of price is 0 throw the error
      else {
        return res.status(400).json({
          code: 400,
          message: "Invalid request",
        });
      }

      data = await cart.save();
    }
    //if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created
    else {
      const cartData = {
        userId,
        items: [
          {
            productId,
            name:productDetails.name,
            quantity,
            price: productDetails.price,
            description:productDetails.description,
            productPictures:[...productDetails.productPictures],
            total: productDetails.price * quantity,
          },
        ],
        subTotal: productDetails.price * quantity,
      };
      cart = new Cart(cartData);
      data = await cart.save();
    }
    console.log("cartData:",data)
    res.status(200).json({
      message: "Add to Cart successfully!",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
    });
  }
};

export const handleRemoveiteam = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;
  let data = null;

  try {
    const removeProduct = await Product.findById(productId);
    //console.log("removeProduct:",removeProduct)
    let cart = await Cart.findOne({ userId });
    // console.log("cart:",cart.items)

    // product not found
    if (!removeProduct) res.send("product not found");

    //cart not exist
    if (!cart) res.send("can't Delete item ");

    //find product
    
    
    let product = cart.items.find((p: productitem) => p.productId == productId);
    if (!product) return res.json({ msg: "please add product first" });
    let indexFound = cart.items.findIndex(
      (p: productitem) => p.productId == productId
    );
    //check for quantity
    let qty = product.quantity;
    console.log("qty",qty);

    if (qty === 1) {
      let filterItem = cart.items.filter(
        (p: productitem) => p.productId != productId
        );
        if(filterItem.length > 0){
        console.log("filterarr:",filterItem)
        cart.items = [...filterItem]

      cart.subTotal = cart.items
        .map((item: productitem) => item.total)
        .reduce((acc: number, curr: number) => acc + curr);
      } else {
        cart =  null
      }

    } else {

      cart.items[indexFound].quantity = cart.items[indexFound].quantity -1;
      cart.items[indexFound].total =
        cart.items[indexFound].quantity * removeProduct.price;
      cart.items[indexFound].price = removeProduct.price;
      cart.subTotal = cart.items
        .map((item: productitem) => item.total)
        .reduce((acc: number, curr: number) => acc + curr);

      }
      
      try {
        data = await cart.save();
        res.send({ data, msg: "item remove sucessfully" });
        
      } catch (error) {
        res.send("error")
      }
  } catch (error) {
    res.send({ error });
  }
};



export const getcart = async (req:Request,res:Response)=>{

const {userId} = req.body
  try {
    const cart = await Cart.find({userId})
    if(!cart) return res.json("cart not found")

    res.json(cart[0])
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}