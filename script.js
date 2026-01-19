const cardsData = [
    'university.png',
    'product.png',
    'papers.png',
    'work.png',
    'skills.png',
    'certifications.png',
    'awards.png',
    'Misc.png'
];

const container = document.getElementById('cardsContainer');
const scrollContainer = document.querySelector('.scroll-container');
const heroTitle = document.querySelector('.main-title');
const instruction = document.querySelector('.instruction-overlay');

// Configuration
const CONFIG = {
    // Widening the fan angle to 140 degrees to reduce overlap between cards
    fanAngle: 140,
    spreadRadius: 600,
};

// State
let scrollProgress = 0; // 0 to 1 based on sticky track progress

function init() {
    createCards();
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
    const scrollTop = scrollContainer.scrollTop;

    // The "active" scroll range is the height of the content-track minus viewport
    // But since the sticky element takes 100vh, the scrollable distance is contentTrackHeight - 100vh
    // We want the card animation to complete relatively early so users can view them before scrolling past.

    const trackHeight = window.innerHeight * 3.5; // Matches css 350vh
    const activeDistance = trackHeight - window.innerHeight;

    // We want animation to finish around 60% of the way through the sticky track?
    // Let's map 0 -> 1 progress to 0 -> 80% of the active distance.
    // This way, the cards hold their final position for a bit before the user scrolls past.

    const rawProgress = scrollTop / activeDistance;

    // Clamp to 0-1 for the card animation calculation
    // But let's accelerate it so it finishes earlier
    scrollProgress = Math.min(Math.max(rawProgress * 1.5, 0), 1);

    // Hero fade out
    heroTitle.style.opacity = Math.max(0, 1 - scrollProgress * 3);

    // Instruction fade in
    if (scrollProgress > 0.8) {
        instruction.style.opacity = 1;
    } else {
        instruction.style.opacity = 0;
    }

    updateCardPositions();
}

function updateCardPositions() {
    const wrappers = document.querySelectorAll('.card-wrapper');
    wrappers.forEach(wrapper => {
        const isHovered = wrapper.classList.contains('hovered');
        updateSingleCard(wrapper, scrollProgress, isHovered);
    });
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
    // adjusted for container top: 40%
    // Start: Lower relative to new high center (250)
    // End: Center (0)
    const startY = 250;
    const endY = 0;
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
