// Función para registrar usuarios
function register() {
    event.preventDefault(); // Prevenir envío por defecto del formulario

    // Obtener valores del formulario de registro
    let name = document.getElementById('registerName').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;

    // Verificar si ya existe un usuario con ese email en LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el email ya está registrado
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Ya existe un usuario registrado con ese email.');
        return false;
    }

    // Agregar nuevo usuario
    let newUser = { name, email, password };
    users.push(newUser);

    // Guardar en LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado exitosamente.');

    // Redirigir a la página principal después del registro
    window.location.href = 'P1tahuts.html';

    return true;
}

// Función para iniciar sesión
function login() {
    event.preventDefault(); // Prevenir envío por defecto del formulario

    // Obtener valores del formulario de inicio de sesión
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // Obtener usuarios registrados de LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar credenciales
    let authenticatedUser = users.find(user => user.email === email && user.password === password);
    if (authenticatedUser) {
        alert('Inicio de sesión exitoso.');

        // Redirigir a la página principal después del inicio de sesión
        window.location.href = 'P1tahuts.html';

        return true;
    } else {
        alert('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        return false;
    }
}
