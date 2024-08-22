// Método para validar que la información de un nuevo usuario normal sea correcta
function validacion(e) {
    e.preventDefault();

    // valores de un usuario
    const nombre = document.getElementById('first-name');
    const apellidos = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');
    const address = document.getElementById('address');
    const country = document.getElementById('paises');
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const phoneNumber = document.getElementById('phone-number');

    // Validaciones de la info del usuario
    if (nombre.value === "") {
        alert("Por favor, ingrese su NOMBRE.");
        nombre.focus();
        return false;
    }

    if (apellidos.value === "") {
        alert("Por favor, ingrese su APELLIDO.");
        apellidos.focus();
        return false;
    }

    if (email.value === "") {
        alert("Por favor, ingrese su EMAIL.");
        email.focus();
        return false;
    }

    if (password.value === "") {
        alert("Por favor, ingrese su CONTRASEÑA.");
        password.focus();
        return false;
    }

    if (repeatPassword.value === "") {
        alert("Por favor, repita su CONTRASEÑA.");
        repeatPassword.focus();
        return false;
    }

    if (password.value !== repeatPassword.value) {
        alert("Las contraseñas no coinciden.");
        repeatPassword.focus();
        return false;
    }

    if (address.value === "") {
        alert("Por favor, ingrese su DIRECCIÓN.");
        address.focus();
        return false;
    }

    if (country.value === "") {
        alert("Por favor, seleccione su PAÍS.");
        country.focus();
        return false;
    }

    if (state.value === "") {
        alert("Por favor, ingrese su ESTADO.");
        state.focus();
        return false;
    }

    if (city.value === "") {
        alert("Por favor, ingrese su CIUDAD.");
        city.focus();
        return false;
    }

    if (phoneNumber.value === "") {
        alert("Por favor, ingrese su NÚMERO DE TELÉFONO.");
        phoneNumber.focus();
        return false;
    }

    // guarda el usuario si la info es correcta
    saveUser(nombre.value, apellidos.value, email.value, password.value, address.value, country.value, state.value, city.value, phoneNumber.value);
}

// Método para almacenar la información de un usuario normal
function saveUser(firstName, lastName, email, password, address, country, state, city, phoneNumber) {
    // obtiene los usuarios del localstorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // genera un id para el usuario según el id anterior
    let newId;
    if (users.length > 0) {
        // Encuentra el ID más alto y le suma 1 para generar un nuevo ID.
        newId = Math.max(...users.map(user => user.id)) + 1;
    } else {
        newId = 1;
    }

    // crea un nuevo usuario
    const newUser = {
        id: newId,
        firstName,
        lastName,
        email,
        password,
        address,
        country,
        state,
        city,
        phoneNumber,
        type: "user"
    };

    // agrega el nuevo usuario a la lista de usuarios
    users.push(newUser);

    // guarda la lista de usuarios ya actualizada en el localStorage
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario creado');
}

// Método para validar que la información de un nuevo conductor sea correcta
function validacionDriver(e) {
    e.preventDefault();

    // valores de un conductor
    const nombre = document.getElementById('first-name');
    const apellidos = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');
    const address = document.getElementById('address');
    const country = document.getElementById('paises');
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const phoneNumber = document.getElementById('phone-number');
    const brandCar = document.getElementById('brand-car');
    const modelCar = document.getElementById('model-car');
    const yearCar = document.getElementById('year-car');
    const numberPlate = document.getElementById('number-plate');

    // Validaciones de la info del conductor
    if (nombre.value === "") {
        alert("Por favor, ingrese su NOMBRE.");
        nombre.focus();
        return false;
    }

    if (apellidos.value === "") {
        alert("Por favor, ingrese su APELLIDO.");
        apellidos.focus();
        return false;
    }

    if (email.value === "") {
        alert("Por favor, ingrese su EMAIL.");
        email.focus();
        return false;
    }

    if (password.value === "") {
        alert("Por favor, ingrese su CONTRASEÑA.");
        password.focus();
        return false;
    }

    if (repeatPassword.value === "") {
        alert("Por favor, repita su CONTRASEÑA.");
        repeatPassword.focus();
        return false;
    }

    if (password.value !== repeatPassword.value) {
        alert("Las contraseñas no coinciden.");
        repeatPassword.focus();
        return false;
    }

    if (address.value === "") {
        alert("Por favor, ingrese su DIRECCIÓN.");
        address.focus();
        return false;
    }

    if (country.value === "") {
        alert("Por favor, seleccione su PAÍS.");
        country.focus();
        return false;
    }

    if (state.value === "") {
        alert("Por favor, ingrese su ESTADO.");
        state.focus();
        return false;
    }

    if (city.value === "") {
        alert("Por favor, ingrese su CIUDAD.");
        city.focus();
        return false;
    }

    if (phoneNumber.value === "") {
        alert("Por favor, ingrese su NÚMERO DE TELÉFONO.");
        phoneNumber.focus();
        return false;
    }

    if (brandCar.value === "") {
        alert("Por favor, ingrese la MARCA del coche.");
        brandCar.focus();
        return false;
    }

    if (modelCar.value === "") {
        alert("Por favor, ingrese el MODELO del coche.");
        modelCar.focus();
        return false;
    }

    if (yearCar.value === "") {
        alert("Por favor, ingrese el AÑO del coche.");
        yearCar.focus();
        return false;
    }

    if (numberPlate.value === "") {
        alert("Por favor, ingrese el NÚMERO DE PLACA.");
        numberPlate.focus();
        return false;
    }

    // guarda el conductor si la info es correcta
    saveDriver(nombre.value, apellidos.value, email.value, password.value, address.value, country.value, state.value, city.value, phoneNumber.value, brandCar.value, modelCar.value, yearCar.value, numberPlate.value);
}

