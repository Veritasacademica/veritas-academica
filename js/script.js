// Veritas Académica V1.1.0

const WHATSAPP_BASE = 'https://wa.me/50237653725';
const WHATSAPP_MESSAGE = 'Hola, quisiera solicitar información sobre sus servicios de asesoría académica.';

function whatsappUrl(message = WHATSAPP_MESSAGE) {
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

function configurarEnlacesWhatsApp() {
    document.querySelectorAll('a[href*="wa.me/50237653725"]').forEach(link => {
        const current = link.getAttribute('href') || '';
        if (!current.includes('?text=')) {
            link.setAttribute('href', whatsappUrl());
        }
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

function agregarMetaSocial() {
    const metas = [
        ['og:type', 'website'],
        ['og:site_name', 'Veritas Académica'],
        ['og:title', 'Veritas Académica | Acompañamiento académico profesional'],
        ['og:description', 'Asesoría, corrección académica, metodología y acompañamiento con criterio humano, citación rigurosa y adaptación a lineamientos universitarios.'],
        ['og:image', new URL('img/hero.png', window.location.href).href],
        ['twitter:card', 'summary_large_image'],
        ['twitter:title', 'Veritas Académica | Acompañamiento académico profesional'],
        ['twitter:description', 'Asesoría y corrección académica con criterio humano y enfoque ético.']
    ];

    metas.forEach(([property, content]) => {
        if (!document.head.querySelector(`meta[property="${property}"], meta[name="${property}"]`)) {
            const meta = document.createElement('meta');
            meta.setAttribute(property.startsWith('twitter:') ? 'name' : 'property', property);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        }
    });
}

function actualizarContenidoAcademico() {
    document.querySelectorAll('.card, .paquete').forEach(card => {
        const heading = card.querySelector('h3')?.textContent.trim().toLowerCase();
        const paragraph = card.querySelector('p');
        if (!paragraph || !heading) return;

        if (heading === 'corrección profesional' || heading === 'corrección de estilo') {
            paragraph.textContent = 'Depuración de textos, parafraseo académico, revisión de sintaxis y coherencia, con citación rigurosa y redacción humana personalizada. El objetivo es preparar un documento estructurado y ético para su revisión institucional, sin prometer certificados ni reportes externos.';
        }

        if (heading === 'normas académicas' || heading === 'normas apa 7') {
            paragraph.textContent = 'Aplicación cuidadosa de APA 7, Vancouver, Chicago y otros formatos, con revisión de citas y referencias. Adaptamos el trabajo a las guías y normativos que correspondan, incluidos lineamientos de USAC, UMG, URL, UVG, UFM u otra institución que el cliente proporcione.';
        }
    });
}

function agregarOrientacionTemprana() {
    const hero = document.querySelector('.hero');
    if (!hero || document.querySelector('[data-orientacion-temprana]')) return;

    const bloque = document.createElement('div');
    bloque.setAttribute('data-orientacion-temprana', 'true');
    bloque.className = 'orientacion-temprana';
    bloque.innerHTML = `
        <strong>¿No sabes por dónde empezar?</strong>
        <span>Solicita una orientación inicial gratuita y conoce el siguiente paso para tu proyecto.</span>
        <a class="btn-secondary" href="${whatsappUrl('Hola, quisiera solicitar una orientación inicial gratuita para mi proyecto académico.')}">Orientación inicial gratuita</a>
    `;
    hero.insertAdjacentElement('afterend', bloque);
}

function agregarAvisoDeCotizacion() {
    document.querySelectorAll('.grid-paquetes').forEach(grid => {
        if (grid.nextElementSibling?.matches('[data-cotizacion-aviso]')) return;
        const aviso = document.createElement('p');
        aviso.setAttribute('data-cotizacion-aviso', 'true');
        aviso.className = 'aviso-cotizacion';
        aviso.textContent = 'Los valores se cotizan a la medida según el volumen del documento, nivel académico, alcance, urgencia y estado actual del proyecto. Escríbenos para revisar tu caso.';
        grid.insertAdjacentElement('afterend', aviso);
    });
}

function agregarSeccionTransparencia() {
    if (!document.querySelector('.grid-servicios') || document.querySelector('[data-transparencia]')) return;
    const seccion = document.createElement('section');
    seccion.className = 'seccion seccion-clara';
    seccion.setAttribute('data-transparencia', 'true');
    seccion.innerHTML = `
        <div class="titulo-seccion">
            <span>Compromiso académico</span>
            <h2>Criterio humano y trabajo ético</h2>
            <p>Revisamos cada documento con criterio crítico y redacción humana personalizada. La inteligencia artificial puede ser una herramienta auxiliar, pero no sustituye la revisión, la responsabilidad del autor ni los lineamientos de la institución.</p>
        </div>
    `;
    const paquetes = document.querySelector('#paquetes') || document.querySelector('.grid-paquetes')?.closest('section');
    if (paquetes) paquetes.insertAdjacentElement('beforebegin', seccion);
}

if (typeof document !== 'undefined') {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
    }

    const topButton = document.getElementById('topButton');
    window.addEventListener('scroll', () => {
        if (topButton) topButton.classList.toggle('show', window.scrollY > 500);
    });

    if (topButton) {
        topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.12 });
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    configurarEnlacesWhatsApp();
    agregarMetaSocial();
    actualizarContenidoAcademico();
    agregarOrientacionTemprana();
    agregarAvisoDeCotizacion();
    agregarSeccionTransparencia();
}

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

    if (!nombre || !telefono || !mensajeUsuario) {
        alert('Por favor completa tu nombre, WhatsApp y mensaje antes de enviar.');
        return;
    }

    const texto = `Hola Veritas Académica, deseo solicitar una asesoría.\n\nNombre: ${nombre}\nWhatsApp del cliente: ${telefono}\nCorreo: ${correo || 'No indicado'}\nUniversidad / institución: ${universidad || 'No indicada'}\nCarrera / área: ${carrera || 'No indicada'}\nNivel académico: ${nivel || 'No indicado'}\nTipo de proyecto: ${tipoProyecto || 'No indicado'}\nEstado actual del trabajo: ${estadoTrabajo || 'No indicado'}\nFecha aproximada de entrega: ${fechaEntrega || 'No indicada'}\n\nMensaje:\n${mensajeUsuario}`;

    window.open(whatsappUrl(texto), '_blank', 'noopener,noreferrer');
}
