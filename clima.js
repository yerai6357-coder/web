/* ============================= */
/* 🌤️ ICONO CLIMA */
/* ============================= */
function obtenerIcono(temp) {
    if (temp > 30) return "🔥";
    if (temp > 20) return "☀️";
    if (temp > 10) return "⛅";
    return "🌧️";
}


/* ============================= */
/* 🌍 VARIABLES */
/* ============================= */
let datosGlobales = null;


/* ============================= */
/* 🔄 CARGAR DATOS */
/* ============================= */
async function actualizarDatos() {

    const url = "https://api.open-meteo.com/v1/forecast?latitude=40.88&longitude=0.80&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=auto";

    try {

        const respuesta = await fetch(url);

        if (!respuesta.ok) throw new Error("Error API");

        const datos = await respuesta.json();

        datosGlobales = datos;

        crearPronostico(datos);
        mostrarDia(0);

        document.getElementById("cargando").style.display = "none";
        document.getElementById("contenido-clima").style.display = "block";

    } catch (error) {

        console.error("ERROR:", error);
        document.getElementById("cargando").innerText = "❌ Error al cargar datos";

    }

}


/* ============================= */
/* 📅 PRONÓSTICO */
/* ============================= */
function crearPronostico(datos) {

    let html = "<h3>7 días</h3><div class='pronostico-grid'>";

    const dias = datos.daily.time;
    const max = datos.daily.temperature_2m_max;
    const min = datos.daily.temperature_2m_min;

    const diasSemana = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

    for (let i = 0; i < 7; i++) {

        const fecha = new Date(dias[i]);
        const nombre = diasSemana[fecha.getDay()];

        html += `
        <div class="card-dia" data-index="${i}">
            <p>${nombre}</p>
            <p>${Math.round(max[i])}°</p>
            <p>${Math.round(min[i])}°</p>
        </div>
        `;
    }

    html += "</div>";

    document.getElementById("pronostico").innerHTML = html;

    /* CLICK TARJETAS (MEJORADO) */
    document.querySelectorAll(".card-dia").forEach(card => {

        card.addEventListener("click", () => {
            const index = card.getAttribute("data-index");
            mostrarDia(index, card);
        });

    });

}


/* ============================= */
/* 🔁 CAMBIAR DÍA */
/* ============================= */
function mostrarDia(i, el) {

    if (!datosGlobales) return;

    const datos = datosGlobales;

    const dias = datos.daily.time;
    const max = datos.daily.temperature_2m_max;
    const viento = datos.daily.windspeed_10m_max;

    const fecha = new Date(dias[i]);
    const diasSemana = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

    /* TEXTO */
    document.querySelector(".ciudad").innerText =
        "L'Ametlla de Mar - " + diasSemana[fecha.getDay()];

    document.getElementById("valor-temp").innerText = Math.round(max[i]) + "°C";
    document.getElementById("valor-viento").innerText = Math.round(viento[i]) + " km/h";
    document.getElementById("valor-sensacion").innerText = Math.round(max[i]) + "°C";

    /* ICONO (SI EXISTE) */
    const icono = document.getElementById("icono-clima");
    if (icono) {
        icono.innerText = obtenerIcono(max[i]);
    }

    /* ANIMACIÓN TEMP */
    const tempEl = document.getElementById("valor-temp");

    if (tempEl) {
        tempEl.classList.add("animate");

        setTimeout(() => {
            tempEl.classList.remove("animate");
        }, 300);
    }

    /* ACTIVE */
    document.querySelectorAll(".card-dia").forEach(c => c.classList.remove("active"));
    if (el) el.classList.add("active");

}


/* ============================= */
/* 🚀 INICIO */
/* ============================= */
window.addEventListener("DOMContentLoaded", () => {

    actualizarDatos();

    /* BOTÓN HOY (SEGURO) */
    const btnHoy = document.getElementById("btn-hoy");

    if (btnHoy) {
        btnHoy.addEventListener("click", () => {
            mostrarDia(0);
        });
    }

});