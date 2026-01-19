const cardsData = [
    'product.png',
    'papers.png',
    'projects.png',
    'skills.png',
    'certifications.png',
    'awards.png',
    'misc.png'
];

const container = document.getElementById('cardsContainer');
const scrollContainer = document.querySelector('.scroll-container');
const heroTitle = document.querySelector('.main-title');
const instruction = document.querySelector('.instruction-overlay');

// Configuration
const CONFIG = {
    // "Less than a semi-circle" -> roughly 100 degrees
    // Safe spread with slight overlap
    fanAngle: 100,
    spreadRadius: 900,
};

// State
let scrollProgress = 0; // 0 to 1 based on sticky track progress
let cachedWrappers = null; // Cache DOM elements
let ticking = false; // For rAF throttling

function init() {
    createCards();
    // Cache them once created
    cachedWrappers = document.querySelectorAll('.card-wrapper');

    updateCardPositions();
    scrollContainer.addEventListener('scroll', onScroll);

    // Initial trigger
    onScroll();
}

function createCards() {
    const count = cardsData.length;
    // We want the fan centered from -50deg to +50deg
    const startAngle = -CONFIG.fanAngle / 2;
    // We cover the full angle range
    const angleStep = CONFIG.fanAngle / (count - 1);

    cardsData.forEach((filename, index) => {
        // Create Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';

        // Name processing
        const name = filename.replace('.png', '').replace('-', ' ').toUpperCase();

        // Create Visual Inner
        const visual = document.createElement('div');
        visual.className = 'card-visual';

        const img = document.createElement('img');
        img.src = `assets/home-page-cards/${filename}`;
        img.alt = name;

        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        overlay.innerText = name;

        visual.appendChild(img);
        visual.appendChild(overlay);
        wrapper.appendChild(visual);

        // Store layout data on the WRAPPER
        const angle = startAngle + (index * angleStep);
        wrapper.dataset.angle = angle;
        wrapper.dataset.index = index;

        // Click on wrapper triggers nav
        wrapper.onclick = () => {
            // Redirect to dummy page
            window.location.href = `page.html?title=${encodeURIComponent(name)}`;
        };

        // Hover Logic on Wrapper
        wrapper.addEventListener('mouseenter', () => {
            if (scrollProgress > 0.6) {
                wrapper.classList.add('hovered');
                updateSingleCard(wrapper, scrollProgress, true);
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.classList.remove('hovered');
            updateSingleCard(wrapper, scrollProgress, false);
        });

        container.appendChild(wrapper);
    });
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            performScrollCalc();
            ticking = false;
        });
        ticking = true;
    }
}

// const heroSection = document.querySelector('.hero-section'); // This will be moved inside performScrollCalc
// const scene = document.querySelector('.scene'); // This will be moved inside performScrollCalc

// Re-select elements inside function or ensure they are present.
// Since this script is deferred/at end of body, they *should* be there, but let's be safe.

