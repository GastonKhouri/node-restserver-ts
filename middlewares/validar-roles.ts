import { NextFunction, Request, Response } from "express";

// Verificar que el usuario que está haciendo la accion es Admin
export const esAdminRole = (req: Request, res: Response, next: NextFunction) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, nombre } = req.usuario;

    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();

}

// Verificar que el usuario que está haciendo la acción tenga uno de los roles dados
export const tieneRole = (...roles: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.role)) {
            return res.status(500).json({
                msg: `El servicio require uno de estos role ${ roles }`
            });
        }

        next();

    }

}