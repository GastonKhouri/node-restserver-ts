/**
 * Rutas de Auth
 * host + /api/auth
 */

import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { login, revalidarToken } from '../controllers/auth';

const router = Router();

// Iniciar sesión
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);

// Renovar token
router.get('/renew', [
	validarJWT
], revalidarToken);

export default router;