import express from "express";
import cors from "cors";
import { publicacaoModel } from "./models/publicacaoModel.js";

//ROTAS
import publicacaoRouter from "./routes/publicacaoRouter.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

//1º Para imagem, permitir que a API receba arquivos
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/publicacoes", publicacaoRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;
