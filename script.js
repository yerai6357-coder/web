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
