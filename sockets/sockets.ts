import { Socket } from 'socket.io';
import socketIO from 'socket.io';


export const DESCONECTAR = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log(`Cliente desconectado`);
    });

}

// Escuchar mensajes
export const MENSAJE = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {

        console.log(`Mensaje recibido`, payload);

        io.emit('mensaje-nuevo', payload );

    })

}

// Configurar usuario
export const LOGIN = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        console.log(payload + '!!!');

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    })

}