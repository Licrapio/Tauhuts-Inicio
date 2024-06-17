// Lista para almacenar los productos seleccionados
let carrito = [];

// Función para agregar un producto al carrito
function agregarProducto(id, nombre, precio) {
    const cantidad = parseInt(document.getElementById(id + '-cantidad').value);
    const producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    };
    carrito.push(producto);
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const listaProductos = document.querySelector('#lista-productos tbody');
    const totalElement = document.getElementById('total');
    let html = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        let precioUnitario = producto.precio;
        if (producto.nombre === 'tamal' && producto.cantidad >= 2) {
            const ofertaCantidad = Math.floor(producto.cantidad / 2);
            const unidadesNormales = producto.cantidad % 2;
            precioUnitario = ofertaCantidad * 25 + unidadesNormales * 18;
        }

        const subtotal = precioUnitario * producto.cantidad;
        total += subtotal;
        html += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${precioUnitario}</td>
                <td>
                    <div class="cantidad-container">
                        <button class="cantidad-btn" onclick="restarCantidad(${index})">-</button>
                        <select class="cantidad-select" onchange="cambiarCantidad(${index}, this.value)">
                            ${generarOpcionesSelect(producto.cantidad)}
                        </select>
                        <button class="cantidad-btn" onclick="sumarCantidad(${index})">+</button>
                    </div>
                </td>
                <td>$${subtotal}</td>
                <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    listaProductos.innerHTML = html;
    totalElement.textContent = total;
}

// Función para generar las opciones del select de cantidad dinámicamente
function generarOpcionesSelect(cantidadActual) {
    let opciones = '';
    for (let i = 1; i <= 5; i++) {
        opciones += `<option value="${i}" ${cantidadActual === i ? 'selected' : ''}>${i}</option>`;
    }
    return opciones;
}

// Función para cambiar la cantidad de un producto en el carrito
function cambiarCantidad(index, cantidad) {
    carrito[index].cantidad = parseInt(cantidad);
    actualizarCarrito();
}

// Función para aumentar la cantidad de un producto en el carrito
function sumarCantidad(index) {
    const maxCantidad = 5; // Máximo permitido, modificar según necesidad
    if (carrito[index].cantidad < maxCantidad) {
        carrito[index].cantidad++;
        actualizarCarrito();
    }
}

// Función para disminuir la cantidad de un producto en el carrito
function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarCarrito();
    }
}

// Función para eliminar todo el contenido del carrito
function eliminarTodo() {
    carrito = []; // Vaciamos el array
    actualizarCarrito(); // Actualizamos la visualización del carrito (que quedará vacío)
}

// Función para reiniciar el carrito
function reiniciarCarrito() {
    carrito = []; // Vaciamos el array
    actualizarCarrito(); // Actualizamos la visualización del carrito (quedará vacío)
}

// Guardar el carrito en localStorage antes de la compra
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar los datos del usuario registrado en el formulario de compra
function cargarDatosUsuario() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let loggedInUser = users[0]; // Suponiendo que tomamos el primer usuario registrado como ejemplo

    if (loggedInUser) {
        document.getElementById('nombre').value = loggedInUser.name;
        document.getElementById('email').value = loggedInUser.email;
    }
}

// Función para validar los datos antes de enviar el formulario de compra
function validarCompra() {
    let nombreCompra = document.getElementById('nombre').value;
    let emailCompra = document.getElementById('email').value;
    let passwordCompra = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let usuarioValido = users.find(user =>
        user.name === nombreCompra && user.email === emailCompra && user.password === passwordCompra
    );

    if (usuarioValido) {
        guardarCompra();
        return true; // Datos válidos, permitir la compra
    } else {
        alert('Datos inválidos. Verifica tu nombre, correo electrónico y contraseña.');
        return false; // Evitar envío del formulario si los datos no son válidos
    }
}

// Función para guardar la compra en el historial
function guardarCompra() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    let historialCompras = JSON.parse(localStorage.getItem('historialCompras')) || [];

    const nuevaCompra = {
        productos: carrito,
        fecha: new Date().toLocaleString(),
        total: total
    };

    historialCompras.push(nuevaCompra);
    localStorage.setItem('historialCompras', JSON.stringify(historialCompras));
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al botón realizar compra
    const realizarCompraBtn = document.getElementById('realizar-compra-btn');

    // Agregar evento al botón para guardar en localStorage y redirigir
    realizarCompraBtn.addEventListener('click', function() {
        guardarCarritoEnLocalStorage(); // Guardar el carrito en localStorage
        window.location.href = 'PAtahuts.html'; // Redireccionar a PAtahuts.html
    });
});


// Event listener para el envío del formulario de compra
document.getElementById('formulario-compra').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir envío por defecto del formulario
    if (validarCompra()) {
        alert('Compra realizada correctamente');
    }
});
