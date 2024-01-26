const socket = io()

socket.on('message-all', (data)=> {
    console.log(data)
    render(data)
})

const render = (data)=> {
    const html = data.map(elem =>{
        return(
            `
                <div class="card">
                <p>Título: ${elem.title}</p>
                <p>Descripción: ${elem.desc}</p>
                <p>Código: ${elem.code}</p>
                <p>Precio: ${elem.price}</p>
                <p>Estado: ${elem.status}</p>
                <p>Stock: ${elem.stock}</p>
                <p>Categoría: ${elem.category}</p>
                <p>Ruta: ${elem.thumbnails}</p>
                </div>    
            ` 
        )
    })//.join('')
    document.getElementById('caja').innerHTML = html

}


// const addMensage = () => {
//     const msg = {
//         author: document.getElementById('name').value,
//         text: document.getElementById('text').value
//     }
//     socket.emit('new-message', msg)
//     console.log(msg)
//     return false
// }

const addProd = () => {
  const msg = {
    title: document.getElementById("txtTit").value,
    desc: document.getElementById("txtDesc").value,  
    price: document.getElementById("txtPrice").value,
    thumbnails: document.getElementById("txtThumbn").value,
    code: document.getElementById("txtCod").value,
    stock: document.getElementById("txtStock").value,
   
  }
  socket.emit('new-message', msg)
      console.log(msg)
       return false
}

// const delProd = () => {
//   let idToDel = document.getElementById("txtId").value
//   socket.emit("reqDelProd", idToDel)
//   return false
// }