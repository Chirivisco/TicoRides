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
    rides.forEach((ride, index) => {
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


function bindEvents() {
    // Evento de crear rides
    const createRideButton = document.getElementById('create-ride-btn');

    if (createRideButton) {
        createRideButton.addEventListener('click', createRideButtonHandler);
    } else {
        console.error("No hay botón crear ride en el DOM.");
    }
}

function createRideButtonHandler(e) {
    createRide(e);
}