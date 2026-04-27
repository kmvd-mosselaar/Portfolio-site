// ============================================
// NAVEGAÇÃO MOBILE
// ============================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle menu mobile
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// ============================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observar todos os elementos com data-aos
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Esconder/mostrar navbar ao scrollar (opcional)
    // Descomente se quiser esse efeito
    /*
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    */

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL
// ============================================
// ============================================
// SMOOTH SCROLL (REMOVED: Using CSS scroll-behavior)
// ============================================
// document.querySelectorAll('a[href^="#"]').forEach(anchor => { ... });
// Keeping it simple so CSS scroll-margin-top works correctly.

// ============================================
// ANIMAÇÃO DE TEXTO - TYPEWRITER
// ============================================
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const originalText = subtitle.textContent;
    subtitle.textContent = '';

    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // Iniciar animação após um delay
    setTimeout(typeWriter, 1000);
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';

            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);

            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// CLIPBOARD COPY — EMAIL & TELEFONE
// ============================================
document.querySelectorAll('.copy-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = link.dataset.copy;
        const label = link.dataset.label || 'Texto';

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification(`✅ ${label} copiado para a área de transferência!`, 'success');
            }).catch(() => {
                fallbackCopy(textToCopy, label);
            });
        } else {
            fallbackCopy(textToCopy, label);
        }
    });
});

function fallbackCopy(text, label) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        document.execCommand('copy');
        showNotification(`✅ ${label} copiado para a área de transferência!`, 'success');
    } catch {
        showNotification(`Copie manualmente: ${text}`, 'error');
    }
    document.body.removeChild(ta);
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos inline
    const bgColor = type === 'success'
        ? 'rgba(66,64,50,0.95)'   /* olive dark */
        : 'rgba(133,39,54,0.95)'; /* antique ruby */
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: #F5EFE6;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 320px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.35);
        border-left: 4px solid ${type === 'success' ? '#eecacc' : '#dcb3b5'};
    `;

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Adicionar animações de notificação ao CSS dinamicamente
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// CURSOR CUSTOMIZADO (Opcional)
// ============================================
const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 245, 238, 0.8); /* Pearly/Light Pink */
        box-shadow: 0 0 15px rgba(255, 193, 253, 0.8), 0 0 30px rgba(255, 255, 255, 0.5); /* Glow Effect */
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s;
        transform: translate(-50%, -50%);
        mix-blend-mode: normal; /* Removed difference mode */
    `;

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efeito ao hover em links e botões
    const interactiveElements = document.querySelectorAll('a, button, .btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
};

// Ativar cursor customizado apenas em desktop
if (window.innerWidth > 968) {
    createCursor();
}

// ============================================
// ANIMAÇÃO DE LOADING
// ============================================
window.addEventListener('load', () => {
    // Fade in do body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Mark active nav link after layout is fully computed
    updateActiveNavLink();
});

// ============================================
// ACTIVE LINK NA NAVEGAÇÃO
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    let activeSectionId = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            activeSectionId = section.getAttribute('id');
        }
    });

    // If nothing matched (e.g. at very top), fallback to first section
    if (!activeSectionId) {
        activeSectionId = sections[0] ? sections[0].getAttribute('id') : null;
    }

    navLinksItems.forEach(link => link.classList.remove('active'));
    if (activeSectionId) {
        const navLink = document.querySelector(`.nav-links a[href="#${activeSectionId}"]`);
        if (navLink) navLink.classList.add('active');
    }
}

window.addEventListener('scroll', updateActiveNavLink);

// Adicionar estilo para link ativo
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-links a.active::before {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyle);

