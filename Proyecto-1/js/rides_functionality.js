// Método que crea un nuevo ride
function createRide(e) {
    e.preventDefault();

    let departure, arrival, time, seats, fee, make, model, year;
    const days = [];

    // para poder crear los rides en cualquier vista, detecta cuál se está usando
    const responsive = window.innerWidth <= 1024 && window.innerWidth >= 380;

    if (responsive) {
        // vista responsive
        departure = document.getElementById('start').value;
        arrival = document.getElementById('end').value;
        time = document.getElementById('time-start').value;
        seats = 0;
        fee = 0;
        make = document.getElementById('make').value;
        model = document.getElementById('model').value;
        year = document.getElementById('year').value;

        // recibe todos los días seleccionados
        const selectedDays = document.querySelectorAll('input[name="days"]:checked');

        for (let i = 0; i < selectedDays.length; i++) {
            // obtiene el id de cada día y lo agrega al array
            days.push(selectedDays[i].id);
        }

    } else {
        // vista de PC
        departure = document.getElementById('departure').value;
        arrival = document.getElementById('arrival').value;
        time = document.getElementById('time').value;
        seats = document.getElementById('seats').value;
        fee = document.getElementById('fee').value;
        make = document.getElementById('make').value;
        model = document.getElementById('model').value;
        year = document.getElementById('year').value;

        // recibe todos los días seleccionados
        const selectedDays = document.querySelectorAll('input[name="days"]:checked');

        for (let i = 0; i < selectedDays.length; i++) {
            // obtiene el id de cada día y lo agrega al array
            days.push(selectedDays[i].id);
        }

    }

    // obtiene el conductor logueado
    const loggedDriver = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedDriver) {
        alert('Error al encontrar el conductor logueado.');
        return;
    }

    let rides = JSON.parse(localStorage.getItem('rides')) || [];

    // crea un nuevo id para el ride.
    let newRideId;
    if (rides.length > 0) {
        // busca el ID más alto y le suma 1 para generar un nuevo ID.
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

    // actualiza los rides y almacena en localStorage
    rides.push(newRide);
    localStorage.setItem('rides', JSON.stringify(rides));

    alert('Se ha creado un nuevo ride');
    window.location.href = "../pantallas/my_rides.html";
}

