document.addEventListener("DOMContentLoaded", () => {
    // Web enter effect with fade-in and translation only
    anime({
        targets: ['.container'],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2000
    });
});
