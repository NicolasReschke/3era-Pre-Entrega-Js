let entradas = [];

fetch("./js/entradas.json")
    .then(response => response.json())
    .then(data => {
        entradas = data;
        cargarEntradas(entradas);
    })


const contenedorEntradas = document.querySelector("#cardBootstrap");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarEntradas (listaEntradas){

    contenedorEntradas.innerHTML = "";

    listaEntradas.forEach(entrada => {
        
        const div = document.createElement ("div");
        div.innerHTML = `
        <div class="col">
            <div class="card">
                <img class="card-img-top" src="${entrada.img}" alt="${entrada.titulo}">
                <div class="card-body">
                    <h2 class="card-title">$ ${entrada.precio}</h2>
                    <p class="card-text">${entrada.titulo}</p>
                    <button class="entrada-agregar btnCompra" id="${entrada.id}">COMPRAR</button>
                </div>
            </div>
        `;

        contenedorEntradas.append(div);
    });

    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".entrada-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let entradasEnCarrito;

let entradasEnCarritoLS = localStorage.getItem("entradas-en-carrito");

if (entradasEnCarritoLS) {
    entradasEnCarrito = JSON.parse(entradasEnCarritoLS);
    actualizarNumerito();
} else {
    entradasEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Entrada agregada",
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
            y: '1.5rem',
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const entradaAgregada = entradas.find(entrada => entrada.id === idBoton);

    if(entradasEnCarrito.some(entrada => entrada.id === idBoton)) {
        const index = entradasEnCarrito.findIndex(entrada => entrada.id === idBoton);
        entradasEnCarrito[index].cantidad++;
    } else {
        entradaAgregada.cantidad = 1;
        entradasEnCarrito.push(entradaAgregada);
    }

    actualizarNumerito();

    localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = entradasEnCarrito.reduce((acc, entrada) => acc + entrada.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
