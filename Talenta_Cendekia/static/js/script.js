document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM fully loaded and parsed'); // Debugging

    anime({
        targets: '.container',
        opacity: [0, 1], // Fade in from opacity 0 to 1
        translateY: [204, 0], // Move from 204px down to its original position
        easing: 'easeInOutQuad', // Smooth easing function
        duration: 2000 // Animation duration in milliseconds
    }).finished.then(() => {
        console.log('Animation finished'); // Debugging
    });
});
