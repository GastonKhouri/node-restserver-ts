import Role from '../models/role';
import Usuario from '../models/usuario';

// Verificar que el rol es válido
export const esRoleValido = async(role = '') => {

    // Verificar si el rol es existe en la DB
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El rol ${ role } no está registrado en la DB`);
    }
}

// Verificar que exista un correo en la BD
export const emailExiste = async(correo = '') => {

    // Verificar si el correo existe en la DB
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya está registrado`);
    }

}

// Verificar que exista un usuario dado un ID en la DB
export const existeUsuarioPorId = async(id = '') => {

    // Verificar si el id existe en la DB
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${ id } no existe`);
    }

}