// Método que carga los rides del usuario conductor logueado
function loadRides() {
    if (window.location.pathname.includes('my_rides.html')) {
        const rides = JSON.parse(localStorage.getItem('rides')) || [];
        const loggedUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

        const tbody = document.getElementById("rides");

        // limpia el contenido de la tabla
        tbody.innerHTML = '';

        // por cada ride del usuario logueado crea una nueva fila en el contenido de la tabla
        rides.forEach((ride) => {
            if (ride.driverId === loggedUser.id) {
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
            }
        });
    }
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
    if (window.location.pathname.includes('edit_ride.html')) {
        const rideId = parseInt(rideID());

        const rides = JSON.parse(localStorage.getItem('rides')) || [];

        // filtra de los rides, el que se va a editar
        const infoRide = rides.find(ride => ride.id === rideId);

        // Cargar datos en el formulario principal
        document.getElementById('departure').value = infoRide.departure;
        document.getElementById('arrival').value = infoRide.arrival;
        document.getElementById('time').value = infoRide.time;
        document.getElementById('seats').value = infoRide.seats;
        document.getElementById('fee').value = infoRide.fee;
        document.getElementById('make').value = infoRide.vehicle.make;
        document.getElementById('model').value = infoRide.vehicle.model;
        document.getElementById('year').value = infoRide.vehicle.year;

        // según los días del ride, los marca en el html
        infoRide.days.forEach(day => {
            document.getElementById(day).checked = true;
        });

        document.getElementById('departure-responsive').value = infoRide.departure;
        document.getElementById('arrival-responsive').value = infoRide.arrival;
        document.getElementById('time-start').value = infoRide.time;

    } else if (window.location.pathname.includes('ride_details.html')) {
        const rideId = parseInt(rideID());

        const rides = JSON.parse(localStorage.getItem('rides')) || [];
        const drivers = JSON.parse(localStorage.getItem('drivers')) || [];

        // filtra de los rides, el que se va a mostrar
        const infoRide = rides.find(ride => ride.id === rideId);

        let driverName = 'Unknown';

        // obtiene el nombre del conductor del ride según su id.
        for (let i = 0; i < drivers.length; i++) {
            if (drivers[i].id === infoRide.driverId) {
                driverName = drivers[i].firstName;
                break;
            }
        }

        // carga los datos del ride en la vista de PC
        document.querySelector('#form-responsive-1 .titulo-ride').textContent = infoRide.departure + " - " + infoRide.arrival;
        document.querySelector('#form-responsive-1 .driver').textContent = driverName;
        document.querySelector('#form-responsive-1 .departure').textContent = infoRide.departure;
        document.querySelector('#form-responsive-1 .arrive').textContent = infoRide.arrival;
        document.querySelector('#form-responsive-1 .time').textContent = infoRide.time;
        document.querySelector('#form-responsive-1 .seats').textContent = infoRide.seats;
        document.querySelector('#form-responsive-1 .fee').textContent = infoRide.fee;
        document.querySelector('#form-responsive-1 .make').textContent = infoRide.vehicle.make;
        document.querySelector('#form-responsive-1 .model').textContent = infoRide.vehicle.model;
        document.querySelector('#form-responsive-1 .year').textContent = infoRide.vehicle.year;

        // carga los datos del ride en la vista responsive
        document.querySelector('#form-responsive-2 .titulo-ride').textContent = infoRide.departure + " - " + infoRide.arrival;
        document.querySelector('#form-responsive-2 .driver').textContent = driverName;
        document.querySelector('#form-responsive-2 .departure').textContent = infoRide.departure;
        document.querySelector('#form-responsive-2 .arrive').textContent = infoRide.arrival;
        document.querySelector('#form-responsive-2 .time').textContent = infoRide.time;
        document.querySelector('#form-responsive-2 .seats').textContent = infoRide.seats;
        document.querySelector('#form-responsive-2 .fee').textContent = infoRide.fee;
        document.querySelector('#form-responsive-2 .make').textContent = infoRide.vehicle.make;
        document.querySelector('#form-responsive-2 .model').textContent = infoRide.vehicle.model;
        document.querySelector('#form-responsive-2 .year').textContent = infoRide.vehicle.year;

        // marca los días del ride en el html
        infoRide.days.forEach(day => {
            const dayCheckbox1 = document.querySelector(`#form-responsive-1 input[value="${day.toLowerCase()}"]`);
            if (dayCheckbox1) {
                dayCheckbox1.checked = true;
            }
            const dayCheckbox2 = document.querySelector(`#form-responsive-2 input[value="${day.toLowerCase()}"]`);
            if (dayCheckbox2) {
                dayCheckbox2.checked = true;
            }
        });
    }
}

