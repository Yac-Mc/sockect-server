import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsersList } from '../class/users-list';
import { User } from '../class/user';


export const usuariosConectados = new UsersList();


export const CONECTARCLIENTE = (cliente: Socket, io: socketIO.Server) =>{

    const usuario = new User(cliente.id);
    usuariosConectados.agregarUsuario(usuario);

}

export const DESCONECTAR = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {

        const userDesconectado = usuariosConectados.deleteUser(cliente.id);
        console.log(userDesconectado);

        io.emit('usuarios-activos', usuariosConectados.getListUsers());
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

        io.emit('usuarios-activos', usuariosConectados.getListUsers());
        
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    })

}

// Obtiene usuarios activos
export const OBTENERUSUARIOS = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getListUsers());

    })

}