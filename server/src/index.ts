import "reflect-metadata";
import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import connectionDB from "./config/db";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logevent";
import registerRouter from "./routes/register";
import authRouter from "./routes/authLogin";
import refreshRouter from "./routes/refreshToken";
import logoutRouter from "./routes/logout";
import verifyJWT from "./middleware/veryfyJwt";
import credentials from "./middleware/credentials";
import corsOptions from "./config/corsOptions";
import addProductRouter from "./routes/productRoutes/product"
import cartRouter from "./routes/cartRoutes/cartRoutes"
import uploadRouter from "./controllers/productcontroller/productUplod";
const PORT = process.env.PORT || 3500;

const app = express();

//connect to db
connectionDB();

// custom middleware logger
app.use(logger);
//middleware for cookies
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));



// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());



app.get("/", (req, res) => {
  // console.log(req.cookies)
  res.send("come from server");
});

//routes
app.use('/uploads', uploadRouter);
//image upload 
const ___dirname = path.resolve();
app.use('/uploads', express.static(path.join(___dirname, 'uploads')));
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);

 app.use(verifyJWT);

app.use("/product", addProductRouter);
app.use("/cart",cartRouter)

//general error handler
app.use(errorHandler);



mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
