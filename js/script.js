// Veritas Académica V1.0.4

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

const topButton = document.getElementById('topButton');

window.addEventListener('scroll', () => {
    if (topButton) {
        topButton.classList.toggle('show', window.scrollY > 500);
    }
});

if (topButton) {
    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

function obtenerValor(id){
    return document.getElementById(id)?.value.trim() || '';
}

function enviarWhatsApp(){
    const nombre = obtenerValor('nombre');
    const telefono = obtenerValor('telefono');
    const correo = obtenerValor('correo');
    const universidad = obtenerValor('universidad');
    const carrera = obtenerValor('carrera');
    const nivel = obtenerValor('nivel');
    const tipoProyecto = obtenerValor('tipoProyecto');
    const estadoTrabajo = obtenerValor('estadoTrabajo');
    const fechaEntrega = obtenerValor('fechaEntrega');
    const mensajeUsuario = obtenerValor('mensaje');

    if (!nombre || !telefono || !mensajeUsuario) {
        alert('Por favor completa tu nombre, WhatsApp y mensaje antes de enviar.');
        return;
    }

    const texto = `Hola Veritas Académica, deseo solicitar una asesoría.

Nombre: ${nombre}
WhatsApp del cliente: ${telefono}
Correo: ${correo || 'No indicado'}
Universidad / institución: ${universidad || 'No indicada'}
Carrera / área: ${carrera || 'No indicada'}
Nivel académico: ${nivel || 'No indicado'}
Tipo de proyecto: ${tipoProyecto || 'No indicado'}
Estado actual del trabajo: ${estadoTrabajo || 'No indicado'}
Fecha aproximada de entrega: ${fechaEntrega || 'No indicada'}

Mensaje:
${mensajeUsuario}`;

    const mensaje = encodeURIComponent(texto);
    window.open(`https://wa.me/50254837668?text=${mensaje}`, '_blank');
}
