import express,{Request} from 'express';

import multer, { FileFilterCallback } from 'multer'
const uploadRouter = express.Router();

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
const storage = multer.diskStorage({
  destination(req:Request, file:Express.Multer.File, cb:DestinationCallback):void {
    cb(null, 'uploads');
  },
  filename(req, file, cb:FileNameCallback) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('image'), (req, res) => {
    console.log(req.file,"fffffffffffffffffffffffffff")
  res.status(200).json(`/${req.file?.path}`);
});

export default uploadRouter;