let entradasEnCarrito = localStorage.getItem("entradas-en-carrito");
entradasEnCarrito = JSON.parse(entradasEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoEntradas = document.querySelector("#carrito-entradas");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-entrada-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarEntradasCarrito() {
    if (entradasEnCarrito && entradasEnCarrito.length > 0) {
        
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoEntradas.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoEntradas.innerHTML = "";
    
        entradasEnCarrito.forEach(entrada => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-entrada");
            div.innerHTML = `
                <img class="carrito-entrada-imagen" src="${entrada.img}" alt="${entrada.titulo}">
                <div class="carrito-entrada-titulo">
                    <small>Ubicación</small>
                    <h3>${entrada.titulo}</h3>
                </div>
                <div class="carrito-entrada-cantidad">
                    <small>Cantidad</small>
                    <p>${entrada.cantidad}</p>
                </div>
                <div class="carrito-entrada-precio">
                    <small>Precio</small>
                    <p>$${entrada.precio}</p>
                </div>
                <div class="carrito-entrada-subtotal">
                    <small>Subtotal</small>
                    <p>$${entrada.precio * entrada.cantidad}</p>
                </div>
                <button class="carrito-entrada-eliminar" id="${entrada.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoEntradas.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
    
    } else {

        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoEntradas.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarEntradasCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-entrada-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Entrada eliminada",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = entradasEnCarrito.findIndex(entrada => entrada.id === idBoton);
    
    entradasEnCarrito.splice(index, 1);
    cargarEntradasCarrito();

    localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${entradasEnCarrito.reduce((acc, entrada) => acc + entrada.cantidad, 0)} entradas.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            entradasEnCarrito.length = 0;
            localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));
            cargarEntradasCarrito();
        }
    })
}


function actualizarTotal() {
    const totalCalculado = entradasEnCarrito.reduce((acc, entrada) => acc + (entrada.precio * entrada.cantidad), 0);
    total.innerText = `$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: 'Gracias por la compra!',
        icon: 'success',
        html: `Disfruta el show. Recuerda cargar los datos de tu grupo de amigos!`,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Sí',
    }).then((result) => {
        if (result.isConfirmed) {
            entradasEnCarrito.length = 0;
            localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));
            cargarEntradasCarrito();
        }
    })
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoEntradas.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}