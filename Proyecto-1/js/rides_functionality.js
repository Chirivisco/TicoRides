// Método que crea un nuevo ride
function createRide(e) {
    e.preventDefault();

    // obtiene los valores del ride a crear.
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const time = document.getElementById('time').value;
    const seats = document.getElementById('seats').value;
    const fee = document.getElementById('fee').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    // obtiene los días del ride.
    const days = Array.from(document.querySelectorAll('input[name="days"]:checked'))
        .map(day => day.id);

    // obtiene el driver que logueó.
    const loggedDriver = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedDriver) {
        alert('Error al encontrar el conductor logueado.');
        return;
    }

    // obtiene la lista de los rides creados.
    let rides = JSON.parse(localStorage.getItem('rides')) || [];

    // crea un nuevo id para el ride.
    let newRideId;
    if (rides.length > 0) {
        // Encuentra el ID más alto y le suma 1 para generar un nuevo ID.
        newRideId = Math.max(...rides.map(ride => ride.id)) + 1;
    } else {
        newRideId = 1;
    }

    const newRide = {
        id: newRideId,
        driverId: loggedDriver.id,
        departure,
        arrival,
        days,
        time,
        seats,
        fee,
        vehicle: {
            make,
            model,
            year
        }
    };

    // actualiza la lista de rides.
    rides.push(newRide);

    // almacena la lista actualizada.
    localStorage.setItem('rides', JSON.stringify(rides));

    alert('Se ha creado un nuevo ride');

    window.location.href = "../pantallas/my_rides.html";
}

// Método que carga los rides
function loadRides() {
    const rides = JSON.parse(localStorage.getItem('rides')) || [];

    const tbody = document.getElementById("rides");

    // limpia el contenido de la tabla
    tbody.innerHTML = '';

    // por cada ride crea una nueva fila en el contenido de la tabla
    rides.forEach((ride) => {
        const row = `
            <tr>
                <td class="tbl-from">${ride.departure}</td>
                <td class="tbl-to">${ride.arrival}</td>
                <td class="tbl-seats">${ride.seats}</td>
                <td class="tbl-car">${ride.vehicle.make} ${ride.vehicle.model} (${ride.vehicle.year})</td>
                <td class="tbl-fee">${ride.fee}</td>
                <td class="tbl-actions">
                    <a href="./edit_ride.html?r=${ride.id}">Edit</a> | 
                    <a href="#" onclick="deleteRide(${ride.id})">Delete</a>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Método que elimina rides
function deleteRide(rideId) {
    let rides = JSON.parse(localStorage.getItem('rides')) || [];

    // busca y filtra para eliminar el ride por medio de su id
    rides = rides.filter(ride => ride.id !== rideId);

    // actualiza la lista de rides
    localStorage.setItem('rides', JSON.stringify(rides));

    // recarga los rides en la tabla
    loadRides();
}

// Método que obtiene el ID de un ride directamente de la URL
function rideID() {
    const params = new URLSearchParams(window.location.search);
    return params.get('r');
}

// Método que carga la info de un ride
function loadRide() {
    const rideId = parseInt(rideID());

    if (!rideId) {
        alert('Error al obtener el ID del ride');
        return;
    }

    const rides = JSON.parse(localStorage.getItem('rides')) || [];

    // filtra de los rides, el que se va a editar
    const infoRide = rides.find(ride => ride.id === rideId);

    if (!infoRide) {
        alert('Error al obtener la info del ride sleccionado');
        return;
    }

    document.getElementById('departure').value = infoRide.departure;
    document.getElementById('arrival').value = infoRide.arrival;
    document.getElementById('tiempo').value = infoRide.time;
    document.getElementById('asientos').value = infoRide.seats;
    document.getElementById('fee').value = infoRide.fee;
    document.getElementById('marca').value = infoRide.vehicle.make;
    document.getElementById('modelo').value = infoRide.vehicle.model;
    document.getElementById('ano').value = infoRide.vehicle.year;

    // según los días del ride los marca en el html
    infoRide.days.forEach(day => {
        document.getElementById(day).checked = true;
    });
}


// Método para editar un ride
function editRide() {
    const rideId = parseInt(rideID());

    let rides = JSON.parse(localStorage.getItem('rides')) || [];

    // Busca el ride que coincide con el id proporcionado
    let rideToEdit = rides.find(ride => ride.id === rideId);

    if (!rideToEdit) {
        alert('Error: No se encontró el ride especificado.');
        return;
    }

    // Obtiene los valores de los campos del formulario
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const time = document.getElementById('tiempo').value;
    const seats = document.getElementById('asientos').value;
    const fee = document.getElementById('fee').value;
    const make = document.getElementById('marca').value;
    const model = document.getElementById('modelo').value;
    const year = document.getElementById('ano').value;

    // Obtiene los días seleccionados
    const days = Array.from(document.querySelectorAll('input[name="days"]:checked'))
        .map(day => day.id);

    // Actualiza la información del ride
    rideToEdit.departure = departure;
    rideToEdit.arrival = arrival;
    rideToEdit.time = time;
    rideToEdit.seats = seats;
    rideToEdit.fee = fee;
    rideToEdit.days = days;
    rideToEdit.vehicle = {
        make: make,
        model: model,
        year: year
    };

    // Actualiza la lista de rides en el localStorage
    localStorage.setItem('rides', JSON.stringify(rides));

    alert('El ride ha sido actualizado correctamente.');
}



function bindEvents() {
    // Evento de crear rides
    const createRideButton = document.getElementById('create-ride-btn');

    if (createRideButton) {
        createRideButton.addEventListener('click', createRideButtonHandler);
    } else {
        console.error("No hay botón crear ride en el DOM.");
    }

    // Evento para visualizar la info de un ride
    loadRide();

    // Evento para editar rides
    const editRideButton = document.getElementById('edit-ride-btn');

    if (editRideButton) {
        editRideButton.addEventListener('click', editRideButtonHandler);
    } else {
        console.error("No hay botón editar ride en el DOM.");
    }
}

function createRideButtonHandler(e) {
    createRide(e);
}

function editRideButtonHandler() {
    editRide();
}