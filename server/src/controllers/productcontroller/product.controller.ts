import Product from "../../models/product.model";
import { Request, Response } from "express";

export const handleAddproduct = async (req: Request, res: Response) => {
  const { name, price, quantity, description, productPictures, ...restparams } =
    req.body;
// console.log("user:",restparams)
let urlArray = []
urlArray.push({img:productPictures})
  const newProduct = new Product({
    name,
    price,
    quantity,
    description,
    productPictures:urlArray,
    createdBy:"629dc27237f47a8c43f5f9d9",
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getAllproduct =async (req: Request, res: Response)=>{
try {
  const allProduct = await Product.find({})
  if (!allProduct) return res.status(204).json({ 'message': 'No users found' });

  res.status(200).send(allProduct)
} catch (err) {
  res.status(500).json(err);

}
}