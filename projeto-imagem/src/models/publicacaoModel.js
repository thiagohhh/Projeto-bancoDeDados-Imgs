import { DataTypes } from "sequelize";
import { conn } from "../config/conn.js";

export const publicacaoModel = conn.define(
    "publicacoes",
    {
        titulo:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: {
                    args: [3, 200],
                    msg: "O título deve ter entre 3 a 200 caracteres"
                }
            }
        },
        legenda:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: {
                    args: [10, 200],
                    msg: "A legenda deve ter entre 10 a 200 caracteres"
                }
            }
        },
        imagem:{
            type: DataTypes.STRING, //publica/imagem.png
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)