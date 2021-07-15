import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    id?: number;
    documento?: string;
    nombre?: String;
    apellidos?: String;
    correo?: String;
    telefono?: String;
    nombre_usuario?: String;
    contrasena?: String;
    rolId?: number;
    ciudadId?: number;
    user?: UsuarioModule;
    tk?: String; 
    isLoggedIn: boolean = false;
}