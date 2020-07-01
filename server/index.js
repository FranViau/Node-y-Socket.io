var express = require("express");
var app = express();
var server = require("http").Server(app); // HTTP es una libreria de Node, esta variable hay que pasarsela a socket para que entienda que va a trabajar
                                          // dentro de la conexion HTTP que nosotros generemos acá
var io = require("socket.io")(server); // Le pasamos express con la libreria http

app.use(express.static("client")); // Para usar un middleware de express. Dice que todos los HTMLs que haya en la carpeta client, van a ser HTML estaticos

app.get("/hola-mundo", (req,res)=>{
    res.status(200).send({message:"Hola mundo"});
});

var mensajes = [{
    id:1,
    text: "Bienvenido al chat privado de socket.io y node.js de Franco Viau",
    nickname: "Bot - Franco Viau"
}];

// Abrir conexion al Socket
io.on("connection",(socket)=>{ // Recibe las conexiones de los clientes y detecta cada vez que un cliente se conecta, cuando alguien se conecte se va a llamar a esta funcion
    console.log("El cliente con IP: "+ socket.handshake.address + " se ha conectado...");
    socket.emit("mensajes", mensajes); // Envia los mensajes al cliente

    socket.on("addMensaje",(data)=>{
        mensajes.push(data);
        io.sockets.emit("mensajes",mensajes); // Emitir a todos los clientes conectados
    });
});

server.listen(6677, ()=>{
    console.log("El servidor está funcionando en http://localhost:6677")
}); // Creamos el servidor y lanzamos el comando npm start