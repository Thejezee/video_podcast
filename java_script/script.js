function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido');
        return;
    }

    showNotification('¡Gracias por suscribirte!');
    emailInput.value = '';
});

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.getAttribute('data-platform');
        
        console.log(`Click en ${platform}`, {
            timestamp: new Date().toISOString(),
            platform: platform,
            href: this.href
        });

        const card = this.querySelector('.social-card');
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    });

    link.addEventListener('mouseenter', function() {
        const img = this.querySelector('.social-image');
        if (img.getAttribute('data-src')) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        }
    });
});

function animateSocialCards() {
    const cards = document.querySelectorAll('.social-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, index * 100);
    });
}

document.addEventListener('DOMContentLoaded', animateSocialCards);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.social-card').forEach(card => {
    observer.observe(card);
});

function handleImageError(img) {
    img.onerror = null; 
    img.src = '/api/placeholder/80/80';
}

document.querySelectorAll('.social-image').forEach(img => {
    img.onerror = () => handleImageError(img);
});
const motivationalQuotes = [
    {
        text: "Tu cerebro es tu mayor activo, invierte en él todos los días",
        author: "Dra. Alicia Vargas"
    },
    {
        text: "La neuroplasticidad es tu superpoder, úsalo sabiamente",
        author: "Dra. Alicia Vargas"
    },
    {
        text: "Cada nuevo aprendizaje es una nueva conexión neuronal",
        author: "Dra. Alicia Vargas"
    },
    {
        text: "Un cerebro saludable es el fundamento de una vida plena",
        author: "Dra. Alicia Vargas"
    },
    {
        text: "La mente es como un paracaídas, solo funciona si está abierta",
        author: "Dra. Alicia Vargas"
    }
];

function changeQuote(index = null) {
    const quoteElement = document.getElementById('motivationalQuote');
    const authorElement = document.querySelector('.quote-author');
    
    const quoteIndex = index !== null ? index : Math.floor(Math.random() * motivationalQuotes.length);
    const quote = motivationalQuotes[quoteIndex];
    
    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;
    
    setTimeout(() => {
        quoteElement.textContent = quote.text;
        authorElement.textContent = `- ${quote.author}`;
        
        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 1;
    }, 500);
}

let currentQuoteIndex = 0;
setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % motivationalQuotes.length;
    changeQuote(currentQuoteIndex);
}, 10000);

window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 0) {
        header.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        header.style.opacity = 1 - (scrollPosition / 500);
    } else {
        header.style.transform = 'translateY(0)';
        header.style.opacity = 1;
    }
});

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            changeQuote();
        }
    });
});

headerObserver.observe(document.querySelector('.main-header'));