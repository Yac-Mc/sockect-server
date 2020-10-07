import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsersList } from '../class/users-list';
import { User } from '../class/user';


export const usuariosConectados = new UsersList();


export const CONECTARCLIENTE = (cliente: Socket) =>{

    const usuario = new User(cliente.id);
    usuariosConectados.agregarUsuario(usuario);

}


export const DESCONECTAR = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        const userDesconectado = usuariosConectados.deleteUser(cliente.id);
        console.log(userDesconectado);
    });

}

// Escuchar mensajes
export const MENSAJE = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {

        io.emit('mensaje-nuevo', payload );

    })

}

// Configurar usuario
export const CONFIGURACIONUSUARIO = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    })

}