import Server from './models/server';
import dotenv from 'dotenv';

// Configurar dotenv
dotenv.config();

// Crear instancia del servidor
const server = new Server();

// Iniciar servidor
server.listen();