// ============================================
// CONTADOR DE ANIMAÇÃO PARA NÚMEROS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '%';
        }
    }, 16);
}

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Efeito de confete ou algo divertido
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎉 Easter Egg Ativado! Você encontrou o código secreto!', 'success');

    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Adicionar animação rainbow
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ============================================
// PERFORMANCE - LAZY LOADING PARA IMAGENS
// ============================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// PASTAS DE PROJETO — ALTERNÂNCIA INTERATIVA (FIXED)
// ============================================
(function () {
    const folders = document.querySelectorAll('.project-folder');
    const tabsRow = document.querySelectorAll('.project-tabs-row');   // correct class

    // Activate a folder by its data-project number
    function activateProject(projectNum) {
        // Update folders
        folders.forEach(f => f.classList.remove('active'));
        const target = document.querySelector(`.project-folder[data-project="${projectNum}"]`);
        if (target) target.classList.add('active');

        // Update tab highlight
        tabsRow.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.project-tabs-row[data-project="${projectNum}"]`);
        if (activeTab) activeTab.classList.add('active');
    }

    // Wire up each row-tab
    tabsRow.forEach(tab => {
        tab.setAttribute('tabindex', '0');   // keyboard-accessible
        tab.setAttribute('role', 'tab');

        tab.addEventListener('click', () => {
            activateProject(tab.dataset.project);
        });

        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateProject(tab.dataset.project);
            }
        });
    });

    // Show project 1 by default
    activateProject('1');
})();

// ============================================
// INFINITE NESTED ELLIPSE ANIMATION (COLOR SWAP)
// ============================================
const canvas = document.getElementById('fluid-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    // Configurações
    const config = {
        barCount: 12,
        color1: '#424032',   // Olive Dark (Background)
        color2: '#eecacc',   // Pink Lace (Logo Color)
        speed: 2.5,          // Growth Speed
        spawnThreshold: 200  // Create new ellipse when previous radius > this
    };

    //Array to store active ellipses (radius and pattern type)
    let ellipses = [{ r: 0, type: 0 }]; // Start with type 0
    let typeCounter = 1; // Next type will be 1

    function resize() {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    }

    // Helper: Desenha fundo e barras com cores especificadas
    function drawPattern(bgColor, barColor) {
        // Fill Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Draw Bars
        const barWidth = width / config.barCount;
        ctx.fillStyle = barColor; // Bar Color

        for (let i = 0; i < config.barCount; i++) {
            if (i % 2 === 0) {
                ctx.fillRect(i * barWidth, 0, barWidth, height);
            }
        }
    }

    function draw() {
        // Update Ellipses
        for (let i = 0; i < ellipses.length; i++) {
            ellipses[i].r += config.speed;
        }

        // Spawn new ellipse if the smallest one is big enough
        const lastEllipse = ellipses[ellipses.length - 1];
        if (lastEllipse.r > config.spawnThreshold) {
            ellipses.push({ r: 0, type: typeCounter % 2 });
            typeCounter++;
        }

        // Remove ellipses that are too huge
        const maxDiag = Math.sqrt(width * width + height * height);
        if (ellipses[0].r > maxDiag * 1.5) {
            ellipses.shift();
        }

        // DRAWING ============================

        // 1. Draw Base Layer (Pattern A initially / Default)
        // Actually, the base layer should be "what's underneath the largest ellipse?"
        // If the largest ellipse is Type 1, it sits on top of Type 0 (the universe).
        // If the largest ellipse is Type 0, it sits on top of Type 1.
        // Wait, simpler: Always draw Pattern A as base.
        // Then stack ellipses.
        // If ellipses[0] is Type 1, it will draw Pattern B. Correct.
        // If ellipses[0] is Type 0, it will draw Pattern A. (Redundant but correct - Pattern A on Pattern A).
        // Optimization: We could skip drawing Pattern A on Pattern A, but clip is cheap enough.

        drawPattern(config.color1, config.color2); // Base: Pattern A (Olive BG)

        // 2. Draw Nested Ellipses
        for (let i = 0; i < ellipses.length; i++) {
            const e = ellipses[i];

            ctx.save();

            ctx.beginPath();
            ctx.ellipse(0, height / 2, e.r, e.r, 0, 0, Math.PI * 2);
            ctx.clip();

            // Determine Pattern based on persistent type
            // Type 0: Pattern A (Olive BG)
            // Type 1: Pattern B (Pink BG)

            if (e.type === 1) {
                // Inverted: Pink BG, Olive Bars
                drawPattern(config.color2, config.color1);
            } else {
                // Normal: Olive BG, Pink Bars
                drawPattern(config.color1, config.color2);
            }

            ctx.restore();
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    resize();
    draw();
}