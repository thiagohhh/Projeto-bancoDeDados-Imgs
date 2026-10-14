import { Router } from "express";
import { createPublication, listPublication,getImage } from "../controllers/publicacaoController.js";
import { upload } from "../config/multer.js";

const router = Router()

router.post("/", upload.single("imagem"), createPublication)
router.get("/", listPublication)
router.get("/imagem/:filename", getImage)

export default router