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

    // Adicionar sombra ao navbar quando scrollar
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 184, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'none';
    }

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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

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
// FORMULÁRIO DE CONTATO
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validação simples
        if (name && email && message) {
            // Criar link mailto
            const subject = `Contato de ${name}`;
            const body = `Nome: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMensagem:%0D%0A${message}`;
            const mailtoLink = `mailto:katherine.mosselaar@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Abrir cliente de email
            window.location.href = mailtoLink;

            // Feedback visual
            showNotification('Mensagem enviada! Seu cliente de email foi aberto.', 'success');

            // Limpar formulário
            contactForm.reset();
        } else {
            showNotification('Por favor, preencha todos os campos.', 'error');
        }
    });
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
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#FFB800' : '#FF6B35'};
        color: #0A0A0A;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(255, 184, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
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
        border: 2px solid #FFB800;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: 0.1s;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
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
            cursor.style.borderColor = '#FF6B35';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#FFB800';
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
});

// ============================================
// ACTIVE LINK NA NAVEGAÇÃO
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-links a.active {
        color: #FFB800 !important;
    }

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
// DARK MODE TOGGLE (Opcional)
// ============================================
// Se quiser adicionar um botão de toggle para diferentes temas
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--gradient-primary);
        border: none;
        color: var(--bg-darker);
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        // Implementar lógica de troca de tema aqui
        showNotification('Tema alternativo em desenvolvimento!', 'info');
    });

    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1) rotate(20deg)';
    });

    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Criar botão de tema (descomente se quiser usar)
// createThemeToggle();

// ============================================
// LOG DE INICIALIZAÇÃO
// ============================================
console.log('%c🚀 Portfolio Katherine Mosselaar ', 'background: #FFB800; color: #0A0A0A; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cDesenvolvido com 💛 e muito ☕', 'color: #FFB800; font-size: 14px;');
console.log('%cInspired by BlackLab Design', 'color: #FF6B35; font-size: 12px;');
