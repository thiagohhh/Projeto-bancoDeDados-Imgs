import app from "./app.js";
import { conn } from "./config/conn.js";

const PORT = 3333

const iniciarServidor = async () => {

    try {
        await conn.sync()
        console.log("banco de dados conectado")

        app.listen(PORT, () => {
            console.log(`Servidor iniciado em http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Erro ao inicar o servidor: ", error)
    }
}

await iniciarServidor()