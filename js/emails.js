// email.js - Configuración y funcionalidad del formulario de contacto

// Inicializar EmailJS con tu Public Key
// Reemplaza 'your_public_key' con tu Public Key de EmailJS
emailjs.init("your_public_key_here");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar estado de envío
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: 'Fernando Cadena'
    };
    
    // Reemplaza 'your_service_id' y 'your_template_id' con tus credenciales
    emailjs.send('your_service_id', 'your_template_id', templateParams)
        .then(function(response) {
            showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente por email.', 'error');
            console.log('Error EmailJS:', error);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});

function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.maxWidth = '90vw';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Validación en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch(field.type) {
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'El email es requerido';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
            break;
            
        case 'text':
            if (!value) {
                isValid = false;
                errorMessage = 'Este campo es requerido';
            }
            break;
            
        case 'textarea':
            if (!value) {
                isValid = false;
                errorMessage = 'El mensaje es requerido';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
        }
