// Base de datos de ciudades y distancias

const distances = {
    "Santiago": { 
        "Valparaiso": 120, 
        "Concepcion": 500, 
        "La Serena": 470, 
        "Antofagasta": 1360, 
        "Temuco": 670,
        "Iquique": 1860,
        "Rancagua": 90,
        "Talca": 250,
        "Puerto Montt": 1000
    },
    "Valparaiso": { 
        "Santiago": 120, 
        "Concepcion": 360, 
        "La Serena": 400, 
        "Antofagasta": 1480, 
        "Temuco": 780,
        "Iquique": 1980,
        "Rancagua": 90,
        "Talca": 310,
        "Puerto Montt": 1120
    },
    "Concepcion": { 
        "Santiago": 500, 
        "Valparaiso": 360, 
        "La Serena": 550, 
        "Antofagasta": 1800, 
        "Temuco": 220,
        "Iquique": 2070,
        "Rancagua": 420,
        "Talca": 200,
        "Puerto Montt": 960
    },
    "La Serena": { 
        "Santiago": 470, 
        "Valparaiso": 400, 
        "Concepcion": 550, 
        "Antofagasta": 890, 
        "Temuco": 840,
        "Iquique": 970,
        "Rancagua": 540,
        "Talca": 370,
        "Puerto Montt": 1150
    },
    "Antofagasta": { 
        "Santiago": 1360, 
        "Valparaiso": 1480, 
        "Concepcion": 1800, 
        "La Serena": 890, 
        "Temuco": 1550,
        "Iquique": 300,
        "Rancagua": 1330,
        "Talca": 1540,
        "Puerto Montt": 1960
    },
    "Temuco": { 
        "Santiago": 670, 
        "Valparaiso": 780, 
        "Concepcion": 220, 
        "La Serena": 840, 
        "Antofagasta": 1550,
        "Iquique": 1880,
        "Rancagua": 590,
        "Talca": 300,
        "Puerto Montt": 230
    },
    "Iquique": { 
        "Santiago": 1860, 
        "Valparaiso": 1980, 
        "Concepcion": 2070, 
        "La Serena": 970, 
        "Antofagasta": 300,
        "Temuco": 1880,
        "Rancagua": 1810,
        "Talca": 2000,
        "Puerto Montt": 2270
    },
    "Rancagua": { 
        "Santiago": 90, 
        "Valparaiso": 90, 
        "Concepcion": 420, 
        "La Serena": 540, 
        "Antofagasta": 1330,
        "Temuco": 590,
        "Iquique": 1810,
        "Talca": 160,
        "Puerto Montt": 1220
    },
    "Talca": { 
        "Santiago": 250, 
        "Valparaiso": 310, 
        "Concepcion": 200, 
        "La Serena": 370, 
        "Antofagasta": 1540,
        "Temuco": 300,
        "Iquique": 2000,
        "Rancagua": 160,
        "Puerto Montt": 880
    },
    "Puerto Montt": { 
        "Santiago": 1000, 
        "Valparaiso": 1120, 
        "Concepcion": 960, 
        "La Serena": 1150, 
        "Antofagasta": 1960,
        "Temuco": 230,
        "Iquique": 2270,
        "Rancagua": 1220,
        "Talca": 880
    },
    // Agregar más ciudades y distancias según sea necesario...
};



// Función para filtrar ciudades con actualización inmediata de distancia
function filtrarCiudades(tipo) {
    const input = document.getElementById(`${tipo}Input`);
    const suggestions = document.getElementById(`${tipo}Suggestions`);
    const value = input.value.toLowerCase();
    
    suggestions.innerHTML = '';
    if (value === '') {
        suggestions.style.display = 'none';
        return;
    }
    
    const ciudades = Object.keys(distances);
    const ciudadesFiltradas = ciudades.filter(ciudad => 
        ciudad.toLowerCase().includes(value)
    );
    
    if (ciudadesFiltradas.length > 0) {
        suggestions.style.display = 'block';
        ciudadesFiltradas.forEach(ciudad => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = ciudad;
            div.onclick = () => {
                input.value = ciudad;
                suggestions.style.display = 'none';
                calcularYMostrarDistancia(); // Actualiza la distancia inmediatamente
            };
            suggestions.appendChild(div);
        });
    } else {
        suggestions.style.display = 'none';
    }
}

// Función para calcular y mostrar la distancia inmediatamente
function calcularYMostrarDistancia() {
    const origen = document.getElementById('origenInput').value;
    const destino = document.getElementById('destinoInput').value;
    const distanceDisplay = document.getElementById('distanceDisplay');
    
    if (origen && destino) {
        if (distances[origen] && distances[origen][destino]) {
            const distancia = distances[origen][destino];
            document.getElementById('distanciaInput').value = distancia;
            distanceDisplay.style.display = 'block';
            distanceDisplay.innerHTML = `La distancia entre ${origen} y ${destino} es de ${distancia} kilómetros`;
            console.log('Distancia establecida:', distancia); // Debug
        } else {
            document.getElementById('distanciaInput').value = '0';
            distanceDisplay.style.display = 'none';
        }
    } else {
        distanceDisplay.style.display = 'none';
    }
}