// Método para almacenar la información de un conductor
function saveDriver(firstName, lastName, email, password, address, country, state, city, phoneNumber, brandCar, modelCar, yearCar, numberPlate) {
    // obtiene los conductores del localStorage
    let drivers = JSON.parse(localStorage.getItem('drivers')) || [];

    // genera un id para el conductor según el id anterior
    let newId;
    if (drivers.length > 0) {
        // Encuentra el ID más alto y le suma 1 para generar un nuevo ID.
        newId = Math.max(...drivers.map(driver => driver.id)) + 1;
    } else {
        newId = 1;
    }

    // crea un nuevo conductor
    const newDriver = {
        id: newId,
        firstName,
        lastName,
        email,
        password,
        address,
        country,
        state,
        city,
        phoneNumber,
        brandCar,
        modelCar,
        yearCar,
        numberPlate,
        type: "driver"
    };

    // agrega el nuevo conductor a la lista de conductores
    drivers.push(newDriver);

    // guarda la lista de conductores ya actualizada en el localStorage
    localStorage.setItem('drivers', JSON.stringify(drivers));
    alert('Conductor registrado exitosamente');
}

// Método de inicio de sesión
function login(e) {
    e.preventDefault();

    
    const username = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // encapsular en una condición:

    const firstName = username.value;
    const password = passwordInput.value;

    // Obtén la lista de usuarios y conductores desde localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let drivers = JSON.parse(localStorage.getItem('drivers')) || [];

    let userFound = false;
    let driverFound = false;
    let loggedInUser = null;

    // Validación para la existencia del usuario
    for (let i = 0; i < users.length; i++) {
        if (users[i].firstName === firstName && users[i].password === password) {
            userFound = true;
            loggedInUser = users[i];
            break;
        }
    }

    // Validación para la existencia del conductor
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].firstName === firstName && drivers[i].password === password) {
            driverFound = true;
            loggedInUser = drivers[i];
            break;
        }
    }

    if (userFound || driverFound) {
        // Almacena momentaneamente el usuario que logró acceder.
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        if (userFound) { // login de usuario
            window.location.href = "/Proyecto-1/pantallas/search_ride.html";
        } else { // login de driver
            window.location.href = "/Proyecto-1/pantallas/my_rides.html";
        }
    } else {
        alert("Credenciales incorrectas");
    }
}

// Método que limpia el usuario que inició sesión al cerrar sesión.
function clearLoggedInUser() {
    localStorage.removeItem('loggedInUser');
}

// Método para mensaje personalizado en versión responsive.
function welcomeMessage() {
    const parrafo = document.querySelector('.welcome-user-p');
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedUser) {
        console.error('Error al encontrar el usuario logueado.');
        return;
    }

    // detecta si está en versión o vista responsive
    const responsive = window.matchMedia('(max-width: 1024px)').matches;

    if (responsive) {
        parrafo.textContent = `Welcome ${loggedUser.firstName || 'User'}`;
    }
}

function bindEvents() {

    // Evento de registro de usuario normal
    const registrarUsuarioButton = document.getElementById('btn-registrar');

    if (registrarUsuarioButton) {
        registrarUsuarioButton.addEventListener('click', registerButtonHandler);
    }

    // Evento de registro de conductor
    const registrarDriverButton = document.getElementById('btn-registrar-driver');

    if (registrarDriverButton) {
        registrarDriverButton.addEventListener('click', registerDriverHandler);
    }

    // Evento de login
    const loginButton = document.getElementById('login-btn');

    if (loginButton) {
        loginButton.addEventListener('click', login);
    }

    // Evento de mensaje de bienvenida responsive
    welcomeMessage();
}

function registerButtonHandler(event) {
    validacion(event);
}

function registerDriverHandler(event) {
    validacionDriver(event);
}

function loginButtonHandler(event) {
    login(event);
}