import { User } from './user';


export class UsersList{

    private list: User[] = []

    constructor(){}

    //Agregar un usuario
    public agregarUsuario(usuario: User){

        this.list.push(usuario);
        return usuario;

    }

    //Actualiza nombre de usaurio
    public actualizarNombre(id:string, nombre:string){

        for(let usuario of this.list){
            if(usuario.id === id){
                usuario.name = nombre;
                break;
            }
        }

        console.log(this.list);
        
    }

    //Obtener lista de usuario
    public getListUsers(){
        return this.list;
    }

    //Obtener un usuario
    public getUser(id: string){

        return this.list.find(usuario => usuario.id === id);
    }

    //Obtener usuarios de una sala
    public getUsuarioEnSala(sala: string){
        return this.list.filter(usuarios => usuarios.sala === sala);
    }

    //Borrar usuario
    public deleteUser(id: string){

        const tmpUser = this.getUser(id);
        this.list = this.list.filter(usuarios => usuarios.id !== id);
        return tmpUser;
    }


}