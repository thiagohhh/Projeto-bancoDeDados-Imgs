import { request, response } from "express";
import { publicacaoModel } from "../models/publicacaoModel.js";
import path from "node:path";
import { publicFolder } from "../config/multer.js";
import fs from "node:fs"
export const createPublication = async (request, response) => {
  try {
    const { titulo, legenda } = request.body;

    const imagem = request.file ? request.file.filename : null;

    if (!imagem) {
      return response.status(400).json({ message: "A imagem é obrigatória" });
    }

    const publicacao = await publicacaoModel.create({
      titulo,
      legenda,
      imagem,
    });
    return response.status(201).json(publicacao);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "Erro ao criar publicação", error: error.message });
  }
};

export const listPublication = async (request, response) => {
  try {
    const publicacoes = await publicacaoModel.findAll();
    return response.status(200).json(publicacoes);
  } catch (error) {
    return response.status(500).json({ message: "Erro ao listar" });
  }
};

export const getImage = async (request, response) => {
  try {
    const { filename } = request.params;
    const caminhoArquivo = path.join(publicFolder, filename);


    if (!fs.existsSync(caminhoArquivo)) {
      return response.status(404).json({ message: "Imagem não existe" });
    }

    return response.sendFile(caminhoArquivo);
  } catch (error) {
    return response.status(500).json({ message: "Erro ao buscar imagem" });
  }
};
