import { UserModel } from "./interfaces/interfaces";

declare global {
    namespace Express {
      interface Request {
        usuario?: UserModel
      }
    }
  }