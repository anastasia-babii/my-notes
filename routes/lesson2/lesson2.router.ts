import { Request, Response, Router } from "express";
import fs from "node:fs/promises";
import multer, { FileFilterCallback, File } from "multer";
import BadRequestError from "../../error/http-error-bad-request";
import ValidationHTTPError from "../../error/http-error-validation";
import InternalServerError from "../../error/http-error-internal-server";
import { MulterRequest } from "../../types/interfaces";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload-file",
  upload.single("img"),
  async (req: MulterRequest, res: Response, next) => {
    if (!req.file) {
      return next(new BadRequestError("Missing file in request"));
    }

    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/svg",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return next(new ValidationHTTPError("Not Allowed file type!"));
    }

    const typeObj = {
      "image/png": "png",
      "image/jpeg": "jpeg",
      "image/gif": "gif",
      "image/bmp": "bmp",
      "image/tiff": "tiff",
      "image/svg": "svg",
      "image/webp": "webp",
    };

    const firstPartFileName = req.file.originalname.split(".")[0];
    const ext = typeObj[req.file.mimetype];
    const fileName = firstPartFileName + "." + ext;

    try {
      await fs.writeFile(`./static/${fileName}`, req.file.buffer);
      res.send("File uploaded!");
    } catch (err) {
      return next(new InternalServerError("File not loaded"));
    }
  }
);

router.get("/file", async (req: Request, res: Response, next) => {
  try {
    const data = await fs.readFile("text.txt", "utf8");
    res.send(data);
  } catch (err) {
    return next(new InternalServerError("Error reading file"));
  }
});

export { router as lesson2Router };
