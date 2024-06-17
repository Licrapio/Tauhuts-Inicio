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

// Función para guardar la compra en el historial y redirigir
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

    // Redirigir a PAtahuts.html
    window.location.href = 'P1tahuts.html';
}

// Llamar a la función para cargar los datos del usuario cuando la página se cargue
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosUsuario();
});

// Event listener para el envío del formulario de compra
document.getElementById('formulario-compra').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir envío por defecto del formulario
    if (validarCompra()) {
        alert('Compra realizada correctamente');
        guardarCompra(); // Llama a la función para guardar la compra y redirigir
    }
});