// Método para editar un ride
function editRide() {
    const rideId = parseInt(rideID());

    let listRides = JSON.parse(localStorage.getItem('rides')) || [];

    // busca el ride según el ID de la url
    let ride = listRides.find(ride => ride.id === rideId);

    if (!ride) {
        alert('Error: No se encontró el ride especificado.');
        return;
    }

    // para poder editar los rides en cualquier vista, detecta cuál se está usando
    const responsive = window.innerWidth <= 1024 && window.innerWidth >= 380;

    if (responsive) {
        // Vista de smartphones y tablets
        const departure = document.getElementById('departure-responsive').value;
        const arrival = document.getElementById('arrival-responsive').value;
        const timeStart = document.getElementById('time-start').value;

        const days = [];

        // recibe todos los días seleccionados
        const selectedDays = document.querySelectorAll('input[name="days"]:checked');

        for (let i = 0; i < selectedDays.length; i++) {
            // obtiene el id de cada día y lo agrega al array
            days.push(selectedDays[i].id);
        }

        ride.departure = departure;
        ride.arrival = arrival;
        ride.time = timeStart;
        ride.days = days;

    } else {
        // Vista de PC
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const time = document.getElementById('time').value;
        const seats = document.getElementById('seats').value;
        const fee = document.getElementById('fee').value;
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const year = document.getElementById('year').value;

        const days = [];

        // recibe todos los días seleccionados
        const selectedDays = document.querySelectorAll('input[name="days"]:checked');

        for (let i = 0; i < selectedDays.length; i++) {
            // obtiene el id de cada día y lo agrega al array
            days.push(selectedDays[i].id);
        }


        ride.departure = departure;
        ride.arrival = arrival;
        ride.time = time;
        ride.seats = seats;
        ride.fee = fee;
        ride.days = days;
        ride.vehicle = {
            make: make,
            model: model,
            year: year
        };
    }

    // actualiza los rides del localstorage
    localStorage.setItem('rides', JSON.stringify(listRides));

    alert('El ride ha sido actualizado correctamente.');
}

// Método que carga todos lugares de departure y arrival
function loadLocations() {
    if (window.location.pathname.includes('search_ride.html')) {
        const rides = JSON.parse(localStorage.getItem('rides')) || [];

        // crea una colección de datos que no pueden repetirse (el 'Set()' almacena datos únicos)
        const departures = new Set();
        const arrivals = new Set();

        // de cada ride, obtengo todos los departure y arrival
        rides.forEach((ride) => {
            departures.add(ride.departure);
            arrivals.add(ride.arrival);
        });

        // agrego esos lugares ya únicos a un array
        const departureList = Array.from(departures);
        const arrivalList = Array.from(arrivals);

        const departureSelect1 = document.getElementById('desde');
        const arrivalSelect1 = document.getElementById('hasta');
        const departureSelect2 = document.getElementById('desde-responsive');
        const arrivalSelect2 = document.getElementById('hasta-responsive');

        departureSelect1.innerHTML = '';
        arrivalSelect1.innerHTML = '';
        departureSelect2.innerHTML = '';
        arrivalSelect2.innerHTML = '';

        // agrega las opciones de departure a ambos selects
        departureList.forEach(departure => {
            const option1 = document.createElement('option');
            option1.value = departure;
            option1.textContent = departure;

            const option2 = option1.cloneNode(true);

            departureSelect1.appendChild(option1);
            departureSelect2.appendChild(option2);
        });

        // agrega las opciones de arrival a ambos selects
        arrivalList.forEach(arrival => {
            const option1 = document.createElement('option');
            option1.value = arrival;
            option1.textContent = arrival;

            const option2 = option1.cloneNode(true);

            arrivalSelect1.appendChild(option1);
            arrivalSelect2.appendChild(option2);
        });
    }
}

// Método que carga todos los rides disponibles sin filtros
function loadAllRides() {
    const rides = JSON.parse(localStorage.getItem('rides')) || [];
    const drivers = JSON.parse(localStorage.getItem('drivers')) || [];

    // selecciona ambas tablas de las vistas
    const tbody1 = document.querySelector('#form-responsive-1 .lista-rides tbody');
    const tbody2 = document.querySelector('#form-responsive-2 .lista-rides tbody');

    tbody1.innerHTML = '';
    tbody2.innerHTML = '';

    // filtra solo los rides que tengan al menos un asiento disponible
    const availableRides = rides.filter(ride => ride.seats > 0);

    availableRides.forEach((ride) => {
        let driverName = 'Unknown';

        // obtiene el nombre del conductor del ride según su id.
        for (let i = 0; i < drivers.length; i++) {
            if (drivers[i].id === ride.driverId) {
                driverName = drivers[i].firstName;
                break;
            }
        }

        // agrega el ride a la tabla de vista PC
        const row1 = `
        <tr>
            <td class="tbl-driver">${driverName}</td>
            <td class="tbl-from">${ride.departure}</td>
            <td class="tbl-to">${ride.arrival}</td>
            <td class="tbl-seats">${ride.seats}</td>
            <td class="tbl-car">${ride.vehicle.make} ${ride.vehicle.model} (${ride.vehicle.year})</td>
            <td class="tbl-fee">${ride.fee}</td>
            <td class="tbl-actions">
                <a href="./ride_details.html?r=${ride.id}">Request</a>
            </td>
        </tr>`;

        // agrega el ride a la tabla de vista responsive
        const row2 = `
        <tr>
            <td class="tbl-driver">${driverName}</td>
            <td class="tbl-from">${ride.departure}</td>
            <td class="tbl-to">${ride.arrival}</td>
            <td class="tbl-view">
                <a href="./ride_details.html?r=${ride.id}">View</a>
            </td>
        </tr>`;

        // suma la fila a ambas tablas
        tbody1.innerHTML += row1;
        tbody2.innerHTML += row2;
    });
}

