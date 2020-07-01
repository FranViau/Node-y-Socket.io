var socket = io.connect("http://192.168.0.191:6677",{"forceNew":true}) // Force New indica que la conexion se fuerce, hay que poner la ip de nuestra computadora

socket.on("mensajes", data =>{ // Recibe los datos emitidos por el servidor
    render(data);
});

function render(data){
    var html = data.map((mensaje, i)=>{
        return (`
            <div class = "mensaje">
                <strong> ${mensaje.nickname} </strong> dice: 
                <span>${mensaje.text}</span>
            </div>
        `); // El join es para meter un espacio entre elemento y elemento
    }).join(" "); // EL metodo map es una forma de iterar en un objeto

    var divMsj = document.getElementById("mensajes"); 
    divMsj.innerHTML = html;
    divMsj.scrollTop = divMsj.scrollHeight;
}
function addMensaje(e){
    var mensaje = {
        nickname: document.getElementById("nickname").value,
        text: document.getElementById("text").value,

    };
    document.getElementById("nickname").style.display = "none";
    socket.emit("addMensaje",mensaje);
    return false; // Para cortar la ejecución
}