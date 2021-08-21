import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario';

// Controlador de la obtención de usuarios
export const getUsuarios = async(req: Request, res: Response) => {

    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    return res.json({
        total,
        usuarios
    });

}

// Controlador de la obtención de usuario por ID
export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    return res.json(usuario);

}

export const postUsuario = async(req: Request, res: Response) => {

    const { nombre, correo, role, password } = req.body;
            
    // Generar la data a guardar
    const data = {
        nombre,
        correo,
        password,
        role
    };
            
    const usuario = new Usuario(data);

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    return res.json(usuario);

}

export const putUsuario = async(req: Request, res: Response) => {

    const id = req.params.id;
    const { _id, password, estado, ...resto } = req.body;
    
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    return res.json(usuario);

}

export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    // Borramos logicamente al usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    return res.json(usuario);

}