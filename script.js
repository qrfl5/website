const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');

        contactForm.reset();
    });
}

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        }

        lastScroll = currentScroll;
    });
}

(function () {
    const STORAGE_KEY = 'lvh_font_scale';
    const SCALE_MIN = 0.85;
    const SCALE_MAX = 1.30;
    const SCALE_STEP = 0.05;
    const SCALE_DEFAULT = 1.00;

    let currentScale = parseFloat(localStorage.getItem(STORAGE_KEY)) || SCALE_DEFAULT;
    currentScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, currentScale));

    function applyScale(scale) {
        document.documentElement.style.setProperty('--font-scale', scale);
        localStorage.setItem(STORAGE_KEY, scale);
        currentScale = scale;
        updateLabel();
    }

    const widget = document.createElement('div');
    widget.className = 'a11y-widget';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', 'إعدادات إمكانية الوصول');
    widget.innerHTML = `
        <div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="حجم الخط">
            <span class="a11y-panel-title">حجم الخط</span>
            <div class="a11y-font-controls">
                <button class="a11y-btn" id="a11yDecrease" aria-label="تصغير الخط" title="تصغير">A−</button>
                <span class="a11y-size-label" id="a11ySizeLabel" aria-live="polite">100%</span>
                <button class="a11y-btn" id="a11yIncrease" aria-label="تكبير الخط" title="تكبير">A+</button>
            </div>
            <button class="a11y-reset" id="a11yReset" aria-label="إعادة تعيين حجم الخط">إعادة التعيين</button>
        </div>
        <button class="a11y-toggle" id="a11yToggle" aria-expanded="false" aria-controls="a11yPanel" title="إعدادات الخط">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
        </button>
    `;
    document.body.appendChild(widget);

    const panel = document.getElementById('a11yPanel');
    const toggle = document.getElementById('a11yToggle');
    const sizeLabel = document.getElementById('a11ySizeLabel');
    const btnInc = document.getElementById('a11yIncrease');
    const btnDec = document.getElementById('a11yDecrease');
    const btnReset = document.getElementById('a11yReset');

    function updateLabel() {
        sizeLabel.textContent = Math.round(currentScale * 100) + '%';
        btnDec.disabled = currentScale <= SCALE_MIN;
        btnInc.disabled = currentScale >= SCALE_MAX;
    }

    function togglePanel() {
        const isOpen = panel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePanel();
    });

    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            panel.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    btnInc.addEventListener('click', () => {
        const next = Math.min(SCALE_MAX, parseFloat((currentScale + SCALE_STEP).toFixed(2)));
        applyScale(next);
    });

    btnDec.addEventListener('click', () => {
        const next = Math.max(SCALE_MIN, parseFloat((currentScale - SCALE_STEP).toFixed(2)));
        applyScale(next);
    });

    btnReset.addEventListener('click', () => applyScale(SCALE_DEFAULT));

    applyScale(currentScale);
})();
