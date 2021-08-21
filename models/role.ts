import { Schema, model } from 'mongoose';
import { RoleModel } from '../interfaces/interfaces';

const RoleSchema = new Schema<RoleModel>({
    role: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

const Role = model<RoleModel>('Role', RoleSchema); 

export default Role;
