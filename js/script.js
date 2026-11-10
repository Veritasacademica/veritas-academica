// Veritas Académica V2.0.0

const WHATSAPP_BASE = 'https://wa.me/50237653725';
const WHATSAPP_MESSAGE = 'Hola, quisiera solicitar información sobre sus servicios de asesoría académica.';
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function whatsappUrl(message = WHATSAPP_MESSAGE) {
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

// Todos los enlaces de WhatsApp llevan un mensaje inicial y se abren en otra pestaña.
function configurarEnlacesWhatsApp() {
    document.querySelectorAll('a[href*="wa.me/50237653725"]').forEach(link => {
        const current = link.getAttribute('href') || '';
        if (!current.includes('?text=')) link.setAttribute('href', whatsappUrl());
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Menú del móvil
function configurarMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    if (!menuBtn || !nav) return;
    const icono = menuBtn.querySelector('use');

    const cerrar = () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Abrir menú');
        if (icono) icono.setAttribute('href', 'img/iconos.svg#menu');
    };

    menuBtn.addEventListener('click', () => {
        const abierto = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(abierto));
        menuBtn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
        if (icono) icono.setAttribute('href', abierto ? 'img/iconos.svg#cerrar' : 'img/iconos.svg#menu');
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
    document.addEventListener('click', e => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) cerrar();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
}

// Cabecera más compacta al bajar, botón «volver arriba» y fondos con efecto de profundidad
function configurarDesplazamiento() {
    const cabecera = document.querySelector('.header');
    const topButton = document.getElementById('topButton');
    const fondos = movimientoReducido ? [] : [...document.querySelectorAll('[data-parallax]')];
    let pendiente = false;

    const actualizar = () => {
        pendiente = false;
        const y = window.scrollY;
        if (cabecera) cabecera.classList.toggle('compacta', y > 40);
        if (topButton) topButton.classList.toggle('show', y > 600);
        if (window.innerWidth > 980) {
            const alto = window.innerHeight;
            fondos.forEach(f => {
                const caja = f.parentElement.getBoundingClientRect();
                if (caja.bottom < 0 || caja.top > alto) return;
                const avance = (caja.top + caja.height / 2 - alto / 2) / alto;
                f.style.transform = `translate3d(0, ${(avance * -60).toFixed(1)}px, 0)`;
            });
        }
    };

    window.addEventListener('scroll', () => {
        if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
    }, { passive: true });
    actualizar();

    if (topButton) {
        topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: movimientoReducido ? 'auto' : 'smooth' }));
    }
}

// Los bloques aparecen suavemente al llegar a ellos.
// Todo lo que ya está a la vista o por encima se muestra, aunque se baje muy rápido.
function configurarApariciones() {
    let pendientes = [...document.querySelectorAll('.reveal, .timeline')];
    if (movimientoReducido) {
        pendientes.forEach(el => el.classList.add('visible'));
        return;
    }
    let programado = false;
    const revisar = () => {
        programado = false;
        const limite = window.innerHeight * 0.92;
        pendientes = pendientes.filter(el => {
            if (el.getBoundingClientRect().top < limite) { el.classList.add('visible'); return false; }
            return true;
        });
        if (!pendientes.length) {
            window.removeEventListener('scroll', alDesplazar);
            window.removeEventListener('resize', alDesplazar);
        }
    };
    const alDesplazar = () => { if (!programado) { programado = true; requestAnimationFrame(revisar); } };
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('resize', alDesplazar);
    revisar();
    window.addEventListener('load', revisar);
}

configurarEnlacesWhatsApp();
configurarMenu();
configurarDesplazamiento();
configurarApariciones();

// ---------- Formulario de contacto ----------
function obtenerValor(id) {
    return document.getElementById(id)?.value.trim() || '';
}

function enviarWhatsApp() {
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
    const procedencia = obtenerValor('procedencia');
    const aviso = document.getElementById('formMensaje');

    const faltan = [['nombre', nombre], ['telefono', telefono], ['mensaje', mensajeUsuario]].filter(([, v]) => !v);
    ['nombre', 'telefono', 'mensaje'].forEach(id => document.getElementById(id)?.classList.remove('error'));

    if (faltan.length) {
        faltan.forEach(([id]) => document.getElementById(id)?.classList.add('error'));
        if (aviso) {
            aviso.textContent = 'Por favor completa tu nombre, WhatsApp y mensaje antes de enviar.';
            aviso.classList.add('visible');
        }
        document.getElementById(faltan[0][0])?.focus();
        return;
    }
    if (aviso) aviso.classList.remove('visible');

    const texto = `Vengo de la página web.\nHola Veritas Académica, deseo solicitar una asesoría.\n\nNombre: ${nombre}\nWhatsApp del cliente: ${telefono}\nCorreo: ${correo || 'No indicado'}\nUniversidad / institución: ${universidad || 'No indicada'}\nCarrera / área: ${carrera || 'No indicada'}\nNivel académico: ${nivel || 'No indicado'}\nTipo de proyecto: ${tipoProyecto || 'No indicado'}\nEstado actual del trabajo: ${estadoTrabajo || 'No indicado'}\nFecha aproximada de entrega: ${fechaEntrega || 'No indicada'}\nNos conoció por: ${procedencia || 'No indicado'}\n\nMensaje:\n${mensajeUsuario}`;

    window.open(whatsappUrl(texto), '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.formulario input, .formulario textarea').forEach(campo => {
    campo.addEventListener('input', () => campo.classList.remove('error'));
});
