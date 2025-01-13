// Simulación de datos del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
    alert(`Producto "${nombre}" agregado al carrito.`);
}

// Función para actualizar el contenido del carrito en la página
function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito-contenido");
    carritoContainer.innerHTML = ""; // Limpiar contenido anterior

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("carrito-item");
        productoElement.innerHTML = `
            <p>${producto.nombre} (x${producto.cantidad}) - $${(producto.precio * producto.cantidad).toFixed(2)}</p>
        `;
        carritoContainer.appendChild(productoElement);
    });

    // Mostrar el total
    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    const totalElement = document.createElement("p");
    totalElement.classList.add("total");
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    carritoContainer.appendChild(totalElement);

    // Agregar botón de "Comprar"
    const comprarButton = document.createElement("button");
    comprarButton.innerText = "Comprar";
    comprarButton.classList.add("btn-comprar");
    comprarButton.addEventListener("click", finalizarCompra);
    carritoContainer.appendChild(comprarButton);
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    // Simulación de compra
    alert("¡Gracias por tu compra! Tu pedido se ha procesado.");
    carrito = []; // Vaciar el carrito
    guardarCarrito(); // Actualizar el almacenamiento local
    actualizarCarrito(); // Actualizar la vista
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Asignar eventos a los botones de compra
document.querySelectorAll(".product button").forEach(boton => {
    boton.addEventListener("click", () => {
        const productoElement = boton.parentElement;
        const nombre = productoElement.querySelector("h3").innerText;
        const precio = parseFloat(productoElement.querySelector("p").innerText.replace("$", ""));
        agregarAlCarrito(nombre, precio);
    });
});

// Mostrar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);