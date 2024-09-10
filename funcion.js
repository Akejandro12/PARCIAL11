document.getElementById('sedeSelect').addEventListener('change', function () {
    var sedeInfo = {
        sede1: `<h4>Sede 1</h4>
                <p><strong>Dirección:</strong> Calle Ejemplo 123, Ciudad</p>
                <p><strong>Teléfono:</strong> (555) 123-4567</p>
                <p><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                <p><strong>Encargado:</strong> Juan Pérez</p>`,
        sede2: `<h4>Sede 2</h4>
                <p><strong>Dirección:</strong> Avenida Ficticia 456, Ciudad</p>
                <p><strong>Teléfono:</strong> (555) 234-5678</p>
                <p><strong>Horario:</strong> Lunes a Viernes, 10:00 AM - 5:00 PM</p>
                <p><strong>Encargado:</strong> María López</p>`,
        sede3: `<h4>Sede 3</h4>
                <p><strong>Dirección:</strong> Plaza Modelo 789, Ciudad</p>
                <p><strong>Teléfono:</strong> (555) 345-6789</p>
                <p><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 7:00 PM</p>
                <p><strong>Encargado:</strong> Pedro Gómez</p>`
    };

    var selectedSede = this.value;
    var description = this.options[this.selectedIndex].dataset.description;
    var infoHtml = sedeInfo[selectedSede] || '';

    if (description) {
        infoHtml = `<p><strong>Descripción:</strong> ${description}</p>` + infoHtml;
    }

    document.getElementById('sedeInfo').innerHTML = infoHtml;
});


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const vehicleContainers = [document.getElementById('kiaVehicles'), document.getElementById('renaultVehicles')];

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();

        vehicleContainers.forEach(container => {
            const cards = container.getElementsByClassName('card');
            
            for (let i = 0; i < cards.length; i++) {
                const title = cards[i].getElementsByClassName('card-title')[0].innerText.toLowerCase();
                if (title.includes(query)) {
                    cards[i].style.display = '';
                } else {
                    cards[i].style.display = 'none';
                }
            }
        });

        console.log('Buscar:', query);
    });

    $('#vehicleModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const vehicle = button.data('vehicle');

        const modal = $(this);
        modal.find('#modalName').text('Nombre: ' + vehicle.name);
        modal.find('#modalModel').text('Modelo: ' + vehicle.model);
        modal.find('#modalEngine').text('Cilindraje: ' + vehicle.engine);
        modal.find('#modalCare').text('Cuidados: ' + vehicle.care);
        modal.find('#modalPrice').text('Precio: ' + vehicle.price);
    });
});

function getEmailCount(email) {
    const count = localStorage.getItem(email);
    return count ? parseInt(count, 10) : 0;
}

function incrementEmailCount(email) {
    const count = getEmailCount(email);
    localStorage.setItem(email, count + 1);
}

function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const estrato = document.getElementById('estrato').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const bloodGroup = document.getElementById('blood-group').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const activities = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.nextElementSibling.textContent).join(', ');
    const appointmentDate = document.getElementById('appointment-date').value.trim();
    const appointmentTime = document.getElementById('appointment-time').value.trim();

    if (!name || !surname || !email || !phone || !estrato || !dob || !bloodGroup || !gender || !appointmentDate || !appointmentTime) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    const emailCount = getEmailCount(email);
    incrementEmailCount(email);

    alert(`Información ingresada:\nNombre: ${name}\nApellidos: ${surname}\nEmail: ${email}\nTeléfono: ${phone}\nEstrato: ${estrato}\nFecha de nacimiento: ${dob}\nGrupo Sanguíneo: ${bloodGroup}\nGénero: ${gender}\nActividades favoritas: ${activities}\nFecha de Solicitud: ${appointmentDate}\nHora de Solicitud: ${appointmentTime}\n\nNúmero de solicitudes con este email: ${emailCount + 1}`);
}

function handleCancel() {
    window.location.href = './index.html';
}