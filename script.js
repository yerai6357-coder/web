document.getElementById('btnInstalar').addEventListener('click', function() {
  
  
  const urlDescarga = `https://drive.google.com/drive/folders/17FOy58XzodQpgjmjoDSfENX5v9AhUE1r?usp=sharing`;
  
  const enlaceFantasma = document.createElement('a');
  enlaceFantasma.href = urlDescarga;
  enlaceFantasma.setAttribute('download', '');
  
  document.body.appendChild(enlaceFantasma);
  enlaceFantasma.click();
  document.body.removeChild(enlaceFantasma);
});


/* ============================= */
/* 🔥 ANIMACIÓN SCROLL */
/* ============================= */
const elementos = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

elementos.forEach(el => observer.observe(el));


/* ============================= */
/* 💎 EFECTO CLICK TARJETAS */
/* ============================= */
const cards = document.querySelectorAll(".site-entry");

cards.forEach(card => {

    card.addEventListener("mousedown", () => {
        card.style.transform = "scale(0.96)";
    });

    card.addEventListener("mouseup", () => {
        card.style.transform = "";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});


/* ============================= */
/* 🌫️ NAVBAR SCROLL */
/* ============================= */
window.addEventListener("scroll", () => {

    const nav = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    } else {
        nav.style.boxShadow = "none";
    }

});


/* ============================= */
/* 🎯 SCROLL INDICATOR CLICK */
/* ============================= */
const indicador = document.querySelector(".scroll-indicator");

if (indicador) {
    indicador.addEventListener("click", () => {
        document.getElementById("sitios").scrollIntoView({
            behavior: "smooth"
        });
    });
}
document.getElementById('formReporte').addEventListener('submit', function(event) {
    // Evita que la página intente recargarse sola
    event.preventDefault();

    // Captura los valores reales que el usuario puso
    const correoDestino = "atencion.al.cliente.juegos@gmail.com";
    const sistemaOperativo = document.getElementById('Sistema_Operativo').value;
    const descripcionError = document.getElementById('Descripcion_del_Error').value;

    // Crea el Asunto dinámico y el Cuerpo del mensaje ordenado
    const asunto = `Reporte de Fallo - Schedule 1 (${sistemaOperativo})`;
    const cuerpoMensaje = `Sistema Operativo: ${sistemaOperativo}\n\nDescripción del Error:\n${descripcionError}`;

    // Codifica los textos para que la URL del navegador los entienda sin romperse
    const asuntoCodificado = encodeURIComponent(asunto);
    const cuerpoCodificado = encodeURIComponent(cuerpoMensaje);

    // Genera el enlace directo a la interfaz web de Gmail
    const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${correoDestino}&su=${asuntoCodificado}&body=${cuerpoCodificado}`;

    // Abre Gmail en una nueva pestaña listo para enviar
    window.open(urlGmail, '_blank');
});





document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('formReporte');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            // Evita que la página intente recargarse sola con el "?"
            event.preventDefault();

            const correoDestino = "atencion.al.cliente.juegos@gmail.com";
            const sistemaOperativo = document.getElementById('Sistema_Operativo').value;
            const descripcionError = document.getElementById('Descripcion_del_Error').value;

            // Arma los textos de forma dinámica
            const asunto = `Reporte de Fallo - Juegos (${sistemaOperativo})`;
            const cuerpoMensaje = `Sistema Operativo: ${sistemaOperativo}\n\nDescripción del Error o Problema:\n${descripcionError}`;

            const asuntoCodificado = encodeURIComponent(asunto);
            const cuerpoCodificado = encodeURIComponent(cuerpoMensaje);

            // Abre Gmail web en una pestaña nueva con todo listo
            const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${correoDestino}&su=${asuntoCodificado}&body=${cuerpoCodificado}`;
            window.open(urlGmail, '_blank');
        });
    }
});




// ---- LÓGICA DEL FORMULARIO DE SOPORTE CORREGIDA ----
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('formReporte');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            // Evita que la página haga cosas raras o se recargue con un "?"
            event.preventDefault();

            const correoDestino = "atencion.al.cliente.juegos@gmail.com";
            
            // CAPTURA DINÁMICA: Recogemos exactamente lo que el usuario ha seleccionado
            const juegoSeleccionado = document.getElementById('Juego_Fallo').value;
            const sistemaOperativo = document.getElementById('Sistema_Operativo').value;
            const descripcionError = document.getElementById('Descripcion_del_Error').value;

            // SOLUCIÓN AL FALLO: Construimos el asunto con las variables reales
            const asunto = `Reporte de Fallo - ${juegoSeleccionado} (${sistemaOperativo})`;
            const cuerpoMensaje = `Juego afectado: ${juegoSeleccionado}\nSistema Operativo: ${sistemaOperativo}\n\nDescripción del Error:\n${descripcionError}`;

            // Codificamos correctamente para que Gmail entienda los espacios y saltos de línea
            const asuntoCodificado = encodeURIComponent(asunto);
            const cuerpoCodificado = encodeURIComponent(cuerpoMensaje);

            // Generamos la URL limpia para abrir en Gmail
            const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${correoDestino}&su=${asuntoCodificado}&body=${cuerpoCodificado}`;
            
            // Abre la pestaña de redacción de Gmail
            window.open(urlGmail, '_blank');
        });
    }
});