// Método que carga los rides según los filtros seleccionados
function loadFilteredRides() {
    const rides = JSON.parse(localStorage.getItem('rides')) || [];
    const drivers = JSON.parse(localStorage.getItem('drivers')) || [];

    // detecta si está en vista responsive
    const responsive = window.innerWidth <= 1024 && window.innerWidth >= 380;

    let departureSelect;
    let arrivalSelect;

    // según si es responsive o no, selecciona los elementos de filtrado
    if (responsive) {
        departureSelect = document.getElementById('desde-responsive');
        arrivalSelect = document.getElementById('hasta-responsive');
    } else {
        departureSelect = document.getElementById('desde');
        arrivalSelect = document.getElementById('hasta');
    }

    const selectedDeparture = departureSelect.value;
    const selectedArrival = arrivalSelect.value;

    // variable que almacena los rides filtrados
    const filteredRides = rides.filter((ride) => {
        // variables que sirven para dar señal si el departure y/o el arrival seleccionado coincide con los del ride
        let matchesDeparture = true;
        let matchesArrival = true;

        // verifica si se seleccionó un departure
        if (selectedDeparture) {
            // verifica si el departure coincide con el departure del ride
            if (ride.departure !== selectedDeparture) {
                matchesDeparture = false;
            }
        }

        // verifica si se seleccionó un arrival
        if (selectedArrival) {
            // verifica si el arrival coincide con el arrival del ride
            if (ride.arrival !== selectedArrival) {
                matchesArrival = false;
            }
        }

        return matchesDeparture && matchesArrival && ride.seats > 0;
    });

    // selecciona ambas tablas de las vistas
    const tbody1 = document.querySelector('#form-responsive-1 .lista-rides tbody');
    const tbody2 = document.querySelector('#form-responsive-2 .lista-rides tbody');

    tbody1.innerHTML = '';
    tbody2.innerHTML = '';

    filteredRides.forEach((ride) => {
        let driverName = 'Unknown';

        // obtiene el nombre del conductor del ride según su id.
        for (let i = 0; i < drivers.length; i++) {
            if (drivers[i].id === ride.driverId) {
                driverName = drivers[i].firstName;
                break;
            }
        }

        // agrega el ride a la tabla de vista PC
        const row1 = `
        <tr>
            <td class="tbl-driver">${driverName}</td>
            <td class="tbl-from">${ride.departure}</td>
            <td class="tbl-to">${ride.arrival}</td>
            <td class="tbl-seats">${ride.seats}</td>
            <td class="tbl-car">${ride.vehicle.make} ${ride.vehicle.model} (${ride.vehicle.year})</td>
            <td class="tbl-fee">${ride.fee}</td>
            <td class="tbl-actions">
                <a href="./ride_details.html?r=${ride.id}">Request</a>
            </td>
        </tr>`;

        // agrega el ride a la tabla de vista responsive
        const row2 = `
        <tr>
            <td class="tbl-driver">${driverName}</td>
            <td class="tbl-from">${ride.departure}</td>
            <td class="tbl-to">${ride.arrival}</td>
            <td class="tbl-view">
                <a href="./ride_details.html?r=${ride.id}">View</a>
            </td>
        </tr>`;

        // suma la fila a ambas tablas
        tbody1.innerHTML += row1;
        tbody2.innerHTML += row2;
    });
}