// Event listeners para los campos de entrada
document.getElementById('origenInput').addEventListener('input', () => filtrarCiudades('origen'));
document.getElementById('destinoInput').addEventListener('input', () => filtrarCiudades('destino'));

// Event listener para el formulario
document.getElementById('reservaForm').addEventListener('submit', function(event) {
    const distancia = document.getElementById('distanciaInput').value;
    if (distancia === '0' || !distancia) {
        event.preventDefault();
        alert('Por favor, seleccione ciudades válidas para calcular la distancia');
        return false;
    }
    return true;
});

// Limpiar sugerencias cuando se hace clic fuera
document.addEventListener('click', function(event) {
    const suggestions = document.getElementsByClassName('suggestions');
    Array.from(suggestions).forEach(suggestion => {
        if (!suggestion.contains(event.target)) {
            suggestion.style.display = 'none';
        }
    });
});


// Función para alternar la visibilidad del chat
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('active');
}

// Función para enviar mensajes
function sendMessage(isPredefined = false, predefinedKey = '') {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const userMessageText = isPredefined ? predefinedKey : input.value;

    if (userMessageText.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.style.textAlign = 'right';
    userMessage.style.margin = '10px';
    userMessage.innerHTML = `<span style="background: #ff7b25; color: white; padding: 8px 12px; border-radius: 20px; display: inline-block;">${userMessageText}</span>`;
    messagesContainer.appendChild(userMessage);

    // Simular respuesta del bot
    setTimeout(() => {
        const botResponse = isPredefined ? preguntasFrecuentes[predefinedKey] : procesarPregunta(userMessageText);
        const botMessage = document.createElement('div');
        botMessage.style.margin = '10px';
        botMessage.innerHTML = `<span style="background: #f1f1f1; padding: 8px 12px; border-radius: 20px; display: inline-block;">${botResponse}</span>`;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);

    if (!isPredefined) input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Respuestas predefinidas para el asistente virtual
const preguntasFrecuentes = {
    'horarios': ['Nuestros servicios operan las 24 horas del día.', 'Estamos disponibles a cualquier hora.'],
    'precios': ['Los precios varían según el destino y la temporada.', 'Puedes consultar nuestros precios actualizados en el sitio web.'],
    'equipaje': ['Se permite una maleta de mano y una maleta documentada por pasajero.', 'Cada pasajero puede llevar una maleta documentada y una de mano.'],
    'documentos': ['Es necesario presentar una identificación oficial vigente.', 'Recuerda llevar un documento de identidad válido.'],
    'cancelaciones': ['Las cancelaciones deben realizarse con 24 horas de anticipación.', 'Para cancelar, por favor contáctanos con al menos 24 horas de antelación.'],
    'pagos': ['Aceptamos tarjetas de crédito, débito y pagos electrónicos.', 'Puedes pagar con varios métodos, incluyendo tarjetas y transferencias.'],
    'contacto': ['Puedes contactarnos a través de nuestro correo soporte@ejemplo.com o al teléfono +123456789.', 'Estamos disponibles en soporte@ejemplo.com para cualquier consulta.']
};

// Procesa la pregunta manual (si el usuario escribe una pregunta en lugar de seleccionar una predefinida)
function procesarPregunta(texto) {
    texto = texto.toLowerCase();

    const keywords = [
        { key: 'horarios', regex: /horarios|operación|horario de atención/ },
        { key: 'precios', regex: /precio|tarifa|cuánto cuesta/ },
        { key: 'equipaje', regex: /equipaje|maleta|baggage/ },
        { key: 'documentos', regex: /documento|identificación|ID/ },
        { key: 'cancelaciones', regex: /cancelación|cancelar|anular/ },
        { key: 'pagos', regex: /pago|pagar|tarjeta/ },
        { key: 'contacto', regex: /contacto|correo|teléfono|atención al cliente/ },
    ];

    for (const keyword of keywords) {
        if (keyword.regex.test(texto)) {
            const randomResponse = preguntasFrecuentes[keyword.key][Math.floor(Math.random() * preguntasFrecuentes[keyword.key].length)];
            return randomResponse;
        }
    }

    return 'Lo siento, no tengo información sobre eso. Por favor, intenta otra pregunta.';
}


function mostrarResultados(transportType) {
    let viajes = viajesPorTransporte[transportType] || [];
    let listaResultados = document.getElementById('resultadosBusqueda');
    listaResultados.innerHTML = ''; // Limpiar resultados previos

    viajes.forEach(viaje => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-viaje');
        tarjeta.innerHTML = `
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin: 10px; background-color: white;">
                <h4>Origen ➔ Destino</h4>
                <p>Hora de salida: ${viaje.hora}</p>
                <p>Duración: ${viaje.duracion}</p>
                <p>Tipo de asiento: ${viaje.tipoAsiento}</p>
                <p>Precio: ${viaje.precio}</p>
                <button onclick="comprarViaje('${viaje.titulo}')" style="background-color: orange; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Comprar</button>
            </div>
        `;
        listaResultados.appendChild(tarjeta);
    });

    
    listaResultados.style.display = 'flex';
    listaResultados.style.flexDirection = 'row';
    listaResultados.style.justifyContent = 'space-around';
}

function generateOptions(transportType) {
    mostrarResultados(transportType);
}
function comprarViaje(tituloViaje) {
    alert(`Has seleccionado el ${tituloViaje}. Procede con la selección de asiento.`);
}

    const viajesPorTransporte = {
        'bus': [
            { titulo: "Viaje en Bus 1", hora: "08:00 AM", duracion: "3 horas", tipoAsiento: "Reclinable", precio: "$20.000" },
            { titulo: "Viaje en Bus 2", hora: "01:00 PM", duracion: "3.5 horas", tipoAsiento: "Normal", precio: "$15.000" },
            { titulo: "Viaje en Bus 3", hora: "03:00 PM", duracion: "3.5 horas", tipoAsiento: "Normal", precio: "$15.000" }
        ],
        'tren': [
            { titulo: "Viaje en Tren 1", hora: "09:00 AM", duracion: "2.5 horas", tipoAsiento: "Primera Clase", precio: "$30.000" },
            { titulo: "Viaje en Tren 2", hora: "06:00 PM", duracion: "2 horas", tipoAsiento: "Económico", precio: "$20.000" },
            { titulo: "Viaje en Tren 3", hora: "07:00 PM", duracion: "2 horas", tipoAsiento: "Económico", precio: "$20.000" }
        ],
        'metro': [
            { titulo: "Viaje en Metro 1", hora: "07:30 AM", duracion: "45 minutos", tipoAsiento: "Normal", precio: "$5.000" },
            { titulo: "Viaje en Metro 2", hora: "05:00 PM", duracion: "50 minutos", tipoAsiento: "Normal", precio: "$5.000" },
            { titulo: "Viaje en Metro 3", hora: "06:00 PM", duracion: "50 minutos", tipoAsiento: "Normal", precio: "$5.000" }
        ],
        'van': [
            { titulo: "Viaje en Van 1", hora: "10:00 AM", duracion: "1.5 horas", tipoAsiento: "Comodidad", precio: "$25.000" },
            { titulo: "Viaje en Van 2", hora: "03:00 PM", duracion: "1.75 horas", tipoAsiento: "Normal", precio: "$20.000" },
            { titulo: "Viaje en Van 3", hora: "04:00 PM", duracion: "1.75 horas", tipoAsiento: "Normal", precio: "$20.000" }
        ],
        'auto': [
            { titulo: "Viaje en Auto 1", hora: "07:00 AM", duracion: "1 hora", tipoAsiento: "VIP", precio: "$50.000" },
            { titulo: "Viaje en Auto 2", hora: "02:00 PM", duracion: "1.25 horas", tipoAsiento: "Normal", precio: "$40.000" },
            { titulo: "Viaje en Auto 3", hora: "03:00 PM", duracion: "1.25 horas", tipoAsiento: "Normal", precio: "$40.000" }
        ]
    };
    // Función para actualizar los placeholders de origen y destino
function actualizarTransporte(transporte) {
    const origenInput = document.getElementById("origen");
    const destinoInput = document.getElementById("destino");

    if (transporte === "bus") {
        origenInput.placeholder = "Ciudad de origen (Bus)";
        destinoInput.placeholder = "Ciudad de destino (Bus)";
    } else if (transporte === "tren") {
        origenInput.placeholder = "Estación de origen (Tren)";
        destinoInput.placeholder = "Estación de destino (Tren)";
    } else if (transporte === "metro") {
        origenInput.placeholder = "Estación de origen (Metro)";
        destinoInput.placeholder = "Estación de destino (Metro)";
    } else if (transporte === "ticket") {
        origenInput.placeholder = "Ciudad de origen (Ticket)";
        destinoInput.placeholder = "Ciudad de destino (Ticket)";
    } else if (transporte === "van") {
        origenInput.placeholder = "Ciudad de origen (Van)";
        destinoInput.placeholder = "Ciudad de destino (Van)";
    } else if (transporte === "auto") {
        origenInput.placeholder = "Ciudad de origen (Auto)";
        destinoInput.placeholder = "Ciudad de destino (Auto)";
    }

    // Actualizar visualmente el botón activo
    document.querySelectorAll('.transport-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    document.querySelector(`.transport-icon[data-transport="${transporte}"]`).classList.add('active');
    
    //mostrarResultados(viajesPorTransporte[transporte]);
}

// Agregar event listeners para los íconos de transporte
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.transport-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const transporte = this.getAttribute('data-transport');
            actualizarTransporte(transporte);
        });
    });
});

