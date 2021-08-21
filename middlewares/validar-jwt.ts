import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { UserPayload } from "../interfaces/interfaces";
import Usuario from '../models/usuario';

// Validar JWT del usuario que está tratando de hacer la acción
export const validarJWT = async(req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY!) as UserPayload;

        // Leer usuario con el uid
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la DB'
            });
        }

        // Verificar si el uid tiene estado en true
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado false'
            });
        }

        req.usuario = usuario;
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }


}