// animations.js - Animaciones avanzadas con Intersection Observer

document.addEventListener('DOMContentLoaded', function() {
    // Configuración del Observer para elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Opcional: Dejar de observar después de animar
                // observer.unobserve(entry.target);
            } else {
                // Opcional: Remover animación al salir de vista
                // entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    // Elementos a observar para animación
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .contact-form, .about-content, .study-focus, .soft-skill-item'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-out');
        observer.observe(el);
    });

    // Animación específica para las barras de habilidades
    const skillsSection = document.getElementById('habilidades');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Efectos de parallax suave para el hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animación de escritura para el título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriterEffect(heroTitle);
    }

    // Contador animado para habilidades (puede personalizarse)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        animateCounter(counter);
    });
});

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200); // Retraso escalonado
    });
}

function typeWriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.round(current);
    }, 16);
}

// Efectos de hover mejorados para tarjetas
document.querySelectorAll('.project-card, .soft-skill-item, .study-focus').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Smooth scrolling mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
