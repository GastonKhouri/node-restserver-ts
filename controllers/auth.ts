import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/generar-jwt';
import Usuario from '../models/usuario';

// Controlador del login
export const login = async(req: Request, res: Response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if(!usuario) {
            return res.status(400).json({
                msg: 'El Correo / Password no son correctos - correo'
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El Correo / Password no son correctos - estado: false'
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'El Correo / Password no son correctos - password'
            });
        }        

        // Generar JWt
        const token = await generarJWT(usuario.id);

        return res.json({
            usuario,
            token
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

// Controlador de la renovación del token
export const revalidarToken = async(req: Request, res: Response) => {

    const usuario = req.usuario;

    const token = await generarJWT(usuario!.id);

    return res.json({
        usuario,
        token
    });

}