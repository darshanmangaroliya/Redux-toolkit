import mongoose from "mongoose";
const Schema = mongoose.Schema;


let ItemSchema = new Schema(
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
  
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      productPictures: [{ img: { type: String } }],
      total: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
export const Item = mongoose.model("item", ItemSchema);
  
  const CartSchema = new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  
      items: [ItemSchema],
  
      subTotal: {
        default: 0,
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  );

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