// Método que almacena una solicitud a un ride
function requestRide() {
    // obtiene el id del ride desde la URL
    const params = new URLSearchParams(window.location.search);
    const rideId = parseInt(params.get('r'), 10);

    // obtiene el usuario logueado 
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // crea la lista de solicitudes de rides en el localstorage
    let rideRequests = JSON.parse(localStorage.getItem('rideRequests')) || [];

    const request = {
        userId: loggedInUser.id,
        rideId: rideId
    };

    // agrega la nueva solicitud a la lista
    rideRequests.push(request);

    // guarda la lista actualizada de solicitudes en el localStorage
    localStorage.setItem('rideRequests', JSON.stringify(rideRequests));

    alert('Se ha enviado solicitud de ride');
}

// Método que carga los rides con solicitudes de un driver específico
function loadRequestedRides() {
    if (window.location.pathname.includes('bookings.html')) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const rideRequests = JSON.parse(localStorage.getItem('rideRequests')) || [];
        const rides = JSON.parse(localStorage.getItem('rides')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // obtiene todos los rides del driver
        const driverRides = rides.filter(ride => ride.driverId === loggedInUser.id);

        // obtiene los rides con solicitudes
        const filteredRequests = rideRequests.filter(request =>
            driverRides.some(ride => ride.id === request.rideId)
        );

        // Obtener referencias a las tablas de las dos vistas
        const pcTableBody = document.querySelector('#form-responsive-1 tbody');
        const responsiveTableBody = document.querySelector('#form-responsive-2 tbody');

        pcTableBody.innerHTML = '';
        responsiveTableBody.innerHTML = '';

        // llena las tablas con los datos
        filteredRequests.forEach(request => {

            // busca el usuario que solicitó el ride
            let userName = 'Unknown User';
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === request.userId) {
                    userName = users[i].firstName + ' ' + users[i].lastName;
                    break;
                }
            }

            // busca la descripción (lugar de salida y llegada) del ride
            let rideDescription = 'Unknown Ride';
            for (let j = 0; j < rides.length; j++) {
                if (rides[j].id === request.rideId) {
                    rideDescription = rides[j].departure + ' - ' + rides[j].arrival;
                    break;
                }
            }

            // crea las filas con los datos para la tabla
            const rowHtml = `
                <tr>
                    <td>
                        <img src="/Proyecto-1/iconos/profile_picture.png" alt="User Icon">
                        ${userName}
                    </td>
                    <td>${rideDescription}</td>
                    <td>
                        <button type="button" class="accept-btn" data-ride-id="${request.rideId}" data-user-id="${request.userId}">Accept</button> | 
                        <button type="button" class="reject-btn" data-ride-id="${request.rideId}" data-user-id="${request.userId}">Reject</button>
                    </td>
                </tr>
            `;

            // agrega la fila creada a las dos tablas
            pcTableBody.innerHTML += rowHtml;
            responsiveTableBody.innerHTML += rowHtml;
        });
    }
}