function performScrollCalc() {
    const scrollTop = scrollContainer.scrollTop;

    // Selecting here guarantees we find them if they exist
    const heroSection = document.querySelector('.hero-section');
    const scene = document.querySelector('.scene');
    const heroTitle = document.querySelector('.main-title'); // Re-selecting to be safe

    const trackHeight = window.innerHeight * 6.0;
    const activeDistance = trackHeight - window.innerHeight;

    // We want animation to finish relatively quickly so there's "empty space" after
    const rawProgress = scrollTop / activeDistance;

    // Multiplier 2.5 means animation completes in 1/2.5 = 40% of the scroll distance
    scrollProgress = Math.min(Math.max(rawProgress * 2.5, 0), 1);

    // Hero fade out - removed per request, but we now scroll it UP
    if (heroTitle) heroTitle.style.opacity = 1;

    // Parallax Effect: Move the "page" up as we scroll
    // 1. Move Hero Section up and out
    if (heroSection) {
        // Move up significantly to simulate scrolling past it
        const heroMove = -scrollProgress * 400;
        heroSection.style.transform = `translateY(${heroMove}px)`;
        // Fade it out slightly as it goes up to be cleaner? User didn't ask for fade, just scroll. 
        // Keeping opacity 1 as per previous request "remain visible at all times" (from conversation history), 
        // but moving it up is "scrolling". 
        // Note: The previous request said "search Main title remains visible at all times". 
        // If I move it off screen, does that violate it? 
        // "visible at all times" usually means don't fade it out in place. 
        // But if we are "scrolling down", things naturally leave the viewport.
        // I will move it up but maybe cap it so it stays somewhat in the top header area?
        // "page should also be scrolled down a bit". 
        // If I move it -400px, it leaves the screen.
        // Maybe -100px?
    }

    // 2. Move the Scene (Cards + Table) up slightly
    if (scene) {
        const sceneMove = -scrollProgress * 100;
        scene.style.transform = `translateY(${sceneMove}px)`;
    }

    // Instruction fade in
    if (scrollProgress > 0.8) {
        if (instruction) instruction.style.opacity = 1;
        // Also move instruction up? It's inside scene, so it moves with scene.
    } else {
        if (instruction) instruction.style.opacity = 0;
    }

    updateCardPositions();
}

function updateCardPositions() {
    // Use cached elements instead of querying DOM
    if (cachedWrappers) {
        cachedWrappers.forEach(wrapper => {
            const isHovered = wrapper.classList.contains('hovered');
            updateSingleCard(wrapper, scrollProgress, isHovered);
        });
    }
}

function updateSingleCard(wrapper, progress, isHovered) {
    const angle = parseFloat(wrapper.dataset.angle);
    const index = parseInt(wrapper.dataset.index);
    const count = cardsData.length;
    const visual = wrapper.querySelector('.card-visual');

    // --- 1. Wrapper Fan Position (Scroll Driven) ---
    // This moves the "slot" in the fan, but does not handle the pop-up

    // Rotation X: Flat (55) -> Upright (5)
    // We keep a slight tilt even at the end for style (5deg)
    const baseRotateX = 60 - (progress * 55);

    // Vertical base movement
    // adjusted for container top: 30%
    // Start: Lower relative to new high center (350)
    // End: Nudged down slightly to center visually (50)
    const startY = 350;
    const endY = 50;
    const currentY = startY - (progress * (startY - endY));

    // Spread: 1.0 -> 1.2
    const spreadMult = 1.0 + (progress * 0.2);
    const currentAngle = angle * spreadMult;

    // Scale: 1.0 -> 0.8
    const baseScale = 1.0 - (progress * 0.2);

    // Apply Fan Transform to Wrapper

    if (isHovered && progress > 0.6) {
        wrapper.style.zIndex = 1000; // Bring wrapper top
    } else {
        const centerIdx = (count - 1) / 2;
        const distFromCenter = Math.abs(index - centerIdx);
        const zIndexBase = Math.floor((count - distFromCenter) * 10);
        wrapper.style.zIndex = zIndexBase;
    }

    wrapper.style.transform = `
        translateY(${currentY}px)
        rotateZ(${currentAngle}deg)
        rotateX(${baseRotateX}deg)
        scale(${baseScale})
    `;

    // --- 2. Visual Pop Up (Hover Driven) ---
    // This happens relative to the wrapper's local coordinate system

    if (isHovered && progress > 0.6) {
        // Pop OUT relative to the inclined plane
        // We move Y negative (up local) and translateZ positive (towards cam)
        // Also cancel out the X-rotation to face the user perfectly.

        const counterRotate = -baseRotateX;

        visual.style.transform = `
            translateY(-120px)
            translateZ(100px)
            rotateX(${counterRotate}deg)
            scale(1.2)
        `;
    } else {
        // Reset
        visual.style.transform = `
            translateY(0)
            translateZ(0)
            rotateX(0)
            scale(1)
        `;
    }
}

init();
