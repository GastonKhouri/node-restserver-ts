import jwt from 'jsonwebtoken';

// Generar un JWT
export const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPUBLICKEY!, {
            expiresIn: '24h'
        }, (err, token) => {

            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }

        });

    });

}