function rideRequestHandler(event) {
    // Evitar el comportamiento predeterminado del enlace
    event.preventDefault();

    // Obtener el botón que fue clicado y los atributos data-ride-id y data-user-id
    const target = event.target;
    const rideId = parseInt(target.getAttribute('data-ride-id'));
    const userId = parseInt(target.getAttribute('data-user-id'));
    const action = target.classList.contains('accept-btn') ? 'accept' : 'reject';

    const rideRequests = JSON.parse(localStorage.getItem('rideRequests')) || [];
    const rides = JSON.parse(localStorage.getItem('rides')) || [];

    // Encuentra la solicitud de viaje y el ride correspondiente
    const requestIndex = rideRequests.findIndex(request => request.rideId === rideId && request.userId === userId);
    const rideIndex = rides.findIndex(ride => ride.id === rideId);

    if (requestIndex !== -1 && rideIndex !== -1) {
        if (action === 'accept') {
            // Resta 1 al atributo 'seats' del ride
            rides[rideIndex].seats = String(Math.max(0, Number(rides[rideIndex].seats) - 1));
        }

        // Elimina la solicitud de la lista de solicitudes
        rideRequests.splice(requestIndex, 1);

        // Actualiza el localStorage
        localStorage.setItem('rideRequests', JSON.stringify(rideRequests));
        localStorage.setItem('rides', JSON.stringify(rides));

        window.location.href = "../pantallas/bookings.html";
    }
}


function bindEvents() {
    // Evento de crear rides en la vista de PC
    const createRideButton = document.getElementById('create-ride-btn');

    if (createRideButton) {
        createRideButton.addEventListener('click', createRideButtonHandler);
    }

    // Evento para crear rides en la vista responsive
    const createRideButtonResponsive = document.getElementById('create-ride-btn-responsive');

    if (createRideButtonResponsive) {
        createRideButtonResponsive.addEventListener('click', createRideButtonHandler);
    }

    // Evento para editar rides en la vista de PC
    const editRideButton = document.getElementById('edit-ride-btn');
    if (editRideButton) {
        editRideButton.addEventListener('click', editRideButtonHandler);
    }

    // Evento para editar rides en la vista responsive
    const editRideButtonResponsive = document.getElementById('edit-ride-responsive-btn');
    if (editRideButtonResponsive) {
        editRideButtonResponsive.addEventListener('click', editRideButtonHandler);
    }

    // Evento que carga todos los rides disponibles
    const clearFilterButtons = document.getElementsByClassName('clear-filter');
    if (clearFilterButtons) {
        for (let i = 0; i < clearFilterButtons.length; i++) {
            clearFilterButtons[i].addEventListener('click', clearFilterButtonHandler);
        }
    }

    // Evento que carga los rides filtrados del 'search-ride.html'
    const searchRideButton = document.getElementById('search-ride');
    if (searchRideButton) {
        searchRideButton.addEventListener('click', searchRideButtonHandler);
    }

    const searchRideResponsiveButton = document.getElementById('search-ride-responsive');
    if (searchRideResponsiveButton) {
        searchRideResponsiveButton.addEventListener('click', searchRideButtonHandler);
    }

    // Evento para solicitar ride
    const requestRideButtons = document.getElementsByClassName('request');
    if (requestRideButtons) {
        for (let i = 0; i < requestRideButtons.length; i++) {
            requestRideButtons[i].addEventListener('click', requestRideButtonHandler);
        }
    }

    // Evento para aceptar una solicitud de ride
    const acceptRequestButtons = document.getElementsByClassName('accept-btn');
    if (acceptRequestButtons) {
        for (let i = 0; i < acceptRequestButtons.length; i++) {
            acceptRequestButtons[i].addEventListener('click', requestHandler);
        }
    }

    // Evento para rechazar una solicitud de ride
    const declineRequestButtons = document.getElementsByClassName('reject-btn');
    if (declineRequestButtons) {
        for (let i = 0; i < declineRequestButtons.length; i++) {
            declineRequestButtons[i].addEventListener('click', requestHandler);
        }
    }
}

function createRideButtonHandler(e) {
    createRide(e);
}

function editRideButtonHandler() {
    editRide();
}

function searchRideButtonHandler() {
    loadFilteredRides();
}

function clearFilterButtonHandler() {
    loadAllRides();
}

function requestRideButtonHandler() {
    requestRide();
}

function requestHandler(event) {
    rideRequestHandler(event);
}

// ejecuta los bindEvents después de que se ejecutó todo el DOM.
document.addEventListener('DOMContentLoaded', bindEvents);