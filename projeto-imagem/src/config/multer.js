import multer from "multer";
import path from "node:path"
import { fileURLToPath } from "node:url"

//url/arquivo/public/arquivo.pdf
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/// url/teste , public = url/teste/public
export const publicFolder = path.resolve(__dirname, "../../public")

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, publicFolder)
    },
    filename: (request, file, cb) => {
        //imagem.png = cript
        const uniqueSuffix = Date.now() + "-" + Math.random(Math.random() * 987456321)
        const extensao = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${uniqueSuffix}${extensao}`)
    }
})
// middleware
export const upload = multer({storage})
//"api/publicacoes", middlware, controlador