import { Router } from "express";
import { check } from "express-validator";

import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { esAdminRole } from '../middlewares/validar-roles';
import { existeUsuarioPorId, emailExiste, esRoleValido } from '../helpers/db-validators';

import { getUsuarios,
         getUsuario,
         postUsuario,
         putUsuario,
         deleteUsuario } from '../controllers/usuarios';

const router = Router();

router.get('/', [
    validarJWT
], getUsuarios);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], getUsuario);

router.post('/', [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener más de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos
], postUsuario);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], putUsuario);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],deleteUsuario);

